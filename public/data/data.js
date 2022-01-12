/* let getJSONData = function (url) {
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
export let data;
async function takeJson () {
    const gtdata= (await getJSONData("/quest")).data
    data = gtdata;
}
takeJson();
console.log(data)
document.addEventListener("DOMContentLoaded", async function (e) {
    
   
    
}); */


