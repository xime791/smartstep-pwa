const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const keys = require('../src/keys.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Conexion
const uri = 'mongodb+srv://jime123:jime123@cluster0.vj37dkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Correcta conexion a Mongo'))
  .catch(err => console.error('No se pudede conectar a MongoDB', err));

// Definir el esquema
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: String, 
  contrasena: String,
  subscription: {
    endpoint: { type: String, required: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true }
    }
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

app.post('/api/usuarios', async (req, res) => {
  const { nombre, correo, contrasena, subscription } = req.body; 
  const nuevoUsuario = new Usuario({ nombre, correo, contrasena, subscription }); 
  try {
    await nuevoUsuario.save();
    res.status(201).send('Usuario registrado');
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(400).json({ error: 'Usuario no registrado', details: error.message });
  }
});


// Inicio de sesión
app.post('/api/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario || usuario.contrasena !== contrasena) {
      return res.status(401).send('Correo o contraseña incorrectos');
    }
    res.status(200).send({ message: 'Inicio de sesión exitoso', usuario });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error en el servidor');
  }
});

// Guardar suscripcion
app.post('/guardarSuscripcion', async (req, res) => {
  try {
    const subscription = req.body.subscription;
    const newSubscription = new Subscription(subscription);
    await newSubscription.save();
    res.status(201).json({ message: 'Suscripción registrada' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo guardar la suscripción', details: error });
  }
});

// Configuración de web-push
webpush.setVapidDetails(
  'mailto:celjudy@gmail.com',
  keys.publicKey,
  keys.privateKey
);

// Enviar notificación push
app.post('/sendPush/:id', async (req, res) => {
  try {
    const { id } = req.params;
   
    // Buscar usuario por ID
    const usuario = await Usuario.findById(id);
    if (!usuario || !usuario.subscription) {
      return res.status(404).json({ error: 'Usuario no encontrado o sin suscripción' });
    }

    const payload = JSON.stringify({
      title: "Notificación",
      body: "Tienes una notificación"
    });

    // Enviar la notificación
    await webpush.sendNotification(usuario.subscription, payload);

    res.json({ mensaje: "Notificación enviada correctamente" });
  } catch (error) {
    console.error('Error al enviar notificación:', error);
    res.status(500).json({ mensaje: "No se pudo enviar la notificación", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);

}); 