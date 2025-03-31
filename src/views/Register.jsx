import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import logo from '../images/logo-smartstep.png';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const insertIndexedDB = (data) => {
    let request = indexedDB.open("database", 1);

    request.onupgradeneeded = (event) => {
      let db = event.target.result;
      if (!db.objectStoreNames.contains("libros")) {
        db.createObjectStore("libros", { autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      let db = event.target.result;
      let transaction = db.transaction("libros", "readwrite");
      let store = transaction.objectStore("libros");

      let resultado = store.add(data);
      resultado.onsuccess = () => {
        console.log("Usuario guardado en IndexedDB (sin conexión):", data);
      };
      resultado.onerror = (event2) => {
        console.error("Error al insertar en IndexedDB:", event2.target.error);
      };
    };

    request.onerror = (event) => {
      console.error("Error al abrir IndexedDB:", event.target.error);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos de registro:', formData);

    const subscription = localStorage.getItem('subscription')
      ? JSON.parse(localStorage.getItem('subscription'))
      : null;
    const userData = { ...formData, subscription };

    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        if (Notification.permission === "granted") {
          new Notification("Registro exitoso", {
            body: "Tu cuenta se ha registrado correctamente.",
            icon: "/usuario.png",
          });
        } else {
          Notification.requestPermission().then(permission => {
            if (permission === "granted") {
              new Notification("Registro exitoso", {
                body: "Tu cuenta se ha registrado correctamente.",
                icon: "/usuario.png",
              });
            }
          });
        }

        setFormData({ nombre: '', correo: '', contrasena: '' });
        console.log('Usuario creado en MongoDB');
        navigate('/login');
      } else {
        console.error('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('No hay conexión a internet. Guardando en IndexedDB.');
      insertIndexedDB(userData);

      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.ready.then(sw => {
          sw.sync.register("syncUsers");
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="register-container">
        <div className="register-left">
          <div className="register-left-inner">
            <p className="welcome-text">Crea tu cuenta</p>
            <p className="sub-welcome-text">Regístrate para comenzar a disfrutar de nuestros servicios</p>
          </div>
        </div>
        <div className="register-right">
          <img src={logo} alt="Smartstep Logo" className="register-right-logo" />
          <h2>Registro</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">
            Registrar
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="login-here-button"
          >
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
