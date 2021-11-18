const mongoose = require('mongoose');
const db = mongoose.connection;
const uri = 'mongodb://localhost:27017/control-rfid';

mongoose.connect(uri);

db.on('connected', () => {
    console.log('connected to', uri);
});

db.on('error', (err) => {
    console.log('Conexion error', err);
});