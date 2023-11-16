const Publicaciones = require('../models/Publicaciones')
const moment = require('moment');
const Post = require('../models/Post')
exports.home = async (req, res) => {

    const arreglo = [];
    arreglo.push( Publicaciones.findAll({}));
    arreglo.push( Post.findAll({}));

    const [ post ] = await Promise.all(arreglo); 
    const [ publicaciones ] = await Promise.all(arreglo); 
    res.render('home', {
        nombrePagina : 'Menu Principal',
        publicaciones,
        moment,
        post
    })
};
