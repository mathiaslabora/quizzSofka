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
//ingreso titulo nivel
let lvlPut = document.getElementById('lvlPut');
//donde se guarda temporalmente el alert
let putAlert = document.getElementById("putAlert");
//obj jugador
let player;
//guarda json de preguntas
let jsonQuest;
//obj preguntas
let questions;
//contador para preguntas
let countNextQuest = 0;


//aumentador de indice preguntas
const addToQues = () => {
    countNextQuest++;
}

//actualizo los datos cada que cambia de ronda.
const updateDataUser = () => {
    //pongo datos input player y score
    putPlayer.innerHTML = `<h5>${player.name}</h5>`;
    putScore.innerHTML = `<h5>${player.score}</h5>`;
    //cambio titulo segun ronda
    switch (level) {
        case "level1":
            lvlPut.innerHTML = `<h2>Nivel 1 - Geografía</h2>`
            break;
        case "level2":
            lvlPut.innerHTML = `<h2>Nivel 2 - Matemática</h2>`
            break;
        case "level3":
            lvlPut.innerHTML = `<h2>Nivel 3 - Música</h2>`
            break;
        case "level4":
            lvlPut.innerHTML = `<h2>Nivel 4 - Inglés</h2>`
            break;
        case "level5":
            lvlPut.innerHTML = `<h2>Nivel 5 - Programación</h2>`
            break;
    }
}

//creo mensaje al fin de ronda, aumento score
const messageAndUpScore = (namLvl, numbScore) => {
    putAlert.innerHTML = ` <div class="alert alert-primary d-flex" role="alert">
 Felicitaciones, avanzaste al ${namLvl} y ganaste ${numbScore} Quizzez!!
</div>`
    setTimeout(() => {
        putAlert.innerHTML = "";
    }, 3200)
    //sumo al score, el nuevo score obtenido
    player.score += numbScore

    updateDataUser();

    //reinicia contador
    countNextQuest = 0
}

//func para creacion de preguntas aleatoriamente, introducir en botones las opciones.
const showQandOptions = (param) => {
    //coloco pregunta
    quesPut.innerHTML = `<h4>${questions[countNextQuest].quest}</h4>`;
    //limpio botones
    document.getElementById('addBtn').innerHTML = ""
    //genera botones con las opciones de respuesta
    for (let i = 0; i <= 3; i++) {
        const button = document.createElement("button");
        button.className = "btn btn-primary";
        button.innerText = param[i];
        button.addEventListener('click', () => {
            //valida si respuesta es la correcta:
            let validatorAns = questions[countNextQuest].corrAnswer(button.innerText)
            if (!validatorAns) {
                //ejecucion modal en caso de errar pregunta
                $('#modalLoose').modal({ backdrop: 'static', keyboard: false });
                $('#modalLoose').modal('toggle')
            } else {
                //para si esta dentro de la cantidad de preguntas
                if (countNextQuest < 4) {
                    addToQues();
                    showQandOptions(questions[countNextQuest].options);
                } else {
                    //al finalizar el if, el swich realiza acciones dependiendo de la ronda en la que este
                    switch (level) {
                        case "level1":
                            //modificando level, referencio la peticion al serv, para que traiga las preguntas en base al nivel.
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
                            document.getElementById('msgWin').innerHTML = `Felicidades, ganó el juego, su recompenza final es de <b>1500 QUIZZES</b>, total: ${player.score}  le mostraremos las clasificaciones`
                            $('#modalWin').modal({ backdrop: 'static', keyboard: false });
                            $('#modalWin').modal('toggle')

                            break;
                    }
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


//funciones que guarda datos en DB y redirige
const leaveEnd = () => {
    leaveOrWin();
    //spinner
    document.getElementById('putAlert').innerHTML = `
    <div class="spinner-grow text-primary align-items-center" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`
    setTimeout(() => {
        window.location.href = "ranking.html"
    }, 2500)

}
// funcion para post, se usa dentro de leaveEnd
const leaveOrWin = async () => {
    if (player.score != 0) {
        await fetch("/saveProgress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(player)
        })
            .catch(console.error)
    }
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

    //boton abre modal cuando intenta abandonar
    document.getElementById('btnLeave').addEventListener('click', () => {
        if (player.score === 0) {
            document.getElementById('msgScore').innerHTML = `Está a punto de abandonar el juego con: ${player.score} Quizzes, No figurará en el Ranking! desea continuar?`
            $('#modalLeave').modal('toggle')
        } else {
            document.getElementById('msgScore').innerHTML = `Está a punto de abandonar el juego con: ${player.score} Quizzes, desea coninuar?`
            $('#modalLeave').modal('toggle')
        }
    })
    //comportamiento boton abandonar dentro del modal
    document.getElementById('leave').addEventListener('click', leaveEnd)
    //comportamiento boton juego ganado dentro de modal
    document.getElementById('endWin').addEventListener('click', leaveEnd)
    //comportamiento boton al perder partida
    document.getElementById('btnLoose').addEventListener('click', () => {
        window.location.href = "index.html";
    })
});