const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'database.sqlite'));

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    contrasena TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    estado TEXT DEFAULT 'pendiente',
    prioridad TEXT DEFAULT 'media',
    fecha_limite TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  );
`);

const usuarioExiste = db.prepare('SELECT id FROM usuarios WHERE id = 1').get();

if (!usuarioExiste) {
  db.prepare(`
    INSERT INTO usuarios (nombre, email, contrasena) 
    VALUES (?, ?, ?)
  `).run('Montse', 'monsegarciac987@gmail.com', '123456');
  console.log('Usuario de prueba creado');
}

console.log('Base de datos conectada');

module.exports = db;