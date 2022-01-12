export class Question{
constructor(quest, options, ans){
    this.quest = quest;
    this.options = options;
    this.ans = ans;
}

corrAnswer(option){
    return option === this.ans
}
}