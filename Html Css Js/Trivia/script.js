let corrects = document.querySelectorAll(".correct");
let wrong = document.querySelectorAll(".wrong");
let feedback = document.createElement("p");
feedback.classList.add("feedback");
let texts = document.querySelectorAll(".texts");
let question = document.querySelectorAll(".question");
for (let i = 0 ;i< corrects.length;i++){
	corrects[i].addEventListener("click", function() {
		corrects[i].style.backgroundColor = "green";
		feedback.innerHTML = "Correct!";
		
		let existingFeedback = corrects[i].nextElementSibling;
		if (!existingFeedback || !existingFeedback.classList.contains('feedback')) {
		let feedback = document.createElement("p");
		feedback.classList.add("feedback");
		feedback.innerHTML = "Correct!";
		corrects[i].after(feedback);
		} else {
		existingFeedback.innerHTML = "Correct!";
		}
	})
	
}

for (let i = 0 ;i< wrong.length;i++){
	wrong[i].addEventListener("click", function() {
		wrong[i].style.backgroundColor = "red";
		feedback.innerHTML = "Wrong!";
		let parentQuestion = wrong[i].closest('.section');
		let existingFeedback = wrong[i].nextElementSibling;
		
		if (!existingFeedback || !existingFeedback.classList.contains('feedback')) {
		let feedback = document.createElement("p");
		feedback.classList.add("feedback");
		feedback.innerHTML = "Wrong!";
		wrong[i].after(feedback);
		} else {
		existingFeedback.innerHTML = "Wrong!";
		}
		
	} )
}
function check_text() {
	//TODO: Check the text answer is in the answers
	let answers = ["egypt", "saudia arabia"];
	 for (let i = 0;i< texts.length;i++) 
	 {
	 	if (texts[i].value.trim().toLowerCase()== answers[i]) {
	 		texts[i].style.backgroundColor = "green";
	 	}
	 	else{
	 		texts[i].style.backgroundColor = "red";
	 	} 
	 } 
}