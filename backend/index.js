const express = require('express');
const app = express();
const PORT = 3000;

const tareasRoutes = require('./routes/tareas');

app.use(express.json());

app.use('/tareas', tareasRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'API Task Manager v1.0' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});