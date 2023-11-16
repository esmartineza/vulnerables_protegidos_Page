const express = require('express');
const Post = require('../models/Post');
const multer = require('multer');
const shortid = require('shortid');
const fileSystem = require('fs');

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, next) => {
      next(null, __dirname + '/../public/uploads/post/');
    },
    filename: (req, file, next) => {
      const extension = file.mimetype.split('/')[1];
      next(null, `${shortid.generate()}.${extension}`);
    }
  })
  )
};

const upload = multer(configuracionMulter).single('imagen');

exports.subirImagen = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      console.log(error);
    } else {
      next();
    }
  });
};

exports.formNuevoPost = (req, res) => {
  res.render('nuevo-post', {
    nombrePagina: "Crear Categoria"
  });
};

exports.createPost = async (req, res) => {
  const post = req.body;
  post.usuarioId = req.user.id;

  post.imagen = req.file.filename;
  try {
    await Post.create(post);
    req.flash('success', 'Se Creó el Post Correctamente');
    res.redirect('/administracion');
  } catch (error) {
    console.log(error);
    req.flash('error', 'Error al crear el Post');
    res.redirect('/nuevo-post');
  }
};

exports.formEditarPost = async (req, res) => {
  const post = await Post.findByPk(req.params.postId);
  res.render('editar-post', {
    nombrePagina: `Editar Post : ${post.nombrepost}`,
    post
  });
};

exports.editarPost = async (req, res, next) => {
  const post = await Post.findOne({ where: { id: req.params.postId, usuarioId: req.user.id } });

  if (!post) {
    req.flash('error', 'No válido');
    res.redirect('/administracion');
    return next();
  }
  const { nombrepost, descripcion } = req.body;
  post.nombrepost = nombrepost;
  post.descripcion = descripcion;

  await post.save();
  req.flash('success', 'Cambios Realizados');
  res.redirect('/administracion');
};

exports.formEditarImg = async (req, res) => {
  const post = await Post.findByPk(req.params.postId);
  res.render('imagen-post', {
    nombrePagina: `Editar Imagen del Post: ${post.nombrepost}`,
    post
  });
};

exports.editarImg = async (req, res, next) => {
  const post = await Post.findOne({ where: { id: req.params.postId, usuarioId: req.user.id } });

  if (!post) {
    req.flash('error', 'No válido');
    res.redirect('/iniciar-sesion');
    return next();
  }

  if (req.file && post.imagen) {
    const imagenActual = __dirname + `/../public/uploads/post/${post.imagen}`;

    fileSystem.unlink(imagenActual, (error) => {
      if (error) {
        console.log(error);
      }
      return;
    });
  }

  if (req.file) {
    post.imagen = req.file.filename;
  }

  await post.save();
  req.flash('success', 'Se Guardó la Imagen Correctamente');
  res.redirect('/administracion');
};

exports.formEliminarPost = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.postId, usuarioId: req.user.id } });
  res.render('eliminar-post', {
    nombrePagina: `Eliminar este Post: ${post.nombrepost}`
  });
};

exports.eliminarPost = async (req, res, next) => {
  const post = await Post.findOne({ where: { id: req.params.postId, usuarioId: req.user.id } });

  if (!post) {
    req.flash('error', 'No válido');
    res.redirect('/administracion');
    return next();
  }

  if (post.imagen) {
    const imagenActual = __dirname + `/../public/uploads/post/${post.imagen}`;
    fileSystem.unlink(imagenActual, (error) => {
      if (error) {
        console.log(error);
      }
      return;
    });
  }

  await Post.destroy({
    where: { id: req.params.postId }
  });

  req.flash('success', 'Se eliminó el Post Correctamente');
  res.redirect('/administracion');
};
