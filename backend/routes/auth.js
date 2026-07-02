const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

//Registro
router.post('/registro',async (req, res) => {
    const {nombre, email, contrasena} = req.body;
    const usuarioExiste = db.prepare('SELECT id FROM usuarios WHERE email = ?').get(email);
    if (usuarioExiste) {
        return res.status(400).json({mensaje: 'El email ya esta registrado'});
    }
    const hash = await bcrypt.hash(contrasena, 10);
    const resultado = db.prepare(`
        INSERT INTO usuarios (nombre, email, contrasena)
        VALUES (?,?,?)
        `).run(nombre, email, hash);
    res.status(201).json({ id:resultado.lastInsertRowid, mensaje:'Usuario registrado'});
});

//Login
router.post('/login', async (req, res) => {
    const {email, contrasena} = req.body;
    const usuario = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
    if (!usuario) {
        return res.status(401).json({mensaje: 'Credenciales incorrectas'});
    }
    const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!passwordValida) {
    return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    'secreto_temporal',
    { expiresIn: '24h' }
  );
  res.json({ token, mensaje: 'Login exitoso' });
});

module.exports = router;