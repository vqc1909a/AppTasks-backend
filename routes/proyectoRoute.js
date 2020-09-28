const express = require('express');
const Router  = express.Router();
const {proyectopost} = require('../validations/proyectoValidate');
const Proyecto = require('../models/ProyectoModel');
const Tarea = require('../models/TareaModel');
const User = require('../models/UserModel');
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

const authMiddleware = require('../middlewares/authMiddleware');

Router.post('/proyectos', authMiddleware, proyectopost, async (req, res) => {
     try{
          const errors = validationResult(req);
          if(errors.errors.length !== 0) return res.status(404).json({message: errors.array()[0].msg});
          const proyecto = new Proyecto(req.body);
          proyecto.userid = req.user._id;
          const proyectosaved = await proyecto.save();
          return res.status(200).json({message: 'Proyecto Creado', body: proyectosaved});
     }catch(err){
          return res.status(404).json({message: err.message});
     }
})

Router.delete('/proyectos/:id', authMiddleware, async (req, res) => {
     try{
          const proyectoid = mongoose.isValidObjectId(req.params.id);
          if(!proyectoid) return res.status(404).json({message: "El id es inválido"});
          const proyecto = await Proyecto.findOne({_id: req.params.id});
          if(!proyecto) return res.status(404).json({message: "El proyecto no existe"});
          if(proyecto.userid.toString() !== req.user._id) return res.status(401).json({message: "Acceso denegado"});
          const proyectodeleted = await Proyecto.deleteOne({_id: req.params.id});
          const tareasdeleted = await Tarea.deleteMany({proyectoid: req.params.id});
          return res.status(200).json({message: "Proyecto eliminado", body: {proyectodeleted, tareasdeleted}})
     }catch(err){
          return res.status(404).json({message: err.message});
     }
})

Router.get('/proyectos', authMiddleware, async (req, res) => {
     try{
          const proyectos = await Proyecto.find({userid:  req.user._id});
          return res.status(200).json({body: proyectos});
     }catch(err){
          return res.status(404).json({message: err.message});
     }
});
module.exports = Router;
