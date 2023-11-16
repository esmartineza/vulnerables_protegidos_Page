const passport = require('passport');
// ...

exports.autenticarUsuario = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      req.flash('error', 'Ha ocurrido un error'); // Mensaje de error
      return next(err);
    }
    if (!user) {
      req.flash('error', 'Credenciales incorrectas'); // Mensaje de error
      return res.redirect('/iniciar-sesion');
    }
    req.logIn(user, (err) => {
      if (err) {
        req.flash('error', 'Error al iniciar sesión'); // Mensaje de error
        return next(err);
      }
      req.flash('success', 'Inicio de sesión exitoso'); // Mensaje de éxito
      return res.redirect('/administracion');
    });
  })(req, res, next);
};

//...

exports.usuarioAutenticado = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('error', 'Debes iniciar sesión para acceder a esta página'); // Mensaje de error
  return res.redirect('/iniciar-sesion');
};

exports.cerrarSesion = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Sesión finalizada correctamente');
    res.redirect('/iniciar-sesion');
  });
};
