const express = require('express');
const app = express();
require('./connection');
const Tag = require('./models/Tag');

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
        res.status(500).send('Error while saving tag');
    }
});