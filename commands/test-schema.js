const { string } = require('mathjs')
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    message: {
        type : string,
        required: true
    }
})

module.exports = mongoose.model('Util', schema, 'Util')