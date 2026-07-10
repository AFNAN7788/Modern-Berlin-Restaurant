const allDishes = {
  "Main Dish": [
    { name: "Wiener Schnitzel", price: "18 €", img: "./assets/images/schnitzel.jpg" },
    { name: "Bratwurst Plate", price: "14 €", img: "./assets/images/bratwurst.jpg" },
    { name: "Beef Steak", price: "24 €", img: "./assets/images/beef-steak.jpg" },
    { name: "Salmon Fillet", price: "22 €", img: "./assets/images/salmon-fillet.jpg" },
    { name: "Spaghetti Bolognese", price: "13 €", img: "./assets/images/spaghetti-bolognese.jpg" },
    { name: "Penne Arrabiata", price: "12 €", img: "./assets/images/penne-arrabiata.jpg" },
    { name: "Chicken Marsala", price: "17 €", img: "./assets/images/chicken-marsala.jpg" },
    { name: "Lamb Chops", price: "26 €", img: "./assets/images/lamb-chops.jpg" },
    { name: "Mushroom Risotto", price: "15 €", img: "./assets/images/mushroom-risotto.jpg" },
    { name: "Käsespätzle", price: "13 €", img: "./assets/images/kaesespaetzle.jpg" },
    { name: "Rouladen", price: "20 €", img: "./assets/images/rouladen.jpg" },
    { name: "Sauerbraten", price: "19 €", img: "./assets/images/sauerbraten.jpg" },
    { name: "Grilled Chicken", price: "16 €", img: "./assets/images/grilled-chicken.jpg" },
    { name: "Eisbein", price: "18 €", img: "./assets/images/eisbein.jpg" }
  ],
  "Breakfast": [
    { name: "Croissant & Jam", price: "5 €", img: "./assets/images/croissant.jpg" },

    { name: "Eggs Benedict", price: "12 €", img: "./assets/images/eggs-benedict.jpg" },
    { name: "Pancakes & Maple Syrup", price: "10 €", img: "./assets/images/pancakes.jpg" },
    { name: "Avocado Toast", price: "9 €", img: "./assets/images/avocado-toast.jpg" },
    { name: "French Toast", price: "8 €", img: "./assets/images/french-toast.jpg" },
    { name: "Muesli Bowl", price: "7 €", img: "./assets/images/muesli-bowl.jpg" },
    { name: "Smoked Salmon Bagel", price: "11 €", img: "./assets/images/salmon-bagel.jpg" },
    { name: "Omelette", price: "9 €", img: "./assets/images/omelette.jpg" },
    { name: "Bircher Muesli", price: "8 €", img: "./assets/images/bircher-muesli.jpg" },
    { name: "Waffles & Berries", price: "10 €", img: "./assets/images/waffles.jpg" },
    { name: "Continental Breakfast", price: "14 €", img: "./assets/images/continental-breakfast.jpg" },
    { name: "Yogurt Parfait", price: "7 €", img: "./assets/images/yogurt-parfait.jpg" },
    { name: "Full English Breakfast", price: "13 €", img: "./assets/images/full-english.jpg" }
  ],
  "Dessert": [
    { name: "Apple Strudel", price: "8 €", img: "./assets/images/apple-strudel.jpg" },
    { name: "Tiramisu", price: "9 €", img: "./assets/images/tiramisu.jpg" },
    { name: "Gelato", price: "6 €", img: "./assets/images/gelato.jpg" },
    { name: "Black Forest Cake", price: "8 €", img: "./assets/images/black-forest-cake.jpg" },
    { name: "Crème Brûlée", price: "10 €", img: "./assets/images/creme-brulee.jpg" },
    { name: "Panna Cotta", price: "9 €", img: "./assets/images/panna-cotta.jpg" },

    { name: "Chocolate Mousse", price: "7 €", img: "./assets/images/chocolate-mousse.jpg" },
    { name: "Berliner Pfannkuchen", price: "5 €", img: "./assets/images/berliner.jpg" },
    { name: "Sachertorte", price: "9 €", img: "./assets/images/sachertorte.jpg" }
  ],
  "Fastfood": [
    { name: "Currywurst & Fries", price: "8 €", img: "./assets/images/currywurst.jpg" },
    { name: "Classic Cheeseburger", price: "11 €", img: "./assets/images/cheeseburger.jpg" },
    { name: "Margherita Pizza", price: "12 €", img: "./assets/images/margherita-pizza.jpg" },
    { name: "Chicken Nuggets", price: "8 €", img: "./assets/images/chicken-nuggets.jpeg" },
    { name: "Beef Burger", price: "13 €", img: "./assets/images/beef-burger.jpg" },
    { name: "French Fries", price: "5 €", img: "./assets/images/french-fries.jpg" },
    { name: "Döner Kebab", price: "7 €", img: "./assets/images/doner-kebab.jpeg" },
    { name: "Hot Dog", price: "6 €", img: "./assets/images/hot-dog.jpeg" },
    { name: "Fried Chicken Wings", price: "10 €", img: "./assets/images/fried-chicken.jpeg" },
    { name: "Club Sandwich", price: "9 €", img: "./assets/images/club-sandwich.jpeg" },

    { name: "Falafel Wrap", price: "7 €", img: "./assets/images/falafel-wrap.jpg" },
    { name: "Pepperoni Pizza", price: "13 €", img: "./assets/images/pepperoni-pizza.jpg" },
    { name: "Loaded Nachos", price: "9 €", img: "./assets/images/loaded-nachos.jpeg" },
    { name: "Onion Rings", price: "5 €", img: "./assets/images/onion-rings.jpeg" },
    { name: "Garlic Bread", price: "4 €", img: "./assets/images/garlic-bread.jpeg" },
    { name: "BBQ Wings", price: "10 €", img: "./assets/images/bbq-wings.jpeg" },
    { name: "Pulled Pork Burger", price: "14 €", img: "./assets/images/pulled-pork-burger.jpg" },
    { name: "Grilled Panini", price: "8 €", img: "./assets/images/grilled-panini.jpg" },
    { name: "Caesar Wrap", price: "9 €", img: "./assets/images/caesar-wrap.jpg" }
  ]
};

// Determine category from URL
const path = window.location.pathname;
const category = path.includes("main-dish") ? "Main Dish" :
                 path.includes("breakfast") ? "Breakfast" :
                 path.includes("dessert") ? "Dessert" :
                 path.includes("Fastfood") ? "Fastfood" : null;

// Render dishes
const container = document.getElementById("dish-container");

if (category && allDishes[category]) {
  allDishes[category].forEach(dish => {
    const card = document.createElement("div");
    card.classList.add("dish-card");
    card.innerHTML = `
      <img src="${dish.img}" alt="${dish.name}" width="200">
      <h2>${dish.name}</h2>
      <p>${dish.price}</p>
      <button class="add-to-cart">Add to Cart</button>
    `;

    // Handle add to cart button
    card.querySelector("button").addEventListener("click", () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (isLoggedIn !== 'true') {
        localStorage.setItem("clickedDish", JSON.stringify(dish));
        window.location.href = "/login";
      } else {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(dish);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${dish.name} added to cart!`);
        window.location.href = "cart.html";
      }
    });

    container.appendChild(card);
  });
}
