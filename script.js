
const questions = [
    {
        question: "What came first? Chicken or Egg?",
        answers: [
            { text: "Chicken", correct: true},
            { text: "Egg", correct: false},
            { text: "Chicken Jockey!!!", correct: false},
            { text: "I am STEVE!!", correct: false},
        ]
    },

    {
        question: "The color of white is?",
        answers: [
            { text: "Black", correct: false},
            { text: "Yellow", correct: false},
            { text: "White", correct: true},
            { text: "Green", correct: false},
        ]
    },

    {
        question: "Does Nafih have a brain?",
        answers: [
            { text: "No", correct: false},
            { text: "Definatly Not", correct: false},
            { text: "Absolutely Not", correct: true},
            { text: "Ugh? Maybe??", correct: false},
        ]
    },

    {
        question: "Nafih does NOT have a brain",
        answers: [
            { text: "True", correct: false},
            { text: "Definatly True", correct: false},
            { text: "Absolutely True", correct: false},
            { text: "Is this even a question?", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

startQuiz();

function startQuiz() {
    currentQuestionIndex=0;
    score=0;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
        
    });
    nextButton.style.display = "block";
    // cursor.style = "not-allowed"; does not work
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})