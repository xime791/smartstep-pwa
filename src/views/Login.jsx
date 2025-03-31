import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../images/logo-smartstep.png';

const Login = () => {
  const [credentials, setCredentials] = useState({
    correo: '',
    contrasena: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const showAuthNotification = () => {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
      new Notification('Error de autenticación', {
        body: 'Credenciales incorrectas. Por favor verifique',
        icon: './icons/icon-advertencia.png',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Intentando acceder con:', credentials);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        showAuthNotification();
        throw new Error('Credenciales inválidas');
      }

      const data = await response.json();
      console.log('Acceso exitoso:', data);

      if (data.message === 'Inicio de sesión exitoso') {
        navigate('/ingresoUsuario');
      } else {
        setError('Error en el servidor');
        showAuthNotification();
      }
    } catch (error) {
      console.error('Problema:', error);
      setError(error.message);
      showAuthNotification();
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-left-inner">
          <p className="welcome-text">Bienvenido</p>
          <p className="sub-welcome-text">Ingresa para visualizar tus datos</p>
        </div>
      </div>
      <div className="login-right">
        <img src={logo} alt="Smartstep Logo" className="login-right-logo" />
        <h2>Inicio de Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={credentials.correo}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={credentials.contrasena}
          onChange={handleChange}
          required
          className="login-input"
        />
        <button type="submit" onClick={handleSubmit} className="login-button">
          Acceder
        </button>
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="register-here-button"
        >
          Regístrate aquí
        </button>
      </div>
    </div>
  );
};

export default Login;
