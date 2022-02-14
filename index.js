const express = require('express');
const app = express();
require('./connection');
const Tag = require('./models/Tag');
const Ingreso = require('./models/Ingreso');
const { getDateTimeISOString } = require('./utils/date.utils');
const moment = require('moment');
const cors= require('cors');

//CORS Policy
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

app.use(express.json());

app.post('/api/check-access', async (req, res) => {
    const tagNumber = req.body.number;

    //Find tag in database
    const tag = await Tag.findOne({ number: tagNumber }).exec().then(resp => resp);
    if (tag) {
        res.send({
            access: true
        });
    } else {
        res.send({
            access: false
        });
    }
});

app.post('/api/register-tag', async (req, res) => {
    const tagNumber = req.body.number;
    //Registrar tag
    const tag = new Tag({
        number: tagNumber
    });

    try {
        let tagSaved = await tag.save();
        console.log(tagSaved);
        res.send(tagSaved);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al guardar el tag');
    }
});

app.post('/api/registrar-ingreso', async (req, res) => {
    const fecha = req.body.fecha ? new Date(req.body.fecha) : new Date();

    const ingreso = new Ingreso({
        fecha,
        tag: req.body.tag,
        cod: req.body.cod
    });

    try {
        let ingresoSaved = await ingreso.save();
        console.log(ingresoSaved);
        res.send(ingresoSaved);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al guardar el ingreso');
    }
});

app.get('/api/ingresos/hoy', async (req, res) => {
    let today = new Date();
    let tomorrow = new Date();

    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(today.getDate() + 1);

    const ingresos = await Ingreso.find({ fecha: { $gte: today, $lt: tomorrow } }).exec().then(resp => resp);
    res.send(ingresos);
});

app.get('/api/ingresos/:fechaInicio/:fechaFin', async (req, res) => {
    const ingresos = await Ingreso.find({ fecha: { $gte: req.params.fechaInicio, $lte: req.params.fechaFin } }).exec().then(resp => resp);
    res.send(ingresos);
});