// GLOBAL VARIABLES
var highScoreLinkEl = document.querySelector('#high-scores');
var timerEl = document.querySelector('.timer');
var startEl = document.querySelector('.start');
var questionSectionEl = document.querySelector('.question');
var endEl = document.querySelector('#end-quiz');
var answerResultEl = document.querySelector('.answer-result');
var finalScoreEl = document.querySelector('.final-score');
var userInitialsEl = document.querySelector('#user-initials');
var submitEl = document.querySelector('.submit');
var highScoresEl = document.querySelector('.high-scores');
var highScoreListEl = document.querySelector('.high-score-list');
var clearScoresEl = document.querySelector('#clear-scores');

var secondsLeft = 60;
var timeInterval;
var currentQuestionIndex = 0;

// Start the quiz when the user clicks the button by hidding the start section and displaying the question section and starting the timer
function startQuiz(e) {
    e.stopPropagation();
    var el = e.target;
    if (el.tagName === 'BUTTON') {
        this.style.display = 'none';
        startTimer();
        nextQuestion(currentQuestionIndex);
    }
}

// Start the 60 second timer and decreasse by 1 every second. If it ever hits 0 then display a message and take them to the end quiz section.
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
        timerEl.innerText = 'Time: ' + secondsLeft;
    }, 1000);
}

function nextQuestion (index) {
    // Remove the View High Scores link from view
    highScoreLinkEl.innerText = '';

    // Reset the question section part of the HTML so that the next questions can be appended to it
    questionSectionEl.innerHTML = '';

    // Create the p element that will contain the question number
    var questionNum = document.createElement('p');
    questionNum.innerText = `Question #${index + 1}`;
    questionNum.classList.add("question-num");

    // Create the p element that will contain the question
    var questionText = document.createElement('p');
    questionText.innerText = questions[index];
    questionText.classList.add("question-text");

    // Display the number and text for the next question
    questionSectionEl.append(questionNum);
    questionSectionEl.append(questionText);

    // Gather the list of answers for the current question into a variable so that it can be looped through and assigned to buttons
    var questionAnswers = answers[`question_${index + 1}_ans`];
    questionAnswers.forEach(answer => {
        var btn = document.createElement('button');
        btn.classList.add('answer-button')
        btn.innerText = answer;
        if (answer === correctAnswers[index]) {
            btn.dataset.correct = 'true';
        }
        questionSectionEl.append(btn);
    });

    currentQuestionIndex++;
}

// End the quiz and take the user straight to the end-quiz section
function endQuiz() {
    questionSectionEl.style.display = 'none';
    timerEl.innerText = 'Time: ' + secondsLeft;
    finalScoreEl.innerText = secondsLeft;
    clearInterval(timeInterval);
    endEl.style.display = 'flex';
}

// Checks their answer to see if it's correct. If wrong subtract 10 seconds from the timer
function checkAnswer (e) {
    var el = e.target;
    // Make sure the user is clicking a button only
    if (el.tagName === 'BUTTON') {
        // Display if the user chose the correct or incorrect answer
        if (el.dataset.correct) {
            answerResultEl.innerText = 'Correct!';
        } else {
            answerResultEl.innerText = 'Incorrect';
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

        // Make the answer result disappear after 3 seconds
        setTimeout(function () {
            answerResultEl.innerText = '';
        }, 3000);
    }
}

// Returns the object array of the local storage data if there is any, otherwise returns empty array
function getScores() {
    return JSON.parse(localStorage.getItem('scores')) || [];
}

// Make the user inputs their initials then save their score and redirect them to the high score page
function addHighScore(e) {
    e.preventDefault();

    // If the user doesn't provide their initials give them an alert then recall the function
    if (!userInitialsEl.value) {
        alert('Please Enter Your Initials Before Submitting Your Score');
        addHighScore();
    }
    
    // Save the user's score as an object
    var score = {
        initial: userInitialsEl.value,
        score: secondsLeft
    }

    // Retrieve the old scores array from local storage and add the new score to it
    var scores = getScores();
    scores.push(score);

    // Overwrite the local storage array with the one with the new score
    localStorage.setItem('scores', JSON.stringify(scores));
    userInitialsEl.value = '';
    listScores();
}   

// Order all of the scores in local storage and list them from highest to lowest
function listScores() {
    // Hide the end quiz section and display the high score section
    endEl.style.display = 'none';
    answerResultEl.style.display = 'none';
    timerEl.style.display = 'none';
    highScoresEl.style.display = 'flex';

    // foreach key in localstorage 
    var scores = getScores();

    // Reset HTML if there are scores in the local storage
    if (scores.length) {
        highScoreListEl.innerHTML = '';
    } else {
        highScoreListEl.innerHTML = 'No Scores Yet!'
    }

    // Sorts the user's scores from highest to lowest
    scores.sort((a, b) => b.score - a.score);

    // Create a li element for each score in the array and then add the initials and score to that li then append it to the list.
    scores.forEach(score => {
        var li = document.createElement('li');

        li.innerText = `${score.initial} - ${score.score}`;

        highScoreListEl.append(li);
    });
}

// Remove the high score array from local storage and reset the list
function clearScoreList() {
    localStorage.removeItem('scores');

    listScores();
}

// Take the user to the high score section and display the high score list
function showHighScores() {
    startEl.style.display = 'none';
    highScoreLinkEl.style.display = 'none';
    timerEl.style.display = 'none';

    listScores();
}

// EVENT LISTENERS
startEl.addEventListener('click', startQuiz);
questionSectionEl.addEventListener('click', checkAnswer);
submitEl.addEventListener('click', addHighScore);
clearScoresEl.addEventListener('click', clearScoreList);
highScoreLinkEl.addEventListener('click', showHighScores);

// Object to hold all of the answers to the questions
var answers = {
    question_1_ans: ['1. By using the <js> tag', '2. By using the <script> tag with the src attribute pointing to the JavaScript file', '3. By using the <link> tag with the rel attribute set to "javascript"', '4.By using the <a> tag with the href attribute pointing to the JavaScript file'],
    question_2_ans: ['1. <!-- This is a comment -->', '2.  /* This is a comment */', '3. // This is a comment', '4.  \' This is a comment \''],
    question_3_ans: ['1. To loop through a block of code', '2.  To declare a function', '3. To execute code conditionally based on a specified condition', '4. To define an object'],
    question_4_ans: ['1. Styling web pages', '2. Adding interactivity to web pages', '3. Creating web page layouts', '4. Optimizing website performance'],
    question_5_ans: ['1.  ===', '2. ==', '3. =>', '4. !=='],
}

// Array to hold all of the questions
var questions = [
    'How do you link an external JavaScript file to an HTML document?',
    'Which of the following is used to comment out a single line of JavaScript code?',
    'What is the purpose of the if statement in JavaScript?',
    'What is JavaScript primarily used for in web development?',
    'Which operator is used for strict equality (both value and data type must match) in JavaScript?',
];

// Array to hold all of the correct answers
var correctAnswers = [
    '2. By using the <script> tag with the src attribute pointing to the JavaScript file', 
    '3. // This is a comment',
    '3. To execute code conditionally based on a specified condition',
    '2. Adding interactivity to web pages',
    '1.  ==='
];