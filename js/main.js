'use strict';

let answers = [];
let currentQuestion = 0;
let score = 0;
const questionText = document.querySelector('.quiz__question');
const answersContainer = document.querySelector('.quiz__answers');
const indicatorsContainer = document.querySelector('.quiz__controlls_indicators');
const restartButton = document.getElementById('restart');
const nextButton = document.getElementById('next');
restartButton.addEventListener('click', restart);

function restart() {
	currentQuestion = 0;
	createQuestion(currentQuestion);
	answers = [];
	generateIndicators();
	score = 0;
}
function next() {
	currentQuestion++;
	nextButton.removeEventListener('click', next);
	createQuestion(currentQuestion);
	currentQuestion == quiz.length ? showScores() : 0;
	generateIndicatorsNext();
}
function createQuestion() {
	if (currentQuestion < quiz.length) {
		createQuestionText();
		createButtons();
	}
}

function createQuestionText() {
	questionText.innerHTML = `<span>${currentQuestion + 1}. </span>${quiz[currentQuestion].question}`;
}

function createButtons() {
	let buttons = '';
	const spanLetters = ['a', 'b', 'c', 'd', 'e', 'f'];
	for (let e = 0; e < quiz[currentQuestion].answers.length; e++) {
		buttons += `<button class="quiz__answer" id="answ${e}"><p><span>${spanLetters[e]}. </span>${quiz[currentQuestion].answers[e]}</p></button>`;
	}
	answersContainer.innerHTML = buttons;
	for (let e = 0; e < quiz[currentQuestion].answers.length; e++) {
		document.getElementById(`answ${e}`).addEventListener('click', function () {
			buttonClick(e);
		});
	}
}

function buttonClick(answer) {
	checkAnswer(answer);
	disableButtons();
	displayAnswer();
	nextButton.addEventListener('click', next);
	generateIndicators();
}

function checkAnswer(answer) {
	if (quiz[currentQuestion].correct === answer) {
		saveAnswer(answer, true);
		score++;
		console.log(score);
	} else {
		saveAnswer(answer, false);
	}
}

function saveAnswer(answer, right) {
	answers.push({question: currentQuestion, answer: answer, right: right});
}

function disableButtons() {
	for (let i = 0; i < quiz[currentQuestion].answers.length; i++) {
		document.getElementById(`answ${i}`).outerHTML = document.getElementById(`answ${i}`).outerHTML;
	}
}

function displayAnswer() {
	for (let i = 0; i < quiz[currentQuestion].answers.length; i++) {
		if (i === answers[currentQuestion].answer && answers[currentQuestion].right === true) {
			document.getElementById(`answ${i}`).classList.add('right');
		}
		if (i === answers[currentQuestion].answer && !answers[currentQuestion].right) {
			document.getElementById(`answ${i}`).classList.add('wrong');
			document.getElementById(`answ${quiz[currentQuestion].correct}`).classList.add('right');
		}
	}
}
function generateIndicators() {
	let indicators = '';
	for (let i = 0; i < quiz.length; i++) {
		let insert = '';
		if (answers[i] && answers[i].right) insert = 'right';
		if (answers[i] && !answers[i].right) insert = 'wrong';
		//if (i === currentQuestion + 1) insert = 'actual';
		indicators += `<li class="quiz__controlls_indicator ${insert}" id="indicator${i}"></li>`;
	}
	indicatorsContainer.innerHTML = indicators;
}
function generateIndicatorsNext() {
	let indicators = '';
	for (let i = 0; i < quiz.length; i++) {
		let insert = '';
		if (answers[i] && answers[i].right) insert = 'right';
		if (answers[i] && !answers[i].right) insert = 'wrong';
		if (i === currentQuestion) insert = 'actual';
		indicators += `<li class="quiz__controlls_indicator ${insert}" id="indicator${i}"></li>`;
	}
	indicatorsContainer.innerHTML = indicators;
}
function showScores() {
	if (confirm(`You scored ${score}/${quiz.length} points! Do you want to try again?`)) restart();
}
//TODO: connect to database
//TODO: home page
//TODO: dropdown to select the quiz
