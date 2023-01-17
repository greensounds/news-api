const mongoose = require('mongoose')
const Portada = require("./portada")

//connect with db
mongoose.connect('mongodb+srv://jesus:manuchuk10@cluster0.dnm5t.mongodb.net/PAPA-PERIODICOS?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', function(error) {
    console.log('connection error', error);
    process.exit(1)
})

exports.guardarPortadas = async(portadas) => {
    await Portada.collection.drop();
    for (const portada of portadas) {
        try{
            await new Portada(portada).save()
        } catch(error) {
            console.log('Problema al guardar', error)
        }
    }
} 