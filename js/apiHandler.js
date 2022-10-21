class Question
{
    constructor(question)
    {
       this.category = question.category;
       this.difficulty = question.difficulty;
       this.questionText = question.question;
       this.correct_answer = question.correct_answer;
       this.incorrect_answers = question.incorrect_answers;
       this.choices = [...this.incorrect_answers];
       this.choices.splice(Math.floor(Math.random()* (this.incorrect_answers.length + 1)),0,this.correct_answer)
    }
}

export default class Quiz
{
    static Categories = {
        anyCategory : "any",
        generalKnowledge : "9",
        sports : "21",
        celebrities : "26",
        animals : "27",
        vehicles : "28",
        history : "23",
    }

    static Difficulties = {
        easy: "easy",
        medium: "medium",
        hard: "hard"
    }

    static amount = "10";
    static category = Quiz.Categories.anyCategory;
    static difficulty = Quiz.Difficulties.medium;

    static async getQuestions()
    {
        const response = await fetch(`https://opentdb.com/api.php?amount=${this.amount}${this.category === 'any'? '':'&category='+this.category}&difficulty=${this.difficulty}&type=multiple`);
        return await response.json().then((responseBody)=>responseBody.results);
    }

    static parseQuestion(question)
    {
        return new Question(question)
    }
}