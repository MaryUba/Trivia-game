
const questions = [
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Lion"],
        answer: "Blue Whale"
    },
    {
        question: "Which continent is also a country?",
        options: ["Australia", "Antarctica", "South-America", "Africa"],
        answer: "Australia"
    },
    {
        question: "Who directed the 1997 classic movie Titanic?",
        options: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Martin Scorsese"],
        answer: "James Cameron"
    },
    {
        question: "Which gas is responsible for the green color of leaves in plants?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Chlorophyll"],
        answer: "Chlorophyll"
    },
    {
        question: "What is the capital of Germany?",
        options: ["Paris", "Rome", "Berlin", "Moscow"],
        answer: "Berlin"
    },
    {
        question: "What is the largest ocean in the world?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Liver", "Brain", " Skin", "Heart"],
        answer: "Liver"
    },
    {
        question: " What is the smallest planet in our solar system?",
        options: ["Venus", "Earth", "Mecury", "Mars"],
        answer: "Mecury"
    },
    {
        question: " What is the currency of Japan?",
        options: ["Yen", "Euro", "Rupee", "Dollar"],
        answer: "Yen"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "NaCl"],
        answer: "H2O"
    },
    {
        question: " In which country is the Great Wall located?",
        options: ["Japan", "China", "India", "Egypt"],
        answer: "China"
    },
    {
        question: " What is the primary gas that makes up the Earth's atmosphere?",
        options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
        answer: "Nitrogen"
    },

];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionElements = [
    document.getElementById("option1"),
    document.getElementById("option2"),
    document.getElementById("option3"),
    document.getElementById("option4")
];
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-button");
const playagainBtn = document.getElementById("play-again");
const progressBar = document.querySelector(".score");
const totalQuestions = questions.length;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleOptions(question) {
    for (let i = question.options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [question.options[i], question.options[j]] = [question.options[j], question.options[i]];
    }
}

// Shuffle the questions
shuffleArray(questions);

// Shuffle the options within each question
questions.forEach(shuffleOptions);


function loadQuestion() {
    const questionData = questions[currentQuestion];
    questionElement.textContent = questionData.question;

for(let i = 0; i < 4; i++) {
    optionElements[i].textContent = questionData.options[i];
    optionElements[i].addEventListener("click", checkAnswer);
  }
}

function checkAnswer(event) {
    const selectedOption = event.target.textContent;
    const correctAnswer = questions[currentQuestion].answer;

    if (selectedOption === correctAnswer) {
        score++; 
    }

    resultElement.textContent = selectedOption === correctAnswer ? "Correct!" : "Incorrect. The correct answer is: " + correctAnswer;
    resultElement.style.color = selectedOption === correctAnswer ? "green" : "red";

    for (let i = 0; i < 4; i++) {
        optionElements[i].removeEventListener("click", checkAnswer);
    }
    

    nextButton.style.display = "block";
}

function updateProgressBar() {
    const currentProgress = `${currentQuestion + 1}/${totalQuestions}`;
    progressBar.textContent = currentProgress;
}

function nextQuestion() {
    currentQuestion++;
    resultElement.textContent = "";
    nextButton.style.display = "none";

    if (currentQuestion < questions.length) {
        loadQuestion();
        updateProgressBar();
    } else{
        questionElement.textContent = "Quiz Complete! Your score is: " + score + " out of " + questions.length;
        document.getElementById("options").style.display = "none";
        playagainBtn.style.display = "block";
    }
}

function resetGame() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    updateProgressBar();

    for (let i = 0; i < 4; i++) {
        optionElements[i].addEventListener("click", checkAnswer);
    }

    resultElement.textContent = "";
    nextButton.style.display = "none";
    document.getElementById("options").style.display = "block";
    playagainBtn.style.display = "none";
}

playagainBtn.addEventListener("click", resetGame);

loadQuestion();
nextButton.addEventListener("click", nextQuestion);
updateProgressBar();

