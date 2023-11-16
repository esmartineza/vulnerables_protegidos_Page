const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeControllers');
const usuariosController = require('../controllers/usuariosControllers')
const forocontroller = require('../controllers/foroControllers')
const registrarcontroller = require('../controllers/registrarControllers')
const authController = require('../controllers/authControllers')
const adminController = require('../controllers/adminControllers')
const postController = require('../controllers/postControllers')
const publicacionController = require('../controllers/publicacionController')
const pageController = require('../controllers/front/pageController')
const busquedorController = require('../controllers/buscadorController')
module.exports = function(){



    router.get('/', homeController.home);

    router.get('/ver-publicacion/:slug',
        pageController.verpublicacion
    );
    router.post('/asistencia-confirmada/:lug',
        pageController.asistenciaconfir
    )
    router.get('/iniciar-sesion', 
        usuariosController.formIniciarSesion
    );
    router.post('/iniciar-sesion',
        authController.autenticarUsuario
    );
    router.get('/cerrar-sesion',
        authController.usuarioAutenticado,
        authController.cerrarSesion
    );
    router.get('/foro', 
        forocontroller.foro
    );
    router.get('/registrar', 
        authController.usuarioAutenticado,
        registrarcontroller.registrar
    );
    router.post('/registrar', 
        registrarcontroller.registrarCuenta
    );
    router.get('/administracion',  
        authController.usuarioAutenticado,
        adminController.panelAdministrador);
    router.get('/nuevo-post',
        authController.usuarioAutenticado,
        postController.formNuevoPost
    );
    router.post('/nuevo-post',
        authController.usuarioAutenticado,
        postController.subirImagen,
        postController.createPost
    )
    router.get('/editar-post/:postId',
        authController.usuarioAutenticado,
        postController.formEditarPost
    )
    router.post('/editar-post/:postId',
        authController.usuarioAutenticado,
        postController.editarPost
    )
    router.get('/imagen-post/:postId',
        authController.usuarioAutenticado,
        postController.formEditarImg
    
    )
    router.post('/imagen-post/:postId',
        authController.usuarioAutenticado,
        postController.subirImagen,
        postController.editarImg
    );
    router.get('/eliminar-post/:postId',
        authController.usuarioAutenticado,
        postController.formEliminarPost
    );
    router.post('/eliminar-post/:postId',
        authController.usuarioAutenticado,
        postController.eliminarPost
    );
    router.get('/nueva-publicacion',
        authController.usuarioAutenticado,
        publicacionController.formNuevaPublicacion
    );
    router.post('/nueva-publicacion',
        authController.usuarioAutenticado,
        publicacionController.subirImagenPublic,
        publicacionController.crearPublicacion
    );
    router.get('/editar-publicacion/:id',
        authController.usuarioAutenticado,
        publicacionController.formEditarPublicacion
    );
    router.post('/editar-publicacion/:id',
        authController.usuarioAutenticado,
        publicacionController.editarPublicacion
    );
    router.get('/eliminar-publicacion/:id',
        authController.usuarioAutenticado,
        publicacionController.formEliminarPublicacion
    );
    router.post('/eliminar-publicacion/:id',
    authController.usuarioAutenticado,
    publicacionController.eliminarPublicacion
    );
    router.get('/post/:post',
        pageController.visualizarcategoria
    );
    router.get('/busqueda',
        busquedorController.busqueda
    )
    return router;
}