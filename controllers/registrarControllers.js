const Usuario = require('../models/Usuarios');

exports.registrar =(req, res) => {
    res.render('registrar', {
        nombrePagina : 'Registrar Usuario'
    })
}

exports.registrarCuenta = async(req, res) => {
    const usuario = req.body;
    try {
            //console.log(usuario);
        const crearUsuario = await Usuario.create(usuario);
        console.log('Se creo el usuario', crearUsuario);
    } catch (error) {
        const erroresSequelize = error.errors.map(err => err.message);
        console.log(erroresSequelize);

    }


}