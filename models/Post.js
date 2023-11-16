const Sequelize = require('sequelize');
const db = require('../config/db');
//const uuid = require('uuid/v4');
const Usuarios = require('./Usuarios');


const Post = db.define('post', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    nombrepost: {
        type: Sequelize.TEXT(100),
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'El post debe tener nombre'
            }
        }
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Debe contener una descripción'
            }
        }
    },
    imagen:Sequelize.TEXT
});

Post.belongsTo(Usuarios); 
module.exports = Post;