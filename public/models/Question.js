//creacion clase pregunta
export class Question{

/**
 * 
 * @param {string} quest 
 * @param {Array} options 
 * @param {string} ans 
 */


constructor(quest, options, ans){

    this.quest = quest;
    this.options = options;
    this.ans = ans;
}
//si la opcion elegida es igual a la respuesta(correcta) retorna true sino false
corrAnswer(option){
    return option === this.ans
}
}