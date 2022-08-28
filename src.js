let quizContainer = document.getElementById("quiz-container");
let selectedAnswers = {};
let question;
let index;

const generateOptions = () => {
    let options = ``;
    for (let i = 0; i < question.options.length; i++) {
        let option = question.options[i];
        let selected = false;
        if(selectedAnswers[`${question.question}`] == option){
            selected = true;
        }
        options += `<div class="each-answer">
        <input type="radio" name="answer-btn" ${selected ? "checked='true'" : ""} onclick="addAnswer()" value="${option}">
        ${option}
        </div>`;
    }
    return options;
}

const generateJumpBtns = ()=>{
    let btns = ``;
    for(let i = 0; i < questions.length; i++){
        btns += `<button class="jumper-button ${i == index ? "active" : ""}" onclick="${i != index ? `showQuestion(${i})` : ""}">${i + 1}</button>`;
    }
    return btns;
}

const addAnswer = ()=>{
    let currentOptions = document.getElementsByName("answer-btn");
    for(let i = 0; i < currentOptions.length; i++){
        let currentOption = currentOptions[i];
        if(currentOption.checked == true){
            selectedAnswers[`${question.question}`] = currentOption.value;
        }
    }
}

const restartQuiz = ()=>{
    index = 0;
    selectedAnswers = {};
    showQuestion(0);
}

const submitQuiz = ()=>{
    let message = `Are you sure you want to submit?`;
    let answered = Object.keys(selectedAnswers);
    if(answered.length < questions.length){
        message += `\nYou have ${questions.length - answered.length} questions out of ${questions.length} unanswered`;
    }
    let ask = confirm(message);
    let attempted = 0;
    let correct = 0;
    let wrong = 0;
    if(ask){
        for(let i = 0; i < questions.length; i++){
            let question = questions[i];
            if(selectedAnswers[`${question.question}`] != undefined){
                attempted++;
                if(selectedAnswers[`${question.question}`] == question.answer){
                    correct++;
                }else{
                    wrong++;
                }
            }
        }
        quizContainer.innerHTML = `<div class="result-wrapper">
        <h3>Result</h3>
        <div class="result-details">
            <div>
                <div>Attempted</div>
                <div>${attempted}/${questions.length}</div>
            </div>
            <div>
                <div>Correct</div>
                <div>${correct}/${questions.length}</div>
            </div>
            <div>
                <div>Wrong</div>
                <div>${wrong}/${questions.length}</div>
            </div>
        </div>
        <button class="jumper-button" onclick="restartQuiz()">Restart</button>
    </div>`;
    }
}

const showQuestion = (i) => {
    index = i;
    if (questions[index]) {
        question = questions[index];
        let options = generateOptions(index);
        let jumpBtns = generateJumpBtns(index);


        quizContainer.innerHTML = `
            <div class="pointer-container">
                <h3>
                    Question ${index + 1} of ${questions.length}
                </h3>
            </div>
            <div>
                ${question.question}
            </div>
            <div class="answers-container">
                ${options}
            </div>
            <div class="action-btns">
                ${index > 0 ? `<button class="prev-next" onclick="showQuestion(${index - 1})">Previous</button>` : ""}
                ${jumpBtns}
                ${index < questions.length - 1 ? `<button class="prev-next" onclick="showQuestion(${index + 1})">Next</button>` : ""}
                <button class="prev-next" style="background-color : red;" onclick="submitQuiz()">Submit</button>
            </div>`
        ;
    } else {
        alert("Invalid question");
    }
}

showQuestion(0);