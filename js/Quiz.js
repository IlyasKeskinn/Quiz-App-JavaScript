// Class definition for Quiz
class Quiz {
    constructor(questions) {
        this.questions = {};
        this.questionIndex = 0;
        this.correctAnswer = 0;
    }
    // Method to push questions to the quiz
    pushQuestions(questionList) {
        this.questions = questionList;
    }
    // Method to get the current question
    callQuestion() {
        return this.questions[this.questionIndex];
    }

    // Method to check if the selected option is correct
    checkAnswer(selectedOption) {
        return this.questions[this.questionIndex].correct_answer === selectedOption;
    }
}


