var startBool = false;
var reset = 25;
var sec = 59;
var min = 24;
var barNumb = 1499;
var width = 1;
var seconds=25*60*100;
var clockInterval;
var barInterval;

window.onload = function() {
	functionButton(0, "#00cc00", "#009900");
	functionButton(1, "#ff0000", "#cc0000");
	functionButton(2, "#bec0b8", "#a9aba0");
	timeButton(25, 1499, 0);
	timeButton(10, 599, 1);
	timeButton(5, 300, 2);
};

window.onkeydown = function(e){
	if(e.which)
	{
		code=e.which;
		if(code == 81 && !startBool)
		{
			startClock();
		}
		else if(code == 87 && startBool)
		{
			stopClock();
		}
	}
};

function functionButton(value, color, colorHover){
	var but = document.getElementsByClassName("functionButton")[value];
	but.style.background = color;
	but.onmouseover = function(){
		but.style.background = colorHover;
		but.style.transitionDuration - "0.4s";
	}
	but.onmouseout = function(){
		but.style.background = color;
		but.style.transitionDuration = "0.4s";
	}
	but.onclick = function(){
		changeTypeOfWork(value);
	}
}
		
function timeButton(time, bar, value){
	var but = document.getElementsByClassName("timeButton")[value];
	but.onclick = function(){
		barNumb = bar;
		changeTime(time);
	}
}

function startClock(){
	clockInterval = setInterval(function(){
		clock()
	} , 1000)
	clockInterval = setInterval(function(){
		progressBar();
	} , 1000)
	startBool = true;
}
	
		
function stopClock(){
	clearInterval(clockInterval);
	clearInterval(clockInterval);
	startBool = false;
	document.title = "Pomodoro"; 
}
		
function changeTime(timeGiven){
	stopClock();
	clc = document.getElementsByClassName("clock")[0];
	width = 1;
	
	if(timeGiven < 10)
	{		
		clc.innerHTML = "0" + timeGiven + " :  00";
	}
	else 
	{
		clc.innerHTML = timeGiven + " :  00";
	}
		
	reset = timeGiven;
	sec = 59;
	min = timeGiven - 1;
	startClock();
}
		
function changeTypeOfWork(val){
	if(val === 0 && startBool == false){
		startClock();
	}
	else if(val === 1 && startBool == true){
		stopClock();
	}
	else if(val === 2){
		stopClock();
		clc = document.getElementsByClassName("clock")[0];
		width = 0;
				
		if(reset < 10){ 
			clc.innerHTML = "0" + reset + " :  00";
		}
		else{ 
			clc.innerHTML = reset + " :  00";
		}
			
		min = reset - 1;
		sec = 59;
		startClock();
	}
}
		
function clock(){
	
	//działanie zegara
}
		
function Round(n, k){	
	var factor = Math.pow(10, k);
	return Math.round(n*factor)/factor;
}
		
function progressBar() {
	var elem = document.getElementsByClassName("myBar")[0]; 
	var prog = document.getElementsByClassName("progres")[0];
	width += (100 / barNumb); 
	elem.style.width = width + '%';
	prog.innerHTML = Round(width, 0) + "%";	
}