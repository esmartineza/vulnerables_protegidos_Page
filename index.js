const express = require('express');
const path = require('path');
const router = require('./routes');
const expressEjsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const flash = require('connect-flash'); // Importa connect-flash
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

// Configuración de la base de datos
const db = require('./config/db');
require('./models/Usuarios');
require('./models/Post');
require('./models/Publicaciones');
db.sync().then(() => console.log('Conexión exitosa a la DB')).catch((error) => console.log(error));

require('dotenv').config({ path: 'variables.env' });

const app = express();

// Lector de los formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Se habilita el EJS como template engine
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');

// Ubicación de las vistas
app.set('views', path.join(__dirname, './views'));

// Archivos Estáticos
app.use(express.static('public'));

// Cookie parser
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Agrega connect-flash a tu aplicación
app.use(flash());

// Middleware para pasar mensajes de alerta a las vistas
app.use((req, res, next) => {
  console.log('Solicitud recibida:', req.method, req.url);
  console.log('Datos de la solicitud:', req.body);
  res.locals.usuario = {...req.user} || null;
  res.locals.messages = req.flash();
  const fecha = new Date();
  res.locals.year = fecha.getFullYear();
  next();
});

// Routing
app.use('/', router());

const host = process.env.HOST || '0.0.0.0';

const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log('¡Está vivo!');
});
