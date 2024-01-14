// Class definition for Question
class Question {
    constructor() {
        this.clienId = "";
        this.clientSecret = "";
    }
    // Method to get questions based on parameters
    async getQuestions(amount, category, difficulty) {

        const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;
        const response = await fetch(url);
        const data = await response.json();

        return { data }
    }
}