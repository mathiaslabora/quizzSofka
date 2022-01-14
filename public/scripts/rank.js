

let rank;
let rankOrd;
//funcion para ingresar datos recorridos, en tabla html
const putDataOnTable = (p) => {
    for (let i = 0; i < p.length; i++) {
        document.getElementById('tabRank').innerHTML += `<tr>
    <td>${p[i].name}</td>
    <td>${p[i].score}</td>
</tr>`
    }
}

//func auxiliar ordenamiento
const auxOrd = () => {
    rankOrd = rank.sort((a, b) => {
        if (b.score < a.score) { return -1; }
        if (b.score > a.score) { return 1; }
        return 0;
    })
}

document.addEventListener("DOMContentLoaded", async function (e) {
    await fetch('/ranking')
        .then(response => response.json())
        .then(data => {
            rank = data;
        })
        .catch(console.error);
    //ordeno array de obj
    auxOrd()
    //se ingresan datos ordenados en tabla
    putDataOnTable(rankOrd)
    //comportamiento boton volver
    document.getElementById('btnBackGame').addEventListener('click', () => {
        window.location.href = "index.html";
    })

});