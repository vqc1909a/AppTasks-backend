const {check} = require('express-validator');

exports.tareapost = [
     check('name').trim().notEmpty().withMessage('La tarea es obligatoria'),
     check('proyectoid').trim().notEmpty().withMessage('El id del proyecto es obligatorio')
]
exports.tareaput = [
     check('estado').optional().isBoolean().withMessage('El estado es true o false')
]