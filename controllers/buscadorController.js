const Publicacion = require('../models/Publicaciones');
const Sequelize = require ('sequelize');
const moment = require('moment');
const Op = Sequelize.Op;
exports.busqueda = async (req, res) => {
   const { titulo } = req.query;
   const publicaciones = await Publicacion.findAll({
        where: {
            titulo : { [Op.iLike] : '%'+ titulo +'%'}
        }
   });
   res.render('busqueda',{
        nombrePagina : 'Buscador',
        publicaciones,
        moment
   })
}