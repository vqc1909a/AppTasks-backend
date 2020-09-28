const express = require('express');
const cors = require('cors');
const ConnectDB = require('./config/db');

const proyectoRoute = require('./routes/proyectoRoute');
const tareaRoute = require('./routes/tareaRoute');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');


require("dotenv").config({});

//Crear el servidor
const app = express();
const port = process.env.PORT || 4000;


//Conectar DB
ConnectDB();

//Middlewares
app.use(express.json({extended: true}));
app.use(cors());


//Rutas
app.use('/api', proyectoRoute);
app.use('/api', tareaRoute);
app.use('/api', userRoute);
app.use('/api/user', authRoute);


//Ruta Principal
app.get('/', (req,res) => {
     res.send('Hola');
})

//Escuchar al puerto
app.listen(port, () => {
     console.log(`Server run on port ${port}`);
})


