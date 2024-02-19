//configuracion inicial de node
const express = require('express');
require('dotenv').config();

console.log(process.env);
//crear el servidor de express
const app= express();

//directorio publico 

app.use(express.static('public'));
//rutas

// app.get('/', (req, res)=>{
//     res.json({ok:true});
// });

//escuchar peticiones

app.listen(process.env, ()=> {
    console.log(`Servidor corriendo en puerto ${4000}`);
})