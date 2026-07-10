"use strict";

let container = document.querySelector(".contactPage");
let container2 = document.querySelector(".but");

const btnLink = document.createElement("a");
const btn2 = document.createElement("button");
btn2.innerHTML = `<i class="ri-close-line"></i>`;
btn2.id = "btn2";
btnLink.appendChild(btn2);
btnLink.href = "./index.html";
container2.appendChild(btnLink);

const nameInputsdiv = document.createElement("div");
const nameInputsdiv2nd = document.createElement("div");
nameInputsdiv.classList.add("names");
nameInputsdiv2nd.classList.add("names");

const Inputsdiv = document.createElement("div");
Inputsdiv.classList.add("inputsDiv2");

const para = document.createElement("p");
para.innerText = "24/7 We will answer your questions and problems";
container.appendChild(para);

const form = document.createElement("form");
form.action = "#";  // prevent formspree submission for login simulation
form.method = "POST";
form.classList.add("form");

for (let i = 0; i < 5; i++) {
    const inputElement = document.createElement("input");
    inputElement.required = true; 

    if (i == 0) {
        inputElement.placeholder = "First Name";
        inputElement.type = "text";
        inputElement.name = "firstname";
        nameInputsdiv.appendChild(inputElement);
    } else if (i == 1) {
        inputElement.placeholder = "Last Name";
        inputElement.type = "text";
        inputElement.name = "lastname";
        nameInputsdiv.appendChild(inputElement);
    } else if (i == 2) {
        inputElement.placeholder = "Email";
        inputElement.type = "email";
        inputElement.name = "email";
        inputElement.pattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
        inputElement.id = "email";
        nameInputsdiv2nd.appendChild(inputElement);
    } else if (i == 3) {
        inputElement.placeholder = "Password";
        inputElement.name = "password";
        inputElement.type = "password";
        nameInputsdiv2nd.appendChild(inputElement);
    } else if (i == 4) {
        const textarea1 = document.createElement("textarea");
        textarea1.placeholder = "Describe your issue (optional)";
        textarea1.name = "message";
        textarea1.id = "describe";
        textarea1.required = false;
        Inputsdiv.appendChild(textarea1);
    }
}

form.appendChild(nameInputsdiv);
form.appendChild(nameInputsdiv2nd);
form.appendChild(Inputsdiv);
container.appendChild(form);

const btn = document.createElement("button");
btn.innerText = "Submit Queries";
btn.type = "submit";
btn.id = "btn";
form.appendChild(btn);

// On submit, simulate login and redirect
btn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent actual form submission or validation block
    
    alert("Your query has been submitted! We will get back to you soon.");
    
    window.location.href = "./index.html"; 
});
