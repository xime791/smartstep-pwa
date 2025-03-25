// src/components/ingresoUsuario.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import './ingresoUsuario.css';
import Pasos from './sensorPasos';
import Fuerza from './sensorFuerza';
// import Temperatura from './sensorTemperatura';
// import Perfil from './perfilUsuario';
// import Admin from './Admin';
import './styles/ingresoUsuario.css';

const Welcome = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const location = useLocation();
  const { state } = location;
  const userName = state?.name || 'Usuario';

  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeComponent) {
      case 'pasos':
        return <Pasos />;
      case 'fuerza':
        return <Fuerza />;
      default:
        return <div>Selecciona una opción del menú.</div>;
    }
  };

  // Función para cerrar sesión y redirigir a la página principal
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div id='ingreso-contenedor'>
      <div className="menu-lateral">
        <div className='my-3' id='logo-contenedor'></div>
        <button className="menu-btn" onClick={() => setActiveComponent('pasos')}>Pasos</button>
        <button className="menu-btn" onClick={() => setActiveComponent('fuerza')}>Fuerza</button>
        <button className="menu-btn" onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <div className="ingreso-contenido">
        {renderContent()}
      </div>
    </div>
  );
};

export default Welcome;
