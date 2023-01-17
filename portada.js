const mongoose = require('mongoose')
const PortadaEsquema = new mongoose.Schema({
    portadas: [{type: String}],
    url: String
})
module.exports = mongoose.model('Portada', PortadaEsquema);