import React from 'react';  
import { useNavigate } from 'react-router-dom';
import logo from './images/logo-smartstep.png';
import plantillas from './images/img-insoles.png';
import iconWalk from './icons/icon-walk.png';
import iconSneaker from './icons/icon-sneaker.png';
import iconSquad from './icons/icon-squad.png';
import iconEmail from './icons/icon-email.png';
import iconFacebook from './icons/icon-facebook.png';
import iconInstagram from './icons/icon-instagram.png'; 

import './styles/App.css';

const App = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Smartstep Logo" className="logo" />
        </div>
        <div className="navbar-section-buttons">
          <button onClick={() => scrollToSection("section1")} className="section-button">Nosotros</button>
          <button onClick={() => scrollToSection("section2")} className="section-button">Beneficios</button>
          <button onClick={() => scrollToSection("section4")} className="section-button">Contacto</button>
        </div>
        <div className="navbar-buttons">
          <button onClick={() => navigate('/register')} className="auth-button register">
            Registrarse
          </button>
          <button onClick={() => navigate('/login')} className="auth-button login">
            Iniciar sesión
          </button>
        </div>
      </nav>
      <div className="sections">
        <section className="section" id="section1">
          <div className="section1-container">
            <div className="section1-image">
              <img src={plantillas} alt="Plantillas" />
            </div>
            <div className="section1-content">
              <h1 className="section1-title">
                <span className="smart">Smart</span>
                <span className="step">Step</span>
              </h1>
              <p className="section1-text">
                Con SmartStep, cada paso cuenta y cada movimiento se convierte en una oportunidad para mejorar. Conécta tus plantillas a nuestra aplicación y descubre cómo optimizar tu actividad diaria. ¡Tu bienestar comienza aquí!
              </p>
            </div>
          </div>
        </section>
        <section className="section" id="section2">
          <h2 className="section2-title">Descubre los beneficios de SmartStep</h2>
          <div className="section2-container">
            <div className="section2-box">
              <img src={iconWalk} alt="Icon Walk" className="box-icon" />
              <div className="box-line"></div>
              <p className="box-text">
                Nuestro sistema de conteo de pasos en tiempo real te permite seguir tu actividad diaria y motivarte a alcanzar tus metas.
              </p>
            </div>
            <div className="section2-box">
              <img src={iconSneaker} alt="Icon Sneaker" className="box-icon" />
              <div className="box-line"></div>
              <p className="box-text">
                Diseñadas para el uso diario, SmartStep te ofrece la comodidad que necesitas para enfrentar tus actividades cotidianas sin molestias.
              </p>
            </div>
            <div className="section2-box">
              <img src={iconSquad} alt="Icon Squad" className="box-icon" />
              <div className="box-line"></div>
              <p className="box-text">
                Medir la distribución de peso te ayuda a ser más consciente de tu cuerpo. Aprende a escuchar las señales que te envía y mejora tu bienestar.
              </p>
            </div>
          </div>
        </section>
        <section className="section" id="section3">
          <div className="section3-container">
            <h1 className="section3-text">Cree en ti mismo y en el poder de tus pasos</h1>
          </div>
        </section>
        <section className="section" id="section4">
          <div className="section4-container">
            <div className="section4-left">
              <h2 className="section4-title">Nuestra filosofía</h2>
              <p className="section4-left-text">
              Cada paso es importante. En SmartStep, queremos inspirar confianza y motivación, asegurando que cada movimiento te acerque a tu mejor versión.
              </p>
            </div>
            <div className="section4-center">
              <h2 className="section4-title">Contáctanos</h2>
              <div className="section4-links">
                <a href="mailto:contacto@smartstep.com" target="_blank" rel="noreferrer">
                  <img src={iconEmail} alt="Email" className="link-icon" /> Correo electrónico
                </a>
                <a href="https://www.facebook.com/share/1BQUqaSpHp/" target="_blank" rel="noreferrer">
                  <img src={iconFacebook} alt="Facebook" className="link-icon" /> Facebook
                </a>
                <a href="https://www.instagram.com/smartstep" target="_blank" rel="noreferrer">
                  <img src={iconInstagram} alt="Instagram" className="link-icon" /> Instagram
                </a>
              </div>
            </div>
            <div className="section4-right">
              <h2 className="section4-title">Encuéntranos en</h2>
              <p className="section4-right-text">
                Carretera Santa Cruz-San Isidro Km. 4.5, 45640 Santa Cruz de las Flores, Jal.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
