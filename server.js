const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

MONGO_URI="mongodb+srv://matibiencomodo:QAMHDwRFlYLWg4Dw@serverfadeco.comtp.mongodb.net/DBFadeco?retryWrites=true&w=majority&appName=serverFadeco"



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('sections'))

// Conectar a MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));


// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Rutas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const piezasRouter = require('./routes/piezas')
app.use('/api/piezas', piezasRouter)

const piezasAluminio =  require('./routes/aluminio')
app.use('/api/aluminio', piezasAluminio)


app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

