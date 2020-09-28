const {check}  = require('express-validator');

exports.signup = [
     check('name').trim().notEmpty().withMessage('El nombre es requerido'),
     check('email').trim().notEmpty().withMessage('El email es requerido').normalizeEmail().isEmail().withMessage('Ingrese un email válido'),
     check('password').trim().notEmpty().withMessage('El password es requerido').isLength({min: 8}).withMessage('El password debe tener como minimo 8 dígitos').matches(/[1-9]/).withMessage('El password debe tener por lo menos un número')
]

exports.signin = [
     check('email').trim().notEmpty().withMessage('El email es requerido').normalizeEmail().isEmail().withMessage('Ingrese un email válido'),
     check('password').trim().notEmpty().withMessage('El password es requerido').isLength({min: 8}).withMessage('El password debe tener como minimo 8 dígitos').matches(/[1-9]/).withMessage('El password debe tener por lo menos un número')
]