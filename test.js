const questionsJSON = '[{"question" : "Какая арифметическая операция приводит к ошибке в javascript?","answers" : ["Деление на ноль.", "Умножение числа на строку.", "Корень из отрицательного числа.", "Никакая из вышеперечисленных."],"rightAnswer": 4},{"question" : "Что делает оператор **?","answers" : ["Возводит в степень.", "Умножает число само на себя.","Нет такого оператора."],"rightAnswer": 1},{"question" : "Есть ли разница между вызовами i++ и ++i?","answers" : ["Разница в значении, которое возвращает такой вызов.", "Разница в значении i после вызова.", "Нет никакой разницы."],"rightAnswer": 1},{"question" : "Какой оператор из этих выполняет не только математические операции?","answers" : ["*", "/", "+", "-",">>>"],"rightAnswer": 3},{"question" : "Какое из этих слов не имеет специального использования в JavaScript, никак не упомянуто в стандарте?","answers" : ["this", "instanceof", "constructor", "parent","new"],"rightAnswer": 4}]'
const questions = JSON.parse(questionsJSON);
let questionNum = 0;
let userAnswers = [];

function startButtonClick() {
    if (document.querySelector(".nameInput").value != "") {
        document.querySelector(".title").innerHTML = "Опрос проходит: " + document.querySelector(".nameInput").value;
        showNextQusetion("Следующий", "nextButtonClick()");
    }
}

function nextButtonClick() {
    if (questionNum == (questions.length - 1)) {
        try {
            saveUserAnswer()
            showNextQusetion("Завершить тест", "finishButtonClick()");
        }
        catch {
            selectAnswerMessageShow();
        }
    }
    else if (questionNum != questions.length) {
        try {
            saveUserAnswer()
            showNextQusetion("Следующий", "nextButtonClick()");
        }
        catch {
            selectAnswerMessageShow();
        }
    }
}

function finishButtonClick() {
    try {
        saveUserAnswer();
        document.querySelector(".main").remove();
        document.querySelector(".form").insertAdjacentHTML('beforeend', '<div class="main"></div>');
        for (let resultQuestion = 0; resultQuestion < questions.length; resultQuestion++) {
            document.querySelector(".main").insertAdjacentHTML('beforeend', '<p class="resultQuestion resultQuestion' + resultQuestion + '">' + questions[resultQuestion].question + '</p>')
            for (let resultAnswer = 0; resultAnswer < questions[resultQuestion].answers.length; resultAnswer++) {
                if (resultAnswer == (questions[resultQuestion].rightAnswer - 1)) {
                    showResultAnswer(resultQuestion, resultAnswer, "rightAnswer");
                }
                else if (resultAnswer == (userAnswers[resultQuestion] - 1)) {
                    showResultAnswer(resultQuestion, resultAnswer, "wrongAnswer");
                }
                else {
                    showResultAnswer(resultQuestion, resultAnswer);
                }
            }
        }
    }
    catch {
        selectAnswerMessageShow();
    }
}

function showNextQusetion(buttonName, onClickEvent) {
    document.querySelector(".main").remove();
    document.querySelector(".form").insertAdjacentHTML('beforeend', '<div class="main"><div class="questionName"><p>' + questions[questionNum].question + '</p><p class="questionCounter">' + (questionNum + 1) + '/' + questions.length + '</p></div><button class="nextBtn" onclick="' + onClickEvent + '">' + buttonName + '</button></div>')
    for (let answerNum = 0; answerNum < questions[questionNum].answers.length; answerNum++) {
        document.querySelector(".nextBtn").insertAdjacentHTML('beforebegin', '<p><input type="radio" onchange="selectAnswerMessageHide()" name="quizAnswer" class="radioAnswers" id="' + (answerNum + 1) + '"><label for="' + (answerNum + 1) + '">' + questions[questionNum].answers[answerNum] + '</label></input></p>');
    }
    questionNum++;
}

function saveUserAnswer() {
    const userAnswer = document.querySelector(".radioAnswers:checked").id;
    userAnswers.push(userAnswer);
}

function showResultAnswer(resultQuestion, resultAnswer, resultAnswerClass) {
    document.querySelector(".resultQuestion" + resultQuestion).insertAdjacentHTML('beforeend', '<p class="resultAnswer"><span class="' + resultAnswerClass + '">' + (resultAnswer + 1) + '. ' + questions[resultQuestion].answers[resultAnswer] + '</span></p>')
}

function selectAnswerMessageShow() {
    if (document.querySelector(".selectAnswerMessage") == null) {
        document.querySelector(".questionName").insertAdjacentHTML('beforebegin', '<div class="selectAnswerMessage">Выберите ответ</div>');
    }
}

function selectAnswerMessageHide() {
    if (document.querySelector(".selectAnswerMessage") != null) {
        document.querySelector(".selectAnswerMessage").remove();
    }
}