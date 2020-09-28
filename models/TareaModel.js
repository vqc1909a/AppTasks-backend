const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
     name: {
        type: String,
        required: true
     },
     estado: {
        type: Boolean,
        default: false
     },
     proyectoid: {
          type: mongoose.Types.ObjectId,
          ref: 'Proyecto'
     }
}, {
     timestamps: true
});

const Tarea = mongoose.model('Tarea', TareaSchema);
module.exports = Tarea;