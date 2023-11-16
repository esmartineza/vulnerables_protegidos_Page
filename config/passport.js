const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuarios = require('../models/Usuarios');

passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    },
    async(email, password, next) => {
        const usuario = await Usuarios.findOne({ where : { email }});

        if(!usuario) return next(null, false,{
            message : 'ese Usuario no existe'
        });
        const validarPass = usuario.validarPassword(password);
        if(!validarPass) return next(null, false, {
            message: 'password incorrecto'
        });
        return next(null, usuario);
    }   
))
passport.serializeUser(function(usuario, cb) {
    cb(null, usuario);
});
passport.deserializeUser(function(usuario, cb) {
    cb(null, usuario);
});
module.exports = passport;
