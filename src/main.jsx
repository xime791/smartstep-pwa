import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import IngresoUsuario from './ingresoUsuario.jsx'; 
import keys from './keys.json';

// Registrar el Service Worker y gestionar la suscripción a notificaciones push
navigator.serviceWorker.register('./sw.js', { type: 'module' })
  .then(registro => {
    console.log("Service Worker registrado");
    if (Notification.permission === 'denied' || Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          registro.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: keys.publicKey
          })
          .then(res => res.toJSON())
          .then(async json => {
            console.log("Suscripción exitosa:", json);
            localStorage.setItem('subscription', JSON.stringify(json));
          });
        }
      });
    }
  })
  .catch(error => console.error('Error al registrar el Service Worker:', error));

// Configuración de IndexedDB
let db = window.indexedDB.open('database');
db.onupgradeneeded = event => {
  let result = event.target.result;
  result.createObjectStore('libros', { autoIncrement: true });
};

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/ingresoUsuario" element={<IngresoUsuario />} />
    </Routes>
  </BrowserRouter>
);
