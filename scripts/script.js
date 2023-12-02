'use strict';

$(document).ready(function(){
    $('.example').square1({
        lazy_load: true});


		$('#resetbtn').on('click', function (e) {
			let $el = $('#infileid');
			$el.wrap('<form>').closest(
				'form').get(0).reset();
			$el.unwrap();
		});
      
});

function createUser(e){
	
	e.preventDefault();
	
	// form inputs
	let fNameInput = document.getElementById("fullName");
	let emailInput = document.getElementById("myEmail");
	let messageInput = document.getElementById("myMessage");
	
	// error spans
	let errorSpans = document.querySelectorAll("#contact .message");
	
	
	
	
	//clear out error messages
	fNameInput.classList.remove("errorInput");
	emailInput.classList.remove("errorInput");
	messageInput.classList.remove("errorInput");

	
	for(let span of errorSpans){
		span.classList.remove("error");
	}
	
	// checking validity of the form
	let isValid = true;
	
	// validating each input in the form
	if(fNameInput.value === ""){
		fNameInput.classList.add("errorInput");
		errorSpans[0].classList.add("error");
		
		isValid = false;
	}
	
	if(emailInput.value === ""){
		emailInput.classList.add("errorInput");
		errorSpans[1].classList.add("error");
		isValid = false;
	}
	if(messageInput.value === ""){
		messageInput.classList.add("errorInput");
		errorSpans[2].classList.add("error");
		isValid = false;
	}
	
	
	if(isValid){
		// the user object
		let user = {};
		
		// determine what the user's contact preference is, and create the object based on that information
		
			user = {
				fullName: fNameInput.value,
				email: emailInput.value,
				message: messageInput.value
			};
		
				// stringify the JSON
				let userString = JSON.stringify(user);
		
				
				// set user to storage
				localStorage.setItem("newUser", userString);
				
				
				// form reset
				fNameInput.value = "";
				emailInput.value = "";
				messageInput.value = "";
			};
	
}

// EVENT LISTENERS
window.onload = function(){
	// displayUser();
};
document.getElementById("objSubmit").addEventListener("click", createUser);

function validateForm() {
	//collect form data in JavaScript variables
	var fullName = document.getElementById("fname").value;
	var jEmail = document.getElementById("jobEmail").value;
	var jPhone = document.getElementById("jobPhone").value;
	var file = document.getElementById("infileid").value;
	var phone_regex = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d*)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?)+)(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
	var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;


	//check for full name
	if (!regName.test(fullName)) {
		alert("Please enter your full name.");
		return false;
	}

	//check for email
	if (jEmail.length < 6) {
		alert("Please enter a valid email");

		return false;
	}

	//check for phone
	if (!phone_regex.test(jPhone)) {
		alert("Please enter a valid phone");
		return false;
	}

	// //check empty file field

	if (file == " ") {
		alert("Please attach your resume");
		return false;
	}

	return alert('Thank you for your interest!');
}




//API function to get array
function getCoffees(){

	//API key
	let my_endpoint = "https://d8b0c2b1-1961-442a-a8c3-34cbcd5a5c22.mock.pstmn.io/coffeemenu";
	
	let endpoint = `${my_endpoint}`;

	// XMLHttpRequest object
	let xhr = new XMLHttpRequest();

	// event listener for when the array loads
	xhr.addEventListener("load", function(data){
		// successfully loaded the array
		if(this.status === 200){
			displayCoffees(this.response);
		}else{
			// 200 error message if array does not load
			document.getElementById("coffees").innerHTML = "<p>There was an issue with your call to Postman. Check the endopint and try again.</p>";
		}
	});

	xhr.responseType = "json";

	xhr.open("GET", endpoint);

	// send the request to the server
	xhr.send();
	
}

// fucntion to create html elements that contain the array in order to display
function displayCoffees(data){
  console.log(data);
  let string = "";
  //iterate through the drinks and display to the screen
  for(let coffee of data){
    string += 
        `<section class="drink" >
						<img src="${coffee.image}" alt="${coffee.alt}">
						<h3 class="bold">${coffee.name}</h3><br>
						<p>
							<br>
							<span class="title">Sizes:</span><br>
							${coffee.sizes}<br>
							<span class="title">Prices:</span><br>
							${coffee.price}
							<br>
							<span class="title">Calories:</span><br>${coffee.calories}<br>
						</p>
					<br>	
					</section>`
					;
  }
  document.getElementById("coffees").innerHTML += string;
}


// Event Handler
window.onload = function(){
	getCoffees();
};





	

