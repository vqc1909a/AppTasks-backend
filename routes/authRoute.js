const express = require('express');
const Router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const {signup, signin} = require('../validations/authValidate');
const {validationResult} = require('express-validator');

Router.post('/signup', signup, async (req, res) => {
     try{
          const errors = validationResult(req);
          if(errors.errors.length !== 0) return res.status(404).json({message: errors.array()[0].msg});
          const email = await User.findOne({email: req.body.email});
          if(email) return res.status(404).json({message: "El correo ya está registrado"});
          const user =  new User(req.body);
          const hash = bcrypt.hashSync(user.password, 10);
          user.password = hash;
          const usersaved = await user.save();
          const token = jwt.sign({_id: usersaved._id}, process.env.TOKEN_SECRET, {expiresIn: "1h"});
          res.header('auth-token', token);
          return res.status(200).json({message: token});
     }catch(err){
          return res.status(404).json({message: err.message});
     }
})

Router.post('/signin', signin, async (req, res) => {
     try{
          const errors = validationResult(req);
          if(errors.errors.length !== 0) return res.status(404).json({message: errors.array()[0].msg});
          const user = await User.findOne({email: req.body.email});
          if(!user) return res.status(404).json({message: "Usuario no registrado"});
          const password = bcrypt.compareSync(req.body.password, user.password);
          if(!password) return res.status(404).json({message: "Email o password incorrecto"});
          const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: "1h"});
          res.header('auth-token', token);
          return res.status(200).json({message: token});
     }catch(err){
          return res.status(404).json({message: err.message});
     }
})

module.exports = Router;

