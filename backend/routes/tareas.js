const express = require('express');
const router = express.Router();

//Obtener todas las tareas
router.get('/', (req, res) => {
    res.json({mensaje: 'Lista de tareas'});
});

//Crear una tarea
router.post('/', (req, res) => {
    res.json({mensaje: 'Tarea creada'});
});

module.exports = router;