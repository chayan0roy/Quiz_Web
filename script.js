const frontPage = document.querySelector(".frontPage");
const rulesPage = document.querySelector(".rulesPage");

const questions_page = document.querySelector(".questions_page");
const time_lines = document.querySelector(".time_lines");
const timeCount = document.querySelector(".timer");
const question_part = document.querySelector(".question_part");
const options_part = document.querySelector(".options_part");
const question_counter = document.querySelector(".question_counter");
const next_Btn = document.querySelector(".next_Btn");

const reaultPage = document.querySelector(".reaultPage");
var currect_ans = document.querySelector (".currect_ans");
var wrong_ans = document.querySelector (".wrong_ans");
var score = document.querySelector (".score");

var index = 0;
var right = 0;
var wrong = 0;

let timeValue = 15;
let counter;
let counterLine;
let widthValue = 0;

const ticIcon = '<img class="ticIcon" src="./assets/tic_circle.svg">';
const crossIcon = '<img class="ticIcon" src="./assets/cross_circle.svg">';

function startBtn () {
	frontPage.classList.add("hide");
	rulesPage.classList.remove("hide");
}

function backBtn () {
	frontPage.classList.remove("hide");
	rulesPage.classList.add("hide");
}

function continueBtn () {
	rulesPage.classList.add("hide");
	questions_page.classList.remove("hide");
	showQuestion();
	startTimer(timeValue);
	startTimerLine(0);
	next_Btn.style.display = "none";
}

function startTimer(time) {
	counter = setInterval(timer, 1000);
	function timer () {
		timeCount.textContent = time;
		time--;
		if(time < 9) {
			let addZero = timeCount.textContent;
			timeCount.textContent = 0 + addZero;
		}
		if(time < 0) {
			clearInterval(counter);
			timeCount.textContent = "00";
		}
	}	
}

function startTimerLine (time) {
	const option = options_part.querySelectorAll (".option");
	counterLine = setInterval(timer, 50);
	function timer () {
		time += 1;
		time_lines.style.width = time + "px";
		if(time > 319) {
			clearInterval(counterLine);
			for (let i = 0; i < option.length; i++) {
				if(option[i].innerText == question_list[index].answer) {
					option[i].classList.add("correct");
					option[i].children[1].innerHTML = ticIcon;
				}
			}
			for (let i = 0; i < option.length; i++) {
				option[i].classList.add("dissable");		
			}
			next_Btn.style.display = "block";
		}
	}
}

//Function to show question answer and Counting number
function showQuestion () {
	//Question Showing
	question_part.innerHTML = "<h1>"+"Q "+question_list[index].number+". "+question_list[index].question+"</h1>";

	//Option Showing
	options_part.innerHTML = '<div class="option"><span>'+question_list[index].options[0]+'</span><span></span></div>'
							+'<div class="option"><span>'+question_list[index].options[1]+'</span><span></span></div>'
							+'<div class="option"><span>'+question_list[index].options[2]+'</span><span></span></div>'
							+'<div class="option"><span>'+question_list[index].options[3]+'</span><span></span></div>';

	//Question Counting
	question_counter.innerText = question_list[index].number+" Out Of "+question_list.length; 
	
	//span tag ar moddhe js ar help a onclick="get_ans(this)" set kora
	const option = options_part.querySelectorAll (".option");
	for (let i = 0; i < option.length; i++) {
		option[i].setAttribute("onclick", "get_ans(this)");
	}
}

//span ar get_ans k call kora o value input neoa and check is it correct or not
function get_ans (ans) {
	clearInterval(counter);
	clearInterval(counterLine);
	let get_ans = ans.innerText;
	const option = options_part.querySelectorAll (".option");

	if (get_ans == question_list[index].answer) {
		ans.classList.add("correct");
		right++;
		ans.children[1].innerHTML = ticIcon;
	} else {
		ans.classList.add("incorrect");
		wrong++;
		ans.children[1].innerHTML = crossIcon;

		for (let i = 0; i < option.length; i++) {
			if(option[i].innerText == question_list[index].answer) {
				option[i].classList.add("correct");
				option[i].children[1].innerHTML = ticIcon;
			}
		}
	}
	for (let i = 0; i < option.length; i++) {
		option[i].classList.add("dissable");		
	}
	next_Btn.style.display = "block";
}

function nextBtn () {
	if(index == question_list.length - 1) {
		index = 0;
		questions_page.classList.add("hide");
		reaultPage.classList.remove("hide");
		show_result();
	} else {
		index++;
		showQuestion();
		clearInterval(counter);
		startTimer(timeValue);

		clearInterval(counterLine);
		startTimerLine(widthValue);

		next_Btn.style.display = "none";
	}
}

function show_result () {
	currect_ans.innerText = right+" out of "+question_list.length+" Questions";
	wrong_ans.innerText = wrong+" out of "+question_list.length+" Questions";
	score.innerText = right;

	right = 0;
	wrong = 0;
}

function exitBtn () {
	reaultPage.classList.add("hide");
	frontPage.classList.remove("hide");
}