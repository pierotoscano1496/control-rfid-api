const { Schema, model } = require('mongoose');

const tagSchema = new Schema({
    number: String
});

module.exports = model('tag', tagSchema);