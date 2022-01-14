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
const { response } = require('express');
const password = 'quiz';
const nameDB = 'quizSofka';
const URI = `mongodb+srv://quiz:${password}@cluster0.9npo9.mongodb.net/${nameDB}?retryWrites=true&w=majority`
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
let db = client.db(nameDB);


//routes to db
app.get("/nivel/:index", async (req, res) => {
    try {
        await client.connect();
        const quest = await db.collection(req.params.index).find().toArray()
        res.json(quest)

    } catch (error) {
        console.log(error)

    }
    await client.close()
});

app.post("/saveProgress", async (req, res) => {
    let body = req.body
    console.log(body)
    try {
        await client.connect()
        await db.collection('register').insertOne(body)
    } catch (error) {
        console.log(error)
    }
})

app.get("/ranking", async (req, res) => {
    try {
        await client.connect();
        const quest = await db.collection('register').find().toArray()
        res.json(quest)
    } catch (error) {
        console.log(error)
    }
    await client.close()
});


//init server
app.listen(port, () => {
    console.log(`App iniciada en el puerto ${port}`)
});