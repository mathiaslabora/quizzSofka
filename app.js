const express = require('express');
const app = express();
const cors = require('cors');

//config
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/Public'));

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));//se encarga de entender los datos que envia un form desde html
app.use(express.json());

//conection db
const { MongoClient } = require('mongodb');
const password = 'quiz';
const nameDB = 'quizSofka'
const URI = `mongodb+srv://quiz:${password}@cluster0.9npo9.mongodb.net/${nameDB}?retryWrites=true&w=majority`
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
let db = client.db(nameDB);















//init server
app.listen(port, () =>
{
    console.log(`App iniciada en el puerto ${port}`)
});