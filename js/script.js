// GLOBAL VARIABLES for index.html
var timer = document.querySelector('.timer');
var start = document.querySelector('.start');
var questionSection = document.querySelector('.question');
var end = document.querySelector('#end-quiz');
var answerResult = document.querySelector('.answer-result');
var finalScore = document.querySelector('.final-score');
var userInitials = document.querySelector('#user-initials');

// GLOBAL VARIABLES for high-score.html
var highScores = document.querySelector('.high-scores');
var highScoreList = document.querySelector('.high-score-list');

var secondsLeft = 60;
var timeInterval;
var currentQuestionIndex = 0;

// Start the quiz when the user clicks the button by hidding the start section and displaying the question section and starting the timer
function startQuiz(e) {
    var el = e.target;
    if (el.tagName === 'BUTTON') {
        this.style.display = 'none';
        startTimer();
        nextQuestion(currentQuestionIndex);
    }
}

// Start the 60 second timer and decrease by 1 every second. If it ever hits 0 then display a message and take them to the end quiz section.
function startTimer () {
    timeInterval = setInterval(function() {
        // Make sure timer never goes below 0 and end quiz when time is out
        if (secondsLeft > 0) {
            secondsLeft--;
        } else {
            clearInterval(timeInterval);
            alert("Out Of Time!");
            endQuiz();
        }

        // Display the time remaining
        timer.innerText = 'Time: ' + secondsLeft;
    }, 1000);
}

function nextQuestion (index) {
    // Reset the question section part of the HTML so that the next questions can be appended to it
    questionSection.innerHTML = '';

    // Create the p element that will contain the question number
    var questionNum = document.createElement('p');
    questionNum.innerText = `Question #${index + 1}`;
    questionNum.classList.add("question-num");

    // Create the p element that will contain the question
    var questionText = document.createElement('p');
    questionText.innerText = questions[index];
    questionText.classList.add("question-text");

    // Display the number and text for the next question
    questionSection.append(questionNum);
    questionSection.append(questionText);

    // Gather the list of answers for the current question into a variable so that it can be looped through and assigned to buttons
    var questionAnswers = answers[`question_${index + 1}_ans`];
    questionAnswers.forEach(answer => {
        var btn = document.createElement('button');
        btn.classList.add('answer-button')
        btn.innerText = answer;
        if (answer === correctAnswers[index]) {
            btn.dataset.correct = 'true';
        }
        questionSection.append(btn);
    });

    currentQuestionIndex++;
}

// End the quiz and take the user straight to the end-quiz section
function endQuiz() {
    questionSection.style.display = 'none';
    timer.innerText = 'Time: ' + secondsLeft;
    finalScore.innerText = secondsLeft;
    clearInterval(timeInterval);
    end.style.display = 'flex';
}

// Checks their answer to see if it's correct. If wrong subtract 10 seconds from the timer
function checkAnswer (e) {
    var el = e.target;
    // Make sure the user is clicking a button only
    if (el.tagName === 'BUTTON') {
        // Display if the user chose the correct or incorrect answer
        if (el.dataset.correct) {
            answerResult.innerText = 'Correct!';
        } else {
            answerResult.innerText = 'Incorrect';
            if (secondsLeft < 10) {
                secondsLeft = 0;
            } else {
                secondsLeft -= 10;
            } 
        }
        
        // Display the next question if there is a next one, otherwise display the end section with the user's score
        if (currentQuestionIndex < questions.length) {
            nextQuestion(currentQuestionIndex);
        } else {
            endQuiz();
        }
    }
}

function getScores() {
    return JSON.parse(localStorage.getItem('scores')) || [];
}

// Make sure the user inputs their initials then save their score and redirect them to the high score page
function addHighScore(e) {
    e.preventDefault();

    if (userInitials.value == false) {
        alert('You must input your initials');
    }

    var score = {
        initial: userInitials.value,
        score: secondsLeft
    }

    var scores = getScores();

    scores.push(score);

    localStorage.setItem('scores', JSON.stringify(scores));

    userInitials.value = '';

    listScores();
}

// Order all of the scores in local storage and list them from highest to lowest
function listScores() {
    // foreach key in localstorage 
    // var userScore = userInitials.value + ' - ' + finalScore;
    var scores = getScores();

    // Reset HTML if there are scores in the local storage
    if (todos.length) {
        todoOutput.innerHTML = '';
    }

    scores.forEach(score => {
        var li = document.createElement('li');

        li.innerHTML = `${score.userInitials} - ${score.secondsLeft}`;

        highScoreList.append(li);
    });
}

// EVENT LISTENERS
start.addEventListener('click', startQuiz);
questionSection.addEventListener('click', checkAnswer);
end.addEventListener('submit', addHighScore);

// Object to hold all of the answers to the questions
var answers = {
    question_1_ans: ['1. Is this the Answer?', '2. Or is this the Answer?', '3. Maybe this is the Answer?', '4. Wait I think this might be the Answer?'],
    question_2_ans: ['1. Is this the Answer?', '2. Or is this the Answer?', '3. Maybe this is the Answer?', '4. Wait I think this might be the Answer?'],
    question_3_ans: ['1. Is this the Answer?', '2. Or is this the Answer?', '3. Maybe this is the Answer?', '4. Wait I think this might be the Answer?'],
    question_4_ans: ['1. Is this the Answer?', '2. Or is this the Answer?', '3. Maybe this is the Answer?', '4. Wait I think this might be the Answer?'],
    question_5_ans: ['1. Is this the Answer?', '2. Or is this the Answer?', '3. Maybe this is the Answer?', '4. Wait I think this might be the Answer?'],
}

// Array to hold all of the questions
var questions = [
    'This is question #1, answer it please.',
    'This is question #2, answer it please.',
    'This is question #3, answer it please.',
    'This is question #4, answer it please.',
    'This is question #5, answer it please.',
];

// Array to hold all of the correct answers
var correctAnswers = [
    '1. Is this the Answer?', 
    '3. Maybe this is the Answer?',
    '4. Wait I think this might be the Answer?',
    '2. Or is this the Answer?',
    '1. Is this the Answer?'
];