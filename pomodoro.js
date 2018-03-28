var startBool = false;
var intervalsNumber = 1;
var reset = 25;
var sec = 59;
var min = 24;
var barNumb = 1499;
var width = 1;

function start()
{
	createClock();
	createDiv();
	createButton("Start", 0, 1, "#00cc00", "#009900");
	createButton("Stop", 33.33333333333, 2, "#ff0000", "#cc0000");
	createButton("Reset", 66.6666666666666, 3, "#bec0b8", "#a9aba0")
	createTimeButton("Pomodoro", 0, 25, 1499);
	createTimeButton("Long break", 33.33333333333, 10, 599);
	createTimeButton("Short break", 66.6666666666666, 5, 300);
}
		
function createClock()
{
	var div = document.getElementById("clock");
	var min = document.createElement("P")
	min.id = "minutes";
	min.innerHTML = "25 : 00";
	min.style.width = 30 + "%";
	min.style.textAlign = "center";
	min.style.color = "black"
	min.style.textShadow = "3px 3px white";
	min.style.fontFamily = "impact";
	min.style.fontSize = 50 + "px";
	min.style.position = "relative";
	min.style.top = 30 + "px";
	min.style.left = 35 + "%";
	div.appendChild(min);
}
		
function createDiv(name)
{
	var div = document.getElementById("clock");
	var divBut = document.createElement("Div");
	divBut.id = "divBut";
	divBut.style.position = "absolute";
	divBut.style.width = 60 + "%";
	divBut.style.height = 35 + "px";
	divBut.style.top = 60 + "%";
	divBut.style.left = 20 + "%";
	div.appendChild(divBut);
}
	
function createButton(name, left, value, color, colorHover)
{
	var div = document.getElementById("divBut");
	var but = document.createElement("Button");
	but.id = name;
	but.style.position = "absolute";
	but.style.fontSize = 20 + "px";
	but.style.width = 33.33333333333 + "%";
	but.style.height = 30 + "px";
	but.style.top = 100 + "%";
	but.style.left = left + "%";
	but.style.border = "1px solid";
	but.style.background = color;
	but.innerHTML = name;
	but.onmouseover = function()
	{
		but.style.background = colorHover;
		but.style.transitionDuration - "0.4s";
	}
	but.onmouseout = function()
	{
		but.style.background = color;
		but.style.transitionDuration = "0.4s";
	}
	but.onclick = function()
	{
		changeTypeOfWork(value);
	}
	div.appendChild(but);
}
		
function createTimeButton(name, left, value, bar)
{
	var div = document.getElementById("clock");
	var but = document.createElement("Button");
	but.id = name;
	but.style.position = "absolute";
	but.style.fontSize = 30 + "px";
	but.style.background = "#33CC33";
	but.style.border = "1px solid";
	but.style.borderColor = "#248f24";
	but.style.width = 33.33333333333 + "%";
	but.style.height = 50 + "px";
	but.style.bottom = 0 + "px";
	but.style.left = left + "%";
	but.innerHTML = name;
	but.onmouseover = function()
	{
		but.style.background = "#248f24";
		but.style.transitionDuration - "0.4s";
	}
	but.onmouseout = function()
	{
		but.style.background = "#33CC33";
		but.style.transitionDuration = "0.4s";
	}
	but.onclick = function()
	{
		barNumb = bar;
		changeTime(value);
	}
	div.appendChild(but);
}
	
function key(e)
{
	if(e.which)
	{
		code=e.which;
		if(code == 81 && !startBool)
		{
			startClock();
			intervalsNumber += 3;
			startBool = true;
			startCounter();
		}
		else if(code == 87 && startBool)
		{
			stopClock();
			startBool = false;
		}
	}
}
		
function stopClock()
{
	for (var i = 1; i <= intervalsNumber; i++)
	{
		window.clearInterval(i);
	}
	document.title = "Pomodoro"; 
}
		
function changeTime(timeGiven)
{
	stopClock();
	clc = document.getElementById("minutes");
	width = 1;
	
	if(timeGiven < 10) clc.innerHTML = "0" + timeGiven + " :  00";
	else clc.innerHTML = timeGiven + " :  00";
	
	reset = timeGiven;
	sec = 59;
	min = timeGiven - 1;
	intervalsNumber += 3;
	startBool = true;
	startClock();
	startCounter();
}
		
function changeTypeOfWork(val)
{
	if(val == 1 && startBool == false)
	{
		startCounter();
		startClock();
		intervalsNumber += 3;
		startBool = true;
	}
	else if(val == 2 && startBool == true)
	{
		stopClock();
		startBool = false;
	}
	else if(val == 3)
	{
		stopClock();
		clc = document.getElementById("minutes");
		width = 0;
				
		if(reset < 10) clc.innerHTML = "0" + reset + " :  00";
		else clc.innerHTML = reset + " :  00";
			
		min = reset - 1;
		sec = 59;
		intervalsNumber += 3;
		startBool = true;
		startClock();
		startCounter();
	}
}
		
function startClock()
{
	clc = document.getElementById("minutes");
	var timer = setInterval(function(){ 
		if(min >= 10)
		{
			if(sec >= 10)
			{
				clc.innerHTML = min + " : " + sec; 
				document.title= "(" + min + ":" + sec + ") Pomodoro" 
				sec--;
			}
			else if (sec <= 9 && sec >= 0)
			{
				clc.innerHTML = min + " :  0" + sec; 
				document.title = "(" + min + ":0" + sec + ") Pomodoro";  
				sec--;
			}
			else if(min == 10 && sec == -1)
			{
				clc.innerHTML = "0" + min + " : 59";
				document.title = "(" + "0" + min + ":59" + sec + ") Pomodoro";  
				sec = 59;
				min--;
			}
			else
			{
				sec = 59;
				min--;
				clc.innerHTML = min + " : " + sec; 
				document.title = "(" + min + ":" + sec + ") Pomodoro";
				sec--;
			}
		}
		
		else
		{
			if(sec >= 10)
			{
				clc.innerHTML = "0" + min + " : " + sec; 
				document.title = "(" + "0" + min + ":" + sec + ") Pomodoro";  
				sec--;
			}
			else if (sec < 10 && sec > 0)
			{	
				clc.innerHTML = "0" + min + " : 0" + sec;
				document.title = "(" + "0" + min + ":0" + sec + ") Pomodoro";  
				sec--;
			}
			else if (min == 0 && sec == 0)
			{
				if(min == 0 && sec == 0)
				{
					var prog = document.getElementById("progres");
					prog.innerHTML = "Done!";	
					clc.innerHTML = "0" + min + " : 0" + sec; 
					document.title = "Buzzzzz!";
					stopClock();													
					var audio = new Audio('stuff/sound.mp3');
					audio.play();
					startBool = false;
					min = reset;
					sec = 0;
					width = 0;
				}
			}
			else if (min != 0 && sec == 0)
			{
				sec = 59;
				min--;
				clc.innerHTML = "0" + min + " : " + sec; 
				document.title = "(" + "0" + min + ":" + sec + ") Pomodoro";  
				sec--;
			}
		}			
	}, 100);
}
		
function Round(n, k)
{	
	var factor = Math.pow(10, k);
	return Math.round(n*factor)/factor;
}
		
function startCounter() {
	var elem = document.getElementById("myBar"); 
	var prog = document.getElementById("progres");
	var id = setInterval(function() {
		width += (100 / barNumb); 
		elem.style.width = width + '%';
		prog.innerHTML = Round(width, 0) + "%";	
	}, 100);
}