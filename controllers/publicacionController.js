const Post = require('../models/Post');
const Publicaciones = require('../models/Publicaciones');
const multer = require('multer')
const shortid = require('shortid')

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, next) => {
      next(null, __dirname+'/../public/uploads/publicaciones/');
    },
    filename: (req, file, next) => {
      const extension = file.mimetype.split('/')[1];
      next(null, `${shortid.generate()}.${extension}`);
    }
  })
  )
};

const upload = multer(configuracionMulter).single('imagen');

exports.formNuevaPublicacion = async (req, res) => {
  const post = await Post.findAll({ where: { usuarioId: req.user.id } });
  const selectedPostId = req.query.selectedPostId; // Obtener el ID del post de la URL

  res.render('nueva-publicacion', {
      nombrePagina: 'Crear Nueva Publicación',
      post,
      selectedPostId, // Pasar el ID del post a la vista
  });
};

exports.subirImagenPublic = async (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      console.log(error);
    } else {
      next();
    }
  });
};
exports.crearPublicacion = async (req, res) => {
  const publicaciones = req.body;
  publicaciones.usuarioId = req.user.id;
  publicaciones.imagen = req.file.filename;

  try {
    await Publicaciones.create(publicaciones);
    req.flash('success', 'Se creó correctamente la publicación');
    res.redirect('/administracion');
  } catch (error) {
    console.log(error);
    req.flash('error', 'Error al crear la publicación');
    res.redirect('/nueva-publicacion');
  }
}

exports.formEditarPublicacion = async ( req, res, next) => {
  const arreglo = [];
  arreglo.push( Post.findAll({ where: { usuarioId: req.user.id } }));
  arreglo.push( Publicaciones.findByPk(req.params.id));

  const [ post, publicaciones] = await Promise.all(arreglo);

  if(!post || !publicaciones){
    req.flash('error', 'no valida');
    res.redirect('/administracion');
    return next();
  }
  res.render('editar-publicacion',{
      nombrePagina : `Editar Publicación : ${publicaciones.titulo}`,
      post,
      publicaciones
  });
}

exports.editarPublicacion = async (req, res, next) => {
  const publicaciones = await Publicaciones.findOne({
    where: { id: req.params.id, usuarioId: req.user.id }
  });

  if (!publicaciones) {
    req.flash('error', 'No válido');
    res.redirect('/administracion');
    return next();
  }

  const { postId, titulo, invitado, fecha, hora, descripcion, direccion, ciudad, region } = req.body;

  publicaciones.postId = postId;
  publicaciones.titulo = titulo;
  publicaciones.invitado = invitado;
  publicaciones.fecha = fecha;
  publicaciones.hora = hora;
  publicaciones.descripcion = descripcion;
  publicaciones.direccion = direccion;
  publicaciones.ciudad = ciudad;
  publicaciones.region = region;

  try {
    await publicaciones.save();
    req.flash('success', 'Cambios guardados correctamente');
    res.redirect('/administracion');
  } catch (error) {
    console.log(error);
    req.flash('error', 'Error al guardar los cambios');
    res.redirect('/editar-publicacion/' + req.params.id);
  }
};
exports.formEliminarPublicacion = async (req, res, next) => {
  const publicaciones = await Publicaciones.findOne({
    where: { id: req.params.id, usuarioId: req.user.id }
  });

  if (!publicaciones) {
    req.flash('error', 'No válido');
    res.redirect('/administracion');
    return next();
  }
  res.render('eliminar-publicacion', {
    nombrePagina : `${publicaciones.titulo}`
  })
}
exports.eliminarPublicacion = async (req, res, next) => {
  await Publicaciones.destroy({
    where: { id: req.params.id, usuarioId: req.user.id }
  });
  req.flash('pass', 'Se borro la publicación');
  res.redirect('/administracion');
}
