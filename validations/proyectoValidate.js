const {check} = require('express-validator');

exports.proyectopost = [
     check('name').trim().notEmpty().withMessage('El proyecto es requerido'),
]