let incorrects=document.querySelectorAll('.false');
let correct = document.querySelector('.right');
for(let i=0; i<incorrects.length;i++) {
incorrects[i].addEventListener('click', function () {
	incorrects[i].style.backgroundColor='red' ;
	correct.style.backgroundColor='green' ;
	document.querySelector('#feedback').innerHTML='InCorrect' ;
});
}
correct.addEventListener('click', function () {
	correct.style.backgroundColor='green' ;
	document.querySelector('#feedback').innerHTML='Correct' ;
})

let submit=document.querySelector('.submit');
let input= document.querySelector('.input');
let feedback2= document.querySelector('.feedback2');
submit.onclick =function() {
	if(input.value.toLowerCase()== 'iron') {
		input.style.backgroundColor='green';
		feedback2.innerHTML= 'Correct';
	}
	else{
		input.style.backgroundColor='red';
		feedback2.innerHTML='InCorrect'
		
	} 
};

