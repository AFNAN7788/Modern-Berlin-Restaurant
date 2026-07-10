const a = document.querySelector('.faq-container');
const h = document.querySelector('.heading');
const j = document.querySelector('.questions');
const b = document.createElement('h1');
b.innerText = "Frequently Asked";
b.classList.add('head');

const hh = document.createElement('span');
hh.innerText = " Questions"; 


hh.classList.add('sp');

b.appendChild(hh);

const c = document.createElement('p');
c.innerText = "Feel free to have any queries.";
c.classList.add('para');
h.appendChild(b);
h.appendChild(c);
a.appendChild(h);
a.appendChild(j);


const qObject = [
{
heading: "What types of dishes do you offer?",
description: "We offer a diverse menu featuring a wide range of Pakistani Desi-Style dishes, including kebabs, biryanis, karahis, curries, tandoori specialties, naans, and more.",
plus: "+",
},

{
heading: "Can I make a reservation?",
description: "Yes, we accept reservations for both small and large groups. You can make a reservation by contacting us directly or using our online reservation system.",
plus: "+",
},
    
{
heading: "Do you offer takeaway or delivery services?",
description: "Yes, we offer both takeaway and delivery services for your convenience. You can place an order for pickup or delivery through our website or by calling our restaurant.",
plus: "+",
},

{
heading: "Can I host events or parties at your restaurant?",
description: "Yes, we offer event hosting and catering services for special occasions, such as birthdays, anniversaries, weddings, and corporate events. Please contact us for more information about our event packages and availability.",
plus: "+",
},


];




qObject.forEach((e) => {

const pg = document.createElement('div');
pg.classList.add('pgg');
const paragraph = document.createElement('p');
paragraph.innerText = e.description;
paragraph.style.display = 'none';
pg.appendChild(paragraph);

const cardcontainer = document.createElement('div');
cardcontainer.classList.add('card-container');

const headingButtonContainer = document.createElement('div');
headingButtonContainer.classList.add('heading-button-container');

const heading = document.createElement('h1');
heading.innerText = e.heading;

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');

const toggleButton = document.createElement('div');
toggleButton.classList.add('toggle');
toggleButton.innerHTML = '<div class="toggle-icon">+</div>';




toggleButton.addEventListener('click', () => {

const toggleIcon = toggleButton.querySelector('.toggle-icon');
if (paragraph.style.display === 'none') {
paragraph.style.display = 'block';
toggleIcon.innerHTML = '-';

} else {
paragraph.style.display = 'none';
toggleIcon.innerHTML = '+';
}
});


buttonContainer.appendChild(toggleButton);
headingButtonContainer.appendChild(heading);
headingButtonContainer.appendChild(buttonContainer);




cardcontainer.appendChild(headingButtonContainer);
cardcontainer.appendChild(pg);

j.appendChild(cardcontainer);
});





