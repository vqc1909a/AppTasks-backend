const express = require('express');
const Router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const User  = require('../models/UserModel');
Router.get('/user', authMiddleware, async (req, res) => {
     try{
          const user = await User.findById(req.user._id).select('-password');
          return res.status(200).json({body: user});
     }catch(err){
          return res.status(404),json({message: err.message});
     }
})
module.exports = Router;