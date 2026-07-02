const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

require('./config/database');

const tareasRoutes = require('./routes/tareas');
const authRoutes = require('./routes/auth');

app.use('/tareas', tareasRoutes);
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.json({ mensaje: 'API Task Manager v1.0' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


