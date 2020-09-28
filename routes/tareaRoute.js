const express = require('express');
const Router  = express.Router();
const {tareapost, tareaput} = require('../validations/tareaValidate');
const Proyecto  = require('../models/ProyectoModel');
const Tarea = require('../models/TareaModel');
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');
const authMiddleware = require('../middlewares/authMiddleware');
Router.post('/tareas', authMiddleware, tareapost, async (req, res) => {
     try{
          const errors = validationResult(req);
          if(errors.errors.length !== 0) return res.status(404).json({message: errors.array()[0].msg});
          const proyectoid = mongoose.isValidObjectId(req.body.proyectoid);
          if(!proyectoid) return res.status(404).json({message: 'Id Inválido'}); 
          const proyecto = await Proyecto.findById(req.body.proyectoid);
          if(!proyecto) return res.status(404).json({message: 'El proyecto no existe'});
          if(proyecto.userid.toString() !== req.user._id) return res.status(401).json({message: "Acceso denegado"});
          const tarea = new Tarea(req.body);
          const tareasaved = await tarea.save();
          return res.status(200).json({message: 'Tarea Creado', body: tareasaved});
     }catch(err){
          return res.status(404).json({message: err.message});
     }
})
Router.put('/tareas/:id',authMiddleware ,tareaput, async (req, res) => {
     try{
          const errors = validationResult(req);
          if(errors.errors.length !== 0) return res.status(404).json({message: errors.array()[0].msg});
          const tareaid = mongoose.isValidObjectId(req.params.id);
          if(!tareaid) return res.status(404).json({message: 'Id Inválido'});
          const tarea = await Tarea.findById(req.params.id);
          if(!tarea) return res.status(404).json({message: 'La tarea no existe'}); 
          const proyecto = await Proyecto.findById(tarea.proyectoid);
          if(!proyecto) return res.status(404).json({message: "El proyecto no existe"});
          if(proyecto.userid.toString() !== req.user._id) return res.status(401).json({message: "Acceso denegado"});
          const tareaupdated = await Tarea.updateOne({_id: req.params.id}, req.body, {runValidators: true});
          return res.status(200).json({message: 'Tarea Actualizada', body: tareaupdated});
     }catch(err){
          return res.status(404).json({message: err.message});
     }
})
Router.delete('/tareas/:id', authMiddleware, async (req, res) => {
     try{
          const tareaid = mongoose.isValidObjectId(req.params.id);
          if(!tareaid) return res.status(404).json({message: 'Id Inválido'}); 
          const tarea = await Tarea.findById(req.params.id);
          if(!tarea) return res.status(404).json({message: 'La tarea no existe'});
          const proyecto = await Proyecto.findById(tarea.proyectoid);
          if(!proyecto) return res.status(404).json({message: "El proyecto no existe"});
          if(proyecto.userid.toString() !== req.user._id.toString()) return res.status(401).json({message: "Acceso denegado"});           
          const tareadeleted = await Tarea.deleteOne({_id: req.params.id});
           return res.status(200).json({message: "Tarea eliminada", body: tareadeleted});
     }catch(err){
           return res.status(404).json({message: err.message});
     }
})

Router.get('/tareas', authMiddleware, async (req, res) => {
     try{  
          const tareas = await Tarea.find({}).sort({createdAt: -1});
          return res.status(200).json({body: tareas});
     }catch(err){
          return res.status(404).json({message: err.message});
     }
})
module.exports = Router;
