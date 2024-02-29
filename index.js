//configuracion inicial de node
const express = require('express');
const {dbConnection} = require('./database/config');
const cors= require('cors');
require('dotenv').config();

//console.log(process.env);
//crear el servidor de express
const app= express();

//directorio publico
app.use(express.static('public'));
//lectura y parseo del body (middleware)
app.use(express.json());

//base de datos
dbConnection();

//cords
app.use(cors());
//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//si llega algo que no es ninguna de las rutas permitidas
app.get('*', (req,res)=>{
    res.sendFile(__dirname+ '/public/index.html');
})
//escuchar peticiones

app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})