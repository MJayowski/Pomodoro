var startBool = false;
var oneNumberMin = true;
var reset = 25;
var sec = 59;
var min = 24;
var barNumb = 1499;
var width = 1;
var clockInterval;
var barInterval;


window.onload = function() {
	functionButton("functionButtonStart", 0);
	functionButton("functionButtonStop",1);
	functionButton("functionButtonReset", 2);
	timeButton(25, 1499, 0);
	timeButton(10, 599, 1);
	timeButton(5, 299, 2);
};

window.onkeydown = function(e){
	if(e.which){
		code=e.which;
		if(code == 81 && !startBool){
			if(reset <= 10 ){
				oneNumberMin = false;
			}
			startClock();
		}
		else if(code == 87 && startBool){
			stopClock();
		}
	}
};

function functionButton(name, value){
	var but = document.getElementsByClassName(name)[0];
	but.onclick = function(){
		changeTypeOfWork(value);
	}
}

function changeTypeOfWork(val){
	if(val === 0 && startBool == false){
		if(reset <= 10 ){
			oneNumberMin = false;
		}
		startClock();
	}
	else if(val === 1 && startBool == true){
		stopClock();
	}
	else if(val === 2){
		stopClock();
		width = 1;
		min = reset - 1;
		sec = 59;
		startClock();
	}
}
		
function timeButton(time, bar, value){
	var but = document.getElementsByClassName("timeButton")[value];
	but.onclick = function(){
		barNumb = bar;
		changeTime(time);
	}
}

function changeTime(timeGiven){
	stopClock();
	clc = document.getElementsByClassName("clock")[0];
	width = 1;
	sec = 59;
	min = timeGiven - 1;
	reset = timeGiven;
	if(timeGiven <= 10 ){
		oneNumberMin = false;
	}
	startClock();
}		
		
function clock(){
	var clc = document.getElementsByClassName("clock")[0];
	if(oneNumberMin === false){
		min = "0" + min;
		oneNumberMin = true;
	}
	if(sec < 10 && sec != 0){
		sec = "0" + sec;
	}
	else if(sec === 0 && min != 0){
		sec = 59;
		min--;
		if(min < 10){
			oneNumberMin = false;
		}
	}

    clc.innerHTML = min + " : " + sec;
	document.title = "(" + min + ":" + sec + ") Pomodoro"; 

    if(sec === 0 && min === "0" + 0){
		clc.innerHTML = "00 : 00";
		document.getElementsByClassName("progres")[0].innerHTML = "Done!";
		document.title = "Buzzzzz!"; 
        stopClock();
		var alarm = new Audio("stuff/sound.mp3");
		alarm.play();
		min = reset - 1;
		sec = 59;
		startBool = false;
		width = 1;
	}
	sec--;
}

function startClock(){
	clockInterval = setInterval(function(){
		clock()
	} , 1)
	barInterval = setInterval(function(){
		progressBar();
	} , 1)
	startBool = true;
}
	
function stopClock(){
	clearInterval(clockInterval);
	clearInterval(barInterval);
	startBool = false;
}
		
function Round(n, k){	
	var factor = Math.pow(10, k);
	return Math.round(n*factor)/factor;
}
		
function progressBar() {
	var bar = document.getElementsByClassName("bar")[0]; 
	var prog = document.getElementsByClassName("progres")[0];
	width += (100 / barNumb); 
	bar.style.width = width + '%';
	prog.innerHTML = Round(width, 0) + "%";	
}
