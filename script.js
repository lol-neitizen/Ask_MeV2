const questions = [
    {
        question: "What's the best way to start the day?",
        options: ["Coffee!", "A long nap", "A jog outside"],
        correct: "A jog outside",
        dialogue: "Yay! Fresh air and sunshine are the best!"
    },
    {
        question: "How do you handle a challenge?",
        options: ["Give up immediately", "Ask a friend for help", "Tackle it head-on"],
        correct: "Tackle it head-on",
        dialogue: "That's the spirit! Nothing can stop you now!"
    },
    {
        question: "What's a perfect evening?",
        options: ["A quiet book", "A loud party", "Watching TV"],
        correct: "A quiet book",
        dialogue: "Sounds peaceful and cozy. Just what I like."
    },
    {
        question: "What do you do on a rainy day?",
        options: ["Stay in bed", "Sing in the rain", "Complain about the weather"],
        correct: "Sing in the rain",
        dialogue: "Embrace the moment! Every day is an adventure!"
    }
];

let currentQuestionIndex = 0;
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');
const characterImg = document.getElementById('character-img');
const feedbackEl = document.getElementById('feedback');
const speechBubbleEl = document.getElementById('speech-bubble');
const progressTrackerEl = document.getElementById('progress-tracker');

function updateUI() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;
    characterImg.src = 'images/neutral.png'; // Set to neutral when question is asked
    speechBubbleEl.innerText = "Hmmmm.....";
    feedbackEl.innerText = "";
    answerButtonsEl.innerHTML = "";

    // Update progress
    progressTrackerEl.innerText = `${currentQuestionIndex + 1} / ${questions.length}`;

    // Create buttons for each option
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => checkAnswer(option));
        answerButtonsEl.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const correctOption = questions[currentQuestionIndex].correct;
    const characterDialogue = questions[currentQuestionIndex].dialogue;

    // Remove event listeners from buttons to prevent multiple clicks
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(button => {
        button.removeEventListener('click', checkAnswer);
    });

    if (selectedOption === correctOption) {
        // Correct answer
        feedbackEl.innerText = "Correct!";
        speechBubbleEl.innerText = characterDialogue;
        answerButtonsEl.innerHTML = ""; // Clear buttons
        characterImg.src = 'images/happy.png'; // Set to happy for correct answer
        
        // Advance to the next question after a delay
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                updateUI();
            } else {
                questionEl.innerText = "Game over!";
                progressTrackerEl.innerText = "";
                characterImg.style.display = 'block'; // Ensure character is visible
                characterImg.src = 'images/neutral.png'; // Set to neutral for end screen
                speechBubbleEl.innerText = "Thanks for playing!";
                feedbackEl.innerText = "You did great!";
                
                // Add the Try Again button
                const tryAgainBtn = document.createElement('button');
                tryAgainBtn.innerText = "Try Again?";
                tryAgainBtn.classList.add('answer-btn');
                tryAgainBtn.addEventListener('click', resetGame);
                answerButtonsEl.appendChild(tryAgainBtn);
            }
        }, 2000); // 2-second delay
    } else {
        // Incorrect answer
        feedbackEl.innerText = "Try again!";
        speechBubbleEl.innerText = "Hmm, let's think about that one.";
        characterImg.src = 'images/angry.png'; // Set to angry for incorrect answer
    }
}

// Function to reset the game and loop back to the start
function resetGame() {
    currentQuestionIndex = 0;
    characterImg.style.display = 'block'; // Make the character visible again
    updateUI();
}

// Initial UI load
updateUI();