const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Obtener todas las tareas
router.get('/', (req, res) => {
  const tareas = db.prepare('SELECT * FROM tareas').all();
  res.json(tareas);
});

// Crear una tarea
router.post('/', (req, res) => {
  const { titulo, descripcion, prioridad, fecha_limite } = req.body;
  
  const resultado = db.prepare(`
    INSERT INTO tareas (usuario_id, titulo, descripcion, prioridad, fecha_limite)
    VALUES (1, ?, ?, ?, ?)
  `).run(titulo, descripcion, prioridad, fecha_limite);

  res.json({ id: resultado.lastInsertRowid, mensaje: 'Tarea creada' });
});

module.exports = router;