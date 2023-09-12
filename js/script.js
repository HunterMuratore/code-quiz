// Hide the starting section of the page and display the first question of the quiz while starting the timer.
function startQuiz() {
    document.querySelector(".start").style.display = "none";
    document.querySelector("#start-button").style.display = "none";
    document.querySelector("#question-1").style.display = "flex";
    generateAnswers(question_1, answers.question_1_ans)
}

function nextQuestion (start, next, result, ans) {
    ansResult(result)

    if (start !== '#question-5') {
        generateAnswers(document.querySelector(next), ans);
    } 

    document.querySelector('.answer-result').style.display = 'flex';
    document.querySelector(start).style.display = "none";
    document.querySelector(next).style.display = "flex";
}

function ansResult (result) {
    if (result === true) {
        document.querySelector('.answer-result').innerHTML = 'Correct!';
    } else {
        document.querySelector('.answer-result').innerHTML = 'Incorrect';
    }
}

// Take the answers held in the answers object and write them into the buttons for each question
function generateAnswers (question, ans) {
    let count = 0;
    question.querySelectorAll('.answer-button').forEach(element => {
        element.innerText = `${ans[count]}`;
        count++
    });
}

// Object to hold all of the answers to the questions
var answers = {
    question_1_ans: ['1. Is this the Answer?', '2. Or is this the Answer?', '3. Maybe this is the Answer?', '4. Wait I think this might be the Answer?'],
    question_2_ans: ['1. Is this the Answer?', '2. Or is this the Answer?', '3. Maybe this is the Answer?', '4. Wait I think this might be the Answer?'],
    question_3_ans: ['1. Is this the Answer?', '2. Or is this the Answer?', '3. Maybe this is the Answer?', '4. Wait I think this might be the Answer?'],
    question_4_ans: ['1. Is this the Answer?', '2. Or is this the Answer?', '3. Maybe this is the Answer?', '4. Wait I think this might be the Answer?'],
    question_5_ans: ['1. Is this the Answer?', '2. Or is this the Answer?', '3. Maybe this is the Answer?', '4. Wait I think this might be the Answer?'],
}

var question_1 = document.querySelector('#question-1');
var question_2 = document.querySelector('#question-2');
var question_3 = document.querySelector('#question-3');
var question_4 = document.querySelector('#question-4');
var question_5 = document.querySelector('#question-5');
