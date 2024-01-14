
// Class definition for UI
class UI {
    constructor() {
        this.startCard = document.getElementById("startCard");
        this.gameOptionsCard = document.getElementById("gameOptionsCard");
        this.questionCard = document.getElementById("questionCard");
        this.finishGameCard = document.getElementById("finishGameCard");
        this.startGame = document.getElementById("startBtn");
        this.saveOption = document.getElementById("saveAndStart");
        this.questionAmount = document.getElementById("questionAmountTxt");
        this.categorySelect = document.getElementById("categorySelect");
        this.difficultySelect = document.getElementById("difficultySelect");
        this.timer = document.getElementById("timer");
        this.questionBody = document.querySelector(".questionBody");
        this.questionTitle = document.querySelector(".qustionTitle");
        this.optionsList = document.querySelector(".options");
        this.option = document.querySelectorAll(".option");
        this.questionIndex = document.querySelector(".questionIndex");
        this.nextBtn = document.getElementById("nextBtn");
        this.results = document.querySelector(".results");
        this.endBtn = document.getElementById("endGameBtn");
        this.correctIcon = '<span><i class="fa-solid fa-check"></i></span>';
        this.incorrectIcon = '<span><i class="fa-solid fa-times"></i></span>';
    }

    // Method to display category options in the dropdown
    showCategoryOption(categoryList) {

        let categoryOption = "";

        for (let category of categoryList) {
            categoryOption += `
                <option value="${category.id}">${category.name}</option>
            `
        }
        this.categorySelect.insertAdjacentHTML("beforeend", categoryOption);

    }
    // Method to display the current question
    showQuetion(question) {

        const options = [question.correct_answer, ...question.incorrect_answers];

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffleArray(options);

        let optionDiv = '';
        for (let option of options) {
            optionDiv += `
                    <div onclick="selectedOption(this)" class="div option d-flex align-items-center justify-content-between">
                        <span>${option}</span>
                    </div>
        `
        }

        this.optionsList.innerHTML = optionDiv;
        const obj = this.decodeHTMLEntities(question.question);
        ui.questionTitle.innerText = obj;

    }
    // Placeholder for showing an alert
    showAlert() {

    }
    // Method to decode HTML entities in text
    decodeHTMLEntities(text) {
        let textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }
    // Method to display the current question index
    showQuestionIndex(questionnumber, allQuestion) {
        let indexSpan = `
        <span class="badge bg-warning ">${questionnumber}/${allQuestion}</span>
        `
        this.questionIndex.innerHTML = indexSpan;
    }
    // Method to show the next button
    showNextBtn() {
        this.nextBtn.classList.add("show")
    }
    // Method to remove the next button
    removeNextBtn() {
        this.nextBtn.classList.remove("show")
    }
    // Method to show the results at the end of the game
    showResults() {
        let resultText = `You got ${quiz.correctAnswer} out of ${quiz.questions.length} questions right`
        this.results.textContent = resultText;
    }

}
