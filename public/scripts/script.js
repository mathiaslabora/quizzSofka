import { Player } from "../models/Player.js";
import { Question } from "../models/Question.js";


//ruta variable dependiendo de nivel.
let level = "level1";
//donde ingreso las preguntas
let quesPut = document.getElementById('quest');
//ingreso nombre usuario
let putPlayer = document.getElementById('user');
//ingreso score
let putScore = document.getElementById('score');
//obj jugador
let player;
//ingreso titulo nivel
let lvlPut = document.getElementById('lvlPut');
//guarda json de preguntas
let jsonQuest;
//obj preguntas
let questions;
//contador para preguntas
let countNextQuest = 0;
//donde se guarda temporalmente el alert
let putAlert = document.getElementById("putAlert")
//ejecucion de modal bienvenida

//aumentador de indice preguntas
const addToQues = () => {
    countNextQuest++;
}

//actualizo los datos cada que cambia de ronda.
const updateDataUser = () => {
    //pongo datos input player y score
    putPlayer.innerHTML = `<b>${player.name}</b>`;
    putScore.innerHTML = `<b>${player.score}</b>`;
}

//creo mensaje al fin de ronda, aumento score
const messageAndUpScore = (namLvl, numbScore) => {
    putAlert.innerHTML = ` <div class="alert alert-primary" role="alert">
 Felicitaciones, avanzaste al ${namLvl} y ganaste ${numbScore} Quizzez!!
</div>`
    setTimeout(() => {
        putAlert.innerHTML = "";
    }, 3200)
    //sumo al score, el nuevo score obtenido
    player.score += numbScore

    updateDataUser();
//ingreso titulo nivel
    lvlPut.innerHTML = `<h2>${namLvl}</h2>`
//reinicia contador
    countNextQuest = 0
}

//func para creacion de preguntas aleatoriamente, introducir en botones las opciones.
const showQandOptions = (param) => {
    quesPut.innerHTML = `<b>${questions[countNextQuest].quest}</b>`;
    document.getElementById('addBtn').innerHTML = ""
    for (let i = 0; i <= 3; i++) {
        const button = document.createElement("button");
        button.className = "btn btn-primary";
        button.innerText = param[i];
        button.addEventListener('click', () => {
            //valida si respuesta es la correcta:
            let validatorAns = questions[countNextQuest].corrAnswer(button.innerText)
            if (!validatorAns) {
                console.log('hola')
            }
            if (countNextQuest < 4) {
                addToQues();
                showQandOptions(questions[countNextQuest].options);
            } else {
                //el swich realiza acciones dependiendo de la ronda en la que este
                switch (level) {
                    case "level1":
                        level = "level2"
                        messageAndUpScore("Nivel 2", 100)
                        jsonGet(level);
                        break;
                    case "level2":
                        level = "level3"
                        messageAndUpScore("Nivel 3", 300)
                        countNextQuest = 0
                        jsonGet(level);
                        break;
                    case "level3":
                        level = "level4"
                        messageAndUpScore("Nivel 4", 500)
                        countNextQuest = 0
                        jsonGet(level);
                        break;
                    case "level4":
                        level = "level5"
                        messageAndUpScore("Nivel 5", 600)
                        countNextQuest = 0
                        jsonGet(level);
                        break;
                    case "level5":
                        player.score += 1500
                        alert('Felicidades, ganó el juego su recompenza final es de 1500 QUIZZES, total: ' + player.score + ' le mostraremos las clasificaciones')
                        window.location.href = "ranking.html";
                        break;
                }
            }
        });
        document.getElementById('addBtn').append(button);
    }
}


//funcion q trae preguntas de db segun nivel
//el index que paso es el nombre de la coleccion, para traer preguntas correspondientes a el nivel
const jsonGet = async (index) => {
    let result = {};
    await fetch(`/nivel/${index}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
        });
    jsonQuest = result.data;
    //creacion objetos q
    questions = jsonQuest.map(question => new Question(question.pregunta, question.opciones, question.respCorrecta))
    //mismo pero random
    questions.sort(function () { return Math.random() - 0.5 });

    showQandOptions(questions[countNextQuest].options)
}


document.addEventListener("DOMContentLoaded", async function (e) {
    //abre modal e impide que se cierre con click fuera
    $('#exampleModal').modal({ backdrop: 'static', keyboard: false });
    $('#exampleModal').modal('toggle')

    jsonGet(level);
    //comportamiento boton de modal para comenzar
    document.getElementById('btnStart').addEventListener('click', () => {
        let userValue = document.getElementById('takeUser').value
        if (userValue !== '') {
            $('#exampleModal').modal('toggle')
            //creo player
            player = new Player(userValue, 0);

            updateDataUser();
        } else {
            alert("Debe ingresar nombre de Jugador")
        }



    })


    /* document.getElementById() */
});