
const questions = [
    {
        question: "Is this project using JavaScript?",
        answers: [
            { text: "Yes", correct: true},
            { text: "no", correct: false},
            { text: "I dont know", correct: false},
            { text: "Maybe?", correct: false},
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
        question: "Is the Earth round?",
        answers: [
            { text: "No", correct: false},
            { text: "It's a square!", correct: false},
            { text: "Yes", correct: true},
            { text: "Triangle", correct: false},
        ]
    },

    {
        question: "Do laptops need electricity?",
        answers: [
            { text: "No", correct: false},
            { text: "Water", correct: false},
            { text: "Fire", correct: false},
            { text: "Yes they need electricity", correct: true},
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