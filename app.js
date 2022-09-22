//importar express
const express = require('express');

//Crear aplicacion de express
const app = express();

//Importar JSON
const {infoCursos} = require('./cursos.js');

//Routing
app.get('/',(req, res)=>{
    res.send('Servidor de cursos con express');
});

app.get('/api/cursos',(req, res)=>{
   res.send(JSON.stringify(infoCursos));
});

//cursos de programacion
app.get('/api/cursos/programacion',(req, res)=>{
   res.send(JSON.stringify(infoCursos.programacion));
});

//cursos de Matematicas
app.get('/api/cursos/matematicas',(req, res)=>{
   res.send(JSON.stringify(infoCursos.matematicas));
});

//con process.env.PORT para detectar cualquier puerto o el 3000
const puerto = process.env.PORT || 3000;

app.listen(puerto,()=>{
    console.log('Servidor Ok');
});
