//Routers:

//router programacion
const express = require("express");
const {infoCursos} = require("../cursos");
const routerProgramacion = express.Router();
app.use('/api/cursos/programacion',routerProgramacion);

//router matematica.
const routerMatematicas = express.Router();
app.use('/api/cursos/matematicas',routerMatematicas);

routerProgramacion.get('/',(req, res)=>{
    res.send(JSON.stringify(infoCursos.programacion))
})

app.get('/',(req, res)=>{
    res.send('Servidor de cursos con express');
});

//Info curso programacion con router
app.get('/api/cursos',(req, res)=>{
    res.send(JSON.stringify(infoCursos));
});

//cursos de Matematicas
routerMatematicas.get('/',(req, res)=>{
    res.send(JSON.stringify(infoCursos.matematicas));
});

//Buscar por parametros de ruta en progrmacion con routers.
routerProgramacion.get('/:lenguaje',(req, res)=>{

    const lenguaje = req.params.lenguaje;

    //Filtrar informacion
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);

    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
    }
    res.send(JSON.stringify(resultados));
});

//Buscar por curso y nivel
routerProgramacion.get('/:lenguaje/:nivel',(req, res)=>{
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;

    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje} y de nivel ${nivel}`);
    }

    //URL Query, vistas.
    if(req.query.ordenar === 'vistas'){//desendente
        return res.send(JSON.stringify(resultados.sort((a,b)=>b.vistas - a.vistas)));
    }

    res.send(JSON.stringify(resultados));
});

//Matematicas
routerMatematicas.get('/:tema',(req, res)=>{

    const tema = req.params.tema;

    //Filtrar informacion
    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema);

    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron cursos de ${tema}`);
    }
    res.send(JSON.stringify(resultados));
});


//con process.env.PORT para detectar cualquier puerto o el 3000
const puerto = process.env.PORT || 3000;

app.listen(puerto,()=>{
    console.log('Servidor Ok');
});

