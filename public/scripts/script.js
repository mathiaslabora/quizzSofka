//getjson para atrapar json que traemos de la db
let getJSONData = function (url) {
    let result = {};
    return fetch(url)
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
        return result;
      })
      .catch(function (error) {
        result.status = 'error';
        result.data = error;
        return result;
      });
  }
  let questions;
  let route = "/quest"
//ejecucion de modal bienvenida
$(window).on('load',function(){
    $('#exampleModal').modal('show');
});
document.addEventListener("DOMContentLoaded", async function (e) {

    const gtdata= (await getJSONData(route)).data
    questions = gtdata
    console.log(questions)
});