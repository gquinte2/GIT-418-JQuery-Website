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
	//prevent default form submission
	e.preventDefault();
	
	// the form inputs
	let fNameInput = document.getElementById("fullName");
	let emailInput = document.getElementById("myEmail");
	let messageInput = document.getElementById("myMessage");
	
	// the error message spans
	let errorSpans = document.querySelectorAll("#storeObjects .message");
	
	// the second modal to confirm if the user wants to add a different user to storage once they already have one saved
	let modal = document.getElementById("modal2");
	
	//clear out previous error messages/styles
	fNameInput.classList.remove("errorInput");
	emailInput.classList.remove("errorInput");
	messageInput.classList.remove("errorInput");
	for(let span of errorSpans){
		span.classList.remove("error");
	}
	
	// boolean for tracking validity of the form
	let isValid = true;
	
	// validate each input in the form
	if(fNameInput.value === ""){
		fNameInput.classList.add("errorInput");
		isValid = false;
	}
	
	if(emailInput.value === ""){
		emailInput.classList.add("errorInput");
		isValid = false;
	}
	if(messageInput.value === ""){
		messageInput.classList.add("errorInput");
		isValid = false;
	}
	
	
	
	// if the form is valid, we can create the object and write to storage/display
	if(isValid){
		// the user object
		let user = {};
		
		// determine what the user's contact preference is, and create the object based on that information
		
			user = {
				fullName: fNameInput.value,
				email: emailInput.value,
				message: messageInput.value
			};
		
		// write the user to local storage
		
		// let's check to make sure that there isn't already a user written to lo
				
				// first, we need to stringify the JSON
				let userString = JSON.stringify(user);
		
				
				// write the new object to storage
				localStorage.setItem("newUser", userString);
				
				// hide the modal
			
				// display the user to the page
				// displayUser();
				
				// reset the form
				fNameInput.value = "";
				emailInput.value = "";
				messageInput.value = "";
			};
			
			// if they click cancel, hide the modal and do nothing with the new object
			
		
	
}


// to display the user to the page
// function displayUser(){
	// check to see if there is a user object in storage (we'll only display an object if one exists in storage)
// 	if(localStorage.getItem("newUser")){
		
// 		// get the paragraph on the page where we'll display output
// 		let outputP = document.getElementById("objectDisplay");
		
// 		// string for building output
// 		let output = "";
		
// 		// get the user from storage
// 		let userString = localStorage.getItem("newUser");
		
// 		// parse the string into JSON
// 		let user = JSON.parse(userString);
		
// 		// determine user contact preference before displaying their information to the screen
// 		if(user.contactPref == "email"){
// 			// build output string with email preference before displaying their information to the screen
// 			output += `<strong>Welcome Back!</strong>
// 			           <br>${user.firstName} ${user.lastName}
// 								 <br>${user.email}`;
// 		}else{
// 			// build output string with phone preference
// 			output += `<strong>Welcome Back!</strong>
// 			           <br>${user.firstName} ${user.lastName}
// 								 <br>${user.phone}`;
// 		}
		
// 		// display object properties to the page
// 		outputP.innerHTML = output;
// 	}
// }



// ---------------------------------------------------------
// EVENT LISTENERS
window.onload = function(){
	// displayUser();
};
document.getElementById("objSubmit").addEventListener("click", createUser);












function getCoffees(){

	let my_endpoint = "https://d8b0c2b1-1961-442a-a8c3-34cbcd5a5c22.mock.pstmn.io/coffeemenu";
	
	let endpoint = `${my_endpoint}`;

	// XMLHttpRequest object
	let xhr = new XMLHttpRequest();

	// add an event listener for the load event on that object, this is where we would handle the data returned from a successful call
	xhr.addEventListener("load", function(data){
		// for a successful response, let's display the lattes
		if(this.status === 200){
			displayCoffees(this.response);
		}else{
			// display an error message if we do not get a 200/success response
			document.getElementById("coffees").innerHTML = "<p>There was an issue with your call to Postman. Check the endopint and try again.</p>";
		}
	});

	// set the expected response type
	xhr.responseType = "json";

	// open a connection to the endpoint of the correct type
	xhr.open("GET", endpoint);

	// send the request to the server
	xhr.send();
	
}

// called after the successful return of JSON data from our mock server in Postman, this will format the returned data correctly/semantically
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

// ---------------------------------------------------------
// Event Handlers
// ---------------------------------------------------------
window.onload = function(){
	getCoffees();
};





	

