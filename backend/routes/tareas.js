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

// Editar una tarea
router.put('/:id', (req, res) => {
  const { titulo, descripcion, prioridad, estado, fecha_limite } = req.body;
  const { id } = req.params;

  const resultado = db.prepare(`
    UPDATE tareas 
    SET titulo = ?, descripcion = ?, prioridad = ?, estado = ?, fecha_limite = ?
    WHERE id = ?
  `).run(titulo, descripcion, prioridad, estado, fecha_limite, id);

  if (resultado.changes === 0) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }

  res.json({ mensaje: 'Tarea actualizada' });
});

// Eliminar una tarea
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const resultado = db.prepare('DELETE FROM tareas WHERE id = ?').run(id);

  if (resultado.changes === 0) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }

  res.json({ mensaje: 'Tarea eliminada' });
});

module.exports = router;