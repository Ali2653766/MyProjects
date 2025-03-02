let button1 = document.querySelector("#plus1");
let button2 = document.querySelector("#plus2");
let WhoWon = document.querySelector("#WhoWon");
let score1 = document.querySelector("#score1");
let score2 = document.querySelector("#score2");
let p = document.querySelector("#p");

button1.addEventListener("click", plus1 );
button2.addEventListener("click", plus2 );
WhoWon.addEventListener("click", WhoWon1 );

function plus1() {
    score1.innerHTML = parseInt(score1.innerHTML) + 1;
}

function plus2() {
    score2.innerHTML = parseInt(score2.innerHTML) + 1;
}
function WhoWon1() {
	if(parseInt(score1.innerHTML) > parseInt(score2.innerHTML)) {
		p.innerHTML = "Team1 Won!!!";
		alert("Team1 Won!!!" );	
	}
	else if(parseInt(score2.innerHTML) > parseInt(score1.innerHTML)) {
		p.innerHTML = "Team2 Won!!!";
		alert("Team2 Won!!!" );
	}
	else{
		p.innerHTML = "Draw";
		alert("Draw" );
	} 
} 

