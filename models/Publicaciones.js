const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');
const Usuarios = require('../models/Usuarios');
const Post = require('../models/Post');

const Publicaciones = db.define(
    'publicaciones',{
        id : {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        titulo :{
            type: Sequelize.STRING,
            allowNull : false,
            validate : {
                notEmpty : {
                    msg : 'Tienes que Agregar un titulo'
                }
            }
        },
        slug : {
            type: Sequelize.STRING,

        },
        invitado : { 
            type : Sequelize.STRING
        },
        descripcion : {
            type : Sequelize.TEXT,
            allowNull : false,
            validate : {
                notEmpty : {
                    msg : 'Agrega una descripcion para la Publicación'
                }
            }
        },
        fecha : {
            type : Sequelize.DATEONLY,
            allowNull : false,
            validate : {
                notEmpty : {
                    msg : 'Agrega una fecha para la Publicación'
                }
            }
        },
        hora : {
            type : Sequelize.TIME,
            allowNull : false,
            validate : {
                notEmpty : {
                    msg : 'Agrega una hora para la Publicación'
                }
            }
        },
        direccion : {
            type : Sequelize.STRING,
            allowNull : false,
            validate : {
                notEmpty : {
                    msg : 'Agrega una dirección para la Publicación'
                }
            }
        },
        ciudad : {
            type : Sequelize.STRING,
            allowNull : false,
            validate : {
                notEmpty : {
                    msg : 'Agrega una ciudad para la Publicación'
                }
            }
        },
        region : {
            type : Sequelize.STRING,
            allowNull : false,
            validate : {
                notEmpty : {
                    msg : 'Agrega una region para la Publicación'
                }
            }
        },
        asistencia : {
            type : Sequelize.ARRAY(Sequelize.INTEGER),
            defaultValue : []
        },
        imagen:{
            type:Sequelize.TEXT
        }
    },{
        hooks:{
            async beforeCreate(publicaciones) {
                const url = slug(publicaciones.titulo).toLowerCase;
                publicaciones.slug = `${url}-${shortid.generate()}`;
            },
        }
    }

);
Publicaciones.belongsTo(Usuarios);
Publicaciones.belongsTo(Post);
module.exports = Publicaciones;