// Hide the starting section of the page and display the first question of the quiz while starting the timer.
function startQuiz() {
    document.querySelector(".start").style.display = "none";
    document.querySelector("#start-button").style.display = "none";
    document.querySelector("#question-1").style.display = "flex";
    generateAnswers(document.querySelector('#question-1'), answers.question_1_ans)
    // Start timer
}

// Hides the previous section and populates and displays the question/answers for the next section
function nextQuestion (start, next, result, ans) {
    ansResult(result)

    if (start !== '#question-5') {
        generateAnswers(document.querySelector(next), ans);
    } 

    document.querySelector('.answer-result').style.display = 'flex';
    document.querySelector(start).style.display = "none";
    document.querySelector(next).style.display = "flex";
}

// Checks their answer to see if it's correct. If wrong subtract 10 seconds from the timer
function ansResult (result) {
    if (result === true) {
        document.querySelector('.answer-result').innerHTML = 'Correct!';
    } else {
        document.querySelector('.answer-result').innerHTML = 'Incorrect';
        // decrease timer by 10 seconds
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
