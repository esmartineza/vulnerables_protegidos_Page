const Publicaciones = require('../../models/Publicaciones');
const Post = require('../../models/Post');
const Usuario = require('../../models/Usuarios');
const moment = require('moment');

exports.verpublicacion = async(req, res, next) => {
    const publicaciones = await Publicaciones.findOne({ where : {slug : req.params.slug },
    include : [
        {
            model: Post 
        },
        {
            model: Usuario,
            attributes: ['id','nombre']
        }
    ]  });

    if(!publicaciones){
        res.redirect('/');
    }
    res.render('ver-publicacion', {
        nombrePagina : publicaciones.titulo,
        publicaciones,
        moment

    })
}

exports.asistenciaconfir = async(req, res) => {
    res.send('asistencia confirmada');
}
exports.visualizarcategoria = async(req, res ,next) => {
    const Post = await Post.findOne({ attributes: ['id'], where: {slug : req.post}});
    console.log(categoria.id);
}