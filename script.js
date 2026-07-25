function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">✓</span>
    <span class="toast-message">${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-out');
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 2500);
}

//cards
const data = [
  {
    name: "Main Dish",
    amount: "(14 dishes)",
    imgFile: "./assets/images/schnitzel.jpg",
  },
  {
    name: "Breakfast",
    amount: "(14 breakfast)",
    imgFile: "./assets/images/croissant.jpg",
  },
  {
    name: "Dessert",
    amount: "(10 dessert)",
    imgFile: "./assets/images/apple-strudel.jpg",
  },
  {
    name: "Fastfood",
    amount: "(20 items)",
    imgFile: "./assets/images/currywurst.jpg",
  },
];

const boxData = document.querySelector(".card-container");

if (boxData) {
  data.forEach((e) => {
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("card");

  // 🆕 Add this:
  itemContainer.addEventListener("click", () => {
    if (e.name === "Main Dish") {
      window.location.href = "main-dish.html";
    } else if (e.name === "Breakfast") {
      window.location.href = "breakfast.html";
    } else if (e.name === "Dessert") {
      window.location.href = "dessert.html";
    }
     else if (e.name === "Fastfood") {
      window.location.href = "Fastfood.html";
    }
  });

  let menu = document.createElement("h2");
  menu.innerText = e.name;
  let size = document.createElement("p");
  size.innerText = e.amount;
  let image = document.createElement("img");
  image.src = e.imgFile;
  image.loading = "lazy";
  itemContainer.appendChild(size);
  itemContainer.appendChild(menu);
  itemContainer.appendChild(image);
  boxData.appendChild(itemContainer);
  });
}

//slider
const carocelData = [
  {
    _id: "60d5ec49f8a3c7001c8c4f1a",
    dishname: "Wiener Schnitzel",
    description:
      "Golden-fried veal cutlet served with lemon wedge and parsley potatoes.",
    price: "18 €",
    imgFile: "./assets/images/schnitzel.jpg",
    rating: "9.4",
    ratingimg: "./assets/images/fi-sr-star.png",
    borderimg: "./assets/images/right-border.png",
    heartimg: "./assets/images/filledheart.png",
  },
  {
    _id: "60d5ec49f8a3c7001c8c4f1b",
    dishname: "Margherita Pizza",
    description:
      "Wood-fired pizza with San Marzano tomatoes, fresh mozzarella and basil.",
    price: "14 €",
    imgFile: "./assets/images/margherita-pizza.jpg",
    rating: "9.1",
    ratingimg: "./assets/images/fi-sr-star.png",
    borderimg: "./assets/images/right-border.png",
    heartimg: "./assets/images/fi-br-heart.png",
  },
  {
    _id: "60d5ec49f8a3c7001c8c4f1c",
    dishname: "Classic Beef Burger",
    description:
      "Juicy Angus beef patty with aged cheddar, caramelized onions and brioche bun.",
    price: "16 €",
    imgFile: "./assets/images/beef-burger.jpg",
    rating: "9.7",
    ratingimg: "./assets/images/fi-sr-star.png",
    borderimg: "./assets/images/right-border.png",
    heartimg: "./assets/images/fi-br-heart.png",
  },
  {
    _id: "60d5ec49f8a3c7001c8c4f1d",
    dishname: "Apple Strudel",
    description:
      "Flaky pastry filled with cinnamon-spiced apples and served with vanilla sauce.",
    price: "9 €",
    imgFile: "./assets/images/apple-strudel.jpg",
    rating: "9.0",
    ratingimg: "./assets/images/fi-sr-star.png",
    borderimg: "./assets/images/right-border.png",
    heartimg: "./assets/images/fi-br-heart.png",
  },
];
const container = document.querySelector(".carocel");
if (container) {
  carocelData.forEach((c) => {
    let itemContainer = document.createElement("div");
  itemContainer.classList.add("caro");

  let dish = document.createElement("h2");
  dish.innerText = c.dishname;

  let description = document.createElement("p");
  description.innerText = c.description;

  let pricediv = document.createElement("div");
  pricediv.classList.add("pricediv");

  let price = document.createElement("h2");
  price.innerText = c.price;

  let rating = document.createElement("h5");
  rating.innerText = c.rating;

  let textcaro = document.createElement("div");
  textcaro.classList.add("textcaro");
  textcaro.appendChild(dish);
  textcaro.appendChild(description);

  pricediv.appendChild(price);
  let images = document.createElement("div");
  images.classList.add("images");
  let img = document.createElement("img");
  img.classList.add("image");
  img.src = c.imgFile;
  img.loading = "lazy";
  let heart = document.createElement("img");
  heart.classList.add("heart");
  heart.src = c.heartimg;
  heart.loading = "lazy";
  let border = document.createElement("img");
  border.classList.add("border");
  border.src = c.borderimg;
  border.loading = "lazy";
  images.appendChild(img);
  images.appendChild(border);
  images.appendChild(heart);

  let ratingimg = document.createElement("img");
  ratingimg.classList.add("ratingimage");
  ratingimg.src = c.ratingimg;
  ratingimg.loading = "lazy";

  let ratingtext = document.createElement("div");
  ratingtext.classList.add("ratingtext");
  ratingtext.appendChild(ratingimg);
  ratingtext.appendChild(rating);

  itemContainer.appendChild(images);
  itemContainer.appendChild(textcaro);
  itemContainer.appendChild(pricediv);
  itemContainer.appendChild(ratingtext);

  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Add to Cart';
  addToCartButton.classList.add('add-to-cart-btn'); // Add a class for styling
  addToCartButton.addEventListener('click', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const dish = { name: c.dishname, price: c.price, img: c.imgFile };

    if (isLoggedIn !== 'true') {
      localStorage.setItem("clickedDish", JSON.stringify(dish));
      window.location.href = "login.html";
    } else {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(dish);
      localStorage.setItem("cart", JSON.stringify(cart));
      showToast(`${c.dishname} added to cart!`);
      if (typeof updateCartBadge === 'function') {
        updateCartBadge();
      }
    }
  });
  itemContainer.appendChild(addToCartButton);
    container.appendChild(itemContainer);
  });
  
  let currentIndex = 0;
const items = document.querySelectorAll(".caro");
const itemsToShow = 3;
function showSlide(index) {
  items.forEach((items) => {
    items.style.display = "none";
  });

  for (let i = index; i < index + itemsToShow; i++) {
    if (items[i]) {
      items[i].style.display = "block";
    }
  }
}
function moveToNextSlide() {
  currentIndex += itemsToShow;
  if (currentIndex >= items.length) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
}

function moveToPrevSlide() {
  currentIndex -= itemsToShow;
  if (currentIndex < 0) {
    currentIndex = items.length - 3;
  }
  showSlide(currentIndex);
}

const leftButton = document.querySelector("#previous");
const rightButton = document.querySelector("#next");

  leftButton.addEventListener("click", moveToPrevSlide);
  rightButton.addEventListener("click", moveToNextSlide);
  showSlide(currentIndex);
}
//lists
const footerdata = [
  {
    logo: "./assets/images/logonew.png",
    heading: "Savor the artistry where every dish is a culinary masterpiece",
    icon1: "./assets/icons/facebook.png",
    icon2: "./assets/icons/instagram.svg",
    icon3: "./assets/icons/twitter.png",
    icon4: "./assets/icons/youtube.png",
    copy: "Copyright © 2023 Dscode | All rights reserved",
},
  {
    heading: "Useful links",
    link1: "About us",
    link2: "Events",
    link3: "Blogs",
    link4: "FAQ",
  },
  {
    heading: "Main Menu",
    list1: "Home",
    list2: "Offers",
    list3: "Menus",
    list4: "Reservation",
  },
  {
    heading: "Contact Us",
    c1: "contact@modernberlinrestaurant.com",
    c2: "",
    c3: "",
    c4: "",
  },
];

const footer = document.querySelector(".footer");
const lists = document.createElement("li");
const mainList = document.createElement("div");
const allLists = document.createElement("div");
const secList=document.createElement("div");
footerdata.forEach((data) => {
  if (data.logo) {
    const list1 = document.createElement("div");
    list1.classList.add("list1");
    const logoText = document.createElement("h2");
    logoText.classList.add("logo-text");
    logoText.innerText = "Modern Berlin Restaurant";
    list1.appendChild(logoText);
    const heading = document.createElement("p");
    heading.innerText = data.heading;
    const texticon=document.createElement("div");
    texticon.classList.add("texticon");
    texticon.appendChild(heading);
    footer.appendChild(list1);
    const icons = document.createElement("div");
    icons.classList.add("icons");
    for (let i = 1; i <= 4; i++) {
      const iconLinks = document.createElement("a");
      const icon = document.createElement("img");
      icon.src = data[`icon${i}`];
      icon.loading = "lazy";
      icons.appendChild(icon);
      iconLinks.appendChild(icon);
      icons.appendChild(iconLinks);
      texticon.appendChild(icons);
      list1.appendChild(texticon);
      if (i === 1) {
        icon.id = "fb";
        iconLinks.href = "https://www.facebook.com";
        iconLinks.target = "_blank";
      } else if (i === 2) {
        icon.id = "ig";
        iconLinks.href = "https://www.instagram.com/hassantahir688/";
        iconLinks.target = "_blank";
      } else if (i === 3) {
        icon.id = "tw";
        iconLinks.href = "https://www.twitter.com";
        iconLinks.target = "_blank";
      } else if (i === 4) {
        icon.id = "yt";
        iconLinks.href = "https://www.youtube.com/@unitedproductions8062";
        iconLinks.target = "_blank";
      }
  }
  if (data.copy) {
    const para = document.createElement("p");
    para.innerText = data.copy;
    icons.appendChild(para);
    texticon.appendChild(icons);
    list1.appendChild(texticon);
  }
  }
 else if (data.link1) {
    for (let j = 0; j < 1; j++) {
      const heading = document.createElement("h5");
      heading.innerText = data.heading;
      mainList.appendChild(heading);
      allLists.appendChild(mainList);
      heading.id = "links_Heading";
    }
    for (let k = 1; k < 5; k++) {
      const lists = document.createElement("li");
      const links = document.createElement("a");
      links.innerText = data[`link${k}`];

      // Useful links destinations
      if (k === 1) {
        // About us -> story & services section
        links.href = "/#service";
      } else if (k === 2) {
        // Events -> offers / carousel section
        links.href = "/#offer";
      } else if (k === 3) {
        // Blogs -> menus / popular section
        links.href = "/#menus";
      } else if (k === 4) {
        // FAQ separate page
        links.href = "/FAQ 2/index";
      }

      lists.appendChild(links);
      mainList.appendChild(lists);
      allLists.appendChild(mainList);
    }
    footer.appendChild(allLists);
  }else if (data.list1) {
    for (let j = 0; j < 1; j++) {
      const heading = document.createElement("h5");
      heading.innerText = data.heading;
      secList.appendChild(heading);
      allLists.appendChild(secList);
    }
    for (let k = 1; k < 5; k++) {
      const lists = document.createElement("li");
      const links = document.createElement("a");
      links.innerText = data[`list${k}`];

      if (k === 1) {
        links.href = "/#home";
      } else if (k === 2) {
        links.href = "/#offer";
      } else if (k === 3) {
        links.href = "/#menus";
      } else if (k === 4) {
        links.href = "/booking";
      }

      lists.appendChild(links);
      secList.appendChild(lists);
      allLists.appendChild(secList);
      secList.id="seclist";
    }
    footer.appendChild(allLists);
  }
   else {
    const lastlist=document.createElement("div");
    const heading = document.createElement("h5");
    heading.innerText = data.heading;
    heading.id = "links_Heading";
    lastlist.appendChild(heading);
    allLists.appendChild(lastlist);
    const ul = document.createElement("ul");
    const lists = document.createElement("li");
    const links = document.createElement("a");
    links.innerText = data.c1;
    links.href = "mailto:example@example.com";
    lastlist.appendChild(links);
    // Only add phone list item if not empty
    if (data.c2 && data.c2.trim() !== "") {
      lists.innerText = data.c2;
      lastlist.appendChild(lists);
    }
    allLists.appendChild(lastlist);
    footer.appendChild(allLists);
    allLists.id = "lists";
    lists.id='allLinks';
    lastlist.id='last';
  }
  mainList.id = "mainlist";
});
//navbar and GDPR consent

function initNavActiveLinks() {
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

const GDPR_CONSENT_KEY = "gdprConsent";

function getGdprConsent() {
  try {
    return localStorage.getItem(GDPR_CONSENT_KEY);
  } catch {
    return null;
  }
}

function setGdprConsent(value) {
  try {
    localStorage.setItem(GDPR_CONSENT_KEY, value);
  } catch {
    // ignore storage errors
  }
}

function initGdprBanner() {
  const banner = document.getElementById("cookie-consent");
  if (!banner) return;

  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");

  const existingConsent = getGdprConsent();
  if (existingConsent) {
    banner.classList.remove("cookie-consent-banner--visible");
    return;
  }

  banner.classList.add("cookie-consent-banner--visible");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      setGdprConsent("accepted");
      banner.classList.remove("cookie-consent-banner--visible");
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      setGdprConsent("rejected");
      banner.classList.remove("cookie-consent-banner--visible");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initNavActiveLinks();
  initGdprBanner();

  // Make "Explore" buttons useful: go to menus section on home page
  const exploreButtons = document.querySelectorAll(".btn-3");
  exploreButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // If we're already on index, smooth scroll; otherwise navigate there
      if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/" ) {
        const target = document.querySelector("#menus");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.location.href = "/#menus";
      }
    });
  });
});
