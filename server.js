const express = require('express')
const mongoose = require("mongoose")
const Portada = require("./portada")
const cors = require("cors")

//connect with db
mongoose.connect('mongodb+srv://jesus:manuchuk10@cluster0.dnm5t.mongodb.net/PAPA-PERIODICOS?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', function(error) {
    console.log('error:', error);
    process.exit(1)
})

const app = express();
const PORT = process.env.PORT || 3010;

app.use(cors({origin: '*'}));

app.get('/api/portadas', async (req, res) => {
    const resultados = await Portada.find();
    res.json(resultados)
})

const query = {}

app.listen(PORT, () => {
    console.log('server up')
})