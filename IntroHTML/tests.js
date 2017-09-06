var lis = document.querySelectorAll("li");

for(var i = 0; i < lis.length; i++)
{
	lis[i].addEventListener("mouseover", function(){
		this.classList.add("selected");
	})

	lis[i].addEventListener("mouseout", function(){
		this.classList.remove("selected");
	})

	lis[i].addEventListener("click", function(){
		this.classList.toggle("done");
	})
}

var p1Button = document.querySelector("#p1");
var p2Button = document.getElementById("p2");
var resetButton = document.getElementById("p3");

var numInput = document.querySelector("input");

var p1Display = document.getElementById("p1-display");
var p2Display = document.getElementById("p2-display");
var winningScoreDisplay = document.querySelector("p span");

var p1Score = 0;
var p2Score = 0;

var gameOver = false;
var winningScore = 5;

p1Button.addEventListener("click", function(){
	if (!gameOver)
	{
		p1Score++;
		p1Display.textContent = p1Score;
		checkScore();
	}
})

p2Button.addEventListener("click", function(){
	if (!gameOver)
	{
		p2Score++;
		p2Display.textContent = p2Score;
		checkScore();
	}
})

resetButton.addEventListener("click", function() {
	reset();
})

numInput.addEventListener("change", function(){
	winningScoreDisplay.textContent = this.value;
	winningScore = Number(this.value);
	reset();
})

function checkScore()
{
	if (p1Score === winningScore)
	{
		gameOver = true;
		p1Display.classList.add("winner");
	}
	if (p2Score === winningScore)
	{
		gameOver = true;
		p2Display.classList.add("winner");
	}
}

function reset()
{
	gameOver = false;
	p1Score = 0;
	p2Score = 0;
	p1Display.textContent = p1Score;
	p2Display.textContent = p2Score;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
}