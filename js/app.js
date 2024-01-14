// Create instances of UI, Quiz, Category, and Question classes
const ui = new UI();
const quiz = new Quiz();
const category = new Category();
const question = new Question();

// Event listener for starting the game
ui.startGame.addEventListener("click", () => { startGame() })

// Function to start the game
function startGame() {
    ui.startCard.classList.remove("active");
    ui.gameOptionsCard.classList.add("active");
    ui.startCard.classList.remove("active");
    category.getCategory().then(res => {
        ui.showCategoryOption(res.categoryList.trivia_categories)
    });
}

// Event listener for saving options and starting the game
ui.saveOption.addEventListener("click", () => { saveandStart() });

// Function to save options and start the game
function saveandStart() {
    ui.gameOptionsCard.classList.remove("active");
    ui.questionCard.classList.add("active");
    const defaultAmount = 10;
    const amount = (ui.questionAmount.value < 0 || ui.questionAmount.value > 50) ? defaultAmount : ui.questionAmount.value;
    const categoryId = ui.categorySelect.value == 0 ? "" : ui.categorySelect.value;
    const level = ui.difficultySelect.value == 0 ? "" : ui.difficultySelect.value;

    question.getQuestions(amount, categoryId, level).then(res => {
        quiz.pushQuestions(res.data.results);
        ui.showQuetion(quiz.callQuestion());
        ui.showQuestionIndex(quiz.questionIndex + 1, quiz.questions.length);

    });

    timerLine(30);


}

// Event listener for the next question button
ui.nextBtn.addEventListener("click", () => { nextQuestion() })

// Function to move to the next question
function nextQuestion() {
    if (quiz.questionIndex < quiz.questions.length - 1) {
        quiz.questionIndex++;
        ui.removeNextBtn();
        ui.showQuetion(quiz.callQuestion());
        ui.showQuestionIndex(quiz.questionIndex + 1, quiz.questions.length);
        timerLine(30);
    } else {
        ui.questionCard.classList.remove("active");
        ui.finishGameCard.classList.add("active");
        ui.showResults();
    }
}

// Event listener for ending the game
ui.endBtn.addEventListener("click", () => { window.location.reload() })

// Function to handle the selection of an option
function selectedOption(e) {
    ui.showNextBtn();
    clearInterval(timerCount);
    const selectedOption = e.querySelector("span").innerText;
    const isCorrect = quiz.checkAnswer(selectedOption);

    if (isCorrect) {
        quiz.correctAnswer++;
        e.classList.add("correctAnswer");;
        e.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        e.classList.add("wrongAnswer");;
        e.insertAdjacentHTML("beforeend", ui.incorrectIcon);

    }

    // Disable all options after selecting one
    for (let i = 0; i < ui.optionsList.children.length; i++) {
        ui.optionsList.children[i].classList.add("disabled");
    }
}

// Variable for the timer interval
let timerCount;
// Function to animate the timer line
function timerLine(time) {
    const containerWidth = ui.questionCard.clientWidth;

    timerCount = setInterval(timer, time);
    let width = 0;
    function timer() {
        width += (containerWidth * 0.03) / time;

        if (width > containerWidth) {
            clearInterval(timerCount);
            autoSelect();
            ui.showNextBtn();
        }
        ui.timer.style.width = width + "px"
    }
}

// Function to automatically select the correct option
function autoSelect() {

    for (let i = 0; i < ui.optionsList.children.length; i++) {
        const optionVar = ui.optionsList.children[i].querySelector("span").innerText;
        const isCorrect = quiz.checkAnswer(optionVar);

        if (isCorrect) {
            ui.optionsList.children[i].classList.add("correctAnswer");
            ui.optionsList.children[i].insertAdjacentHTML("beforeend", ui.correctIcon);
        }
        ui.optionsList.children[i].classList.add("disabled");

    }
}
