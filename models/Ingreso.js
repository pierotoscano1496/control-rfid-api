const { Schema, model } = require('mongoose');

const ingresoSAchema = new Schema({
    cod: String,
    fecha: Date,
    tag: String
});

module.exports = model('ingreso', ingresoSAchema);