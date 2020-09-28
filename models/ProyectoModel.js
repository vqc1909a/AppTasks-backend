const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
     name: {
        type: String,
        required: true
     },
     userid: {
          type: mongoose.Types.ObjectId,
          ref: 'User'
     }
},{
     timestamps: true
});

const Proyecto = mongoose.model('Proyecto', ProyectoSchema);
module.exports = Proyecto;