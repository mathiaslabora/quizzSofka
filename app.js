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

//init server
app.listen(port, () =>
{
    console.log(`App iniciada en el puerto ${port}`)
});