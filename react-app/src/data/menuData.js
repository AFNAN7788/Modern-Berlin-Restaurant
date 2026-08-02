// Centralized menu data — Berlin-themed dishes only
// Fixes: hardcoded data scattered across JS files, mixed Pakistani/Desi images

export const categories = [
  {
    id: 'main-dish',
    name: 'Main Dish',
    amount: '(14 dishes)',
    img: '/assets/images/schnitzel.jpg',
    description: 'Classic German main courses',
  },
  {
    id: 'breakfast',
    name: 'Breakfast',
    amount: '(13 breakfast)',
    img: '/assets/images/croissant.jpg',
    description: 'Start your day the Berlin way',
  },
  {
    id: 'dessert',
    name: 'Dessert',
    amount: '(9 dessert)',
    img: '/assets/images/apple-strudel.jpg',
    description: 'Sweet endings to remember',
  },
  {
    id: 'fastfood',
    name: 'Fastfood',
    amount: '(19 items)',
    img: '/assets/images/currywurst.jpg',
    description: 'Quick bites, big flavors',
  },
];

export const dishes = {
  'main-dish': [
    { id: 'md-1', name: 'Wiener Schnitzel', price: 18, img: '/assets/images/schnitzel.jpg', description: 'Golden-fried veal cutlet served with lemon wedge and parsley potatoes.' },
    { id: 'md-2', name: 'Bratwurst Plate', price: 14, img: '/assets/images/bratwurst.jpg', description: 'Grilled bratwurst with sauerkraut and mustard.' },
    { id: 'md-3', name: 'Beef Steak', price: 24, img: '/assets/images/beef-steak.jpg', description: 'Prime beef steak cooked to your liking.' },
    { id: 'md-4', name: 'Salmon Fillet', price: 22, img: '/assets/images/salmon-fillet.jpg', description: 'Pan-seared salmon with dill butter.' },
    { id: 'md-5', name: 'Spaghetti Bolognese', price: 13, img: '/assets/images/spaghetti-bolognese.jpg', description: 'Classic Italian pasta with rich meat sauce.' },
    { id: 'md-6', name: 'Penne Arrabiata', price: 12, img: '/assets/images/penne-arrabiata.jpg', description: 'Penne in a spicy tomato sauce.' },
    { id: 'md-7', name: 'Chicken Marsala', price: 17, img: '/assets/images/chicken-marsala.jpg', description: 'Chicken breast in a Marsala wine sauce.' },
    { id: 'md-8', name: 'Lamb Chops', price: 26, img: '/assets/images/lamb-chops.jpg', description: 'Grilled lamb chops with rosemary.' },
    { id: 'md-9', name: 'Mushroom Risotto', price: 15, img: '/assets/images/mushroom-risotto.jpg', description: 'Creamy risotto with wild mushrooms.' },
    { id: 'md-10', name: 'Käsespätzle', price: 13, img: '/assets/images/kaesespaetzle.jpg', description: 'Swabian egg noodles with melted cheese.' },
    { id: 'md-11', name: 'Rouladen', price: 20, img: '/assets/images/rouladen.jpg', description: 'Beef rolls stuffed with bacon and pickles.' },
    { id: 'md-12', name: 'Sauerbraten', price: 19, img: '/assets/images/sauerbraten.jpg', description: 'Marinated pot roast with gravy.' },
    { id: 'md-13', name: 'Grilled Chicken', price: 16, img: '/assets/images/grilled-chicken.jpg', description: 'Herb-marinated grilled chicken breast.' },
    { id: 'md-14', name: 'Eisbein', price: 18, img: '/assets/images/eisbein.jpg', description: 'Pork knuckle with sauerkraut and peas.' },
  ],
  breakfast: [
    { id: 'bf-1', name: 'Croissant & Jam', price: 5, img: '/assets/images/croissant.jpg', description: 'Buttery croissant with seasonal jam.' },
    { id: 'bf-2', name: 'Eggs Benedict', price: 12, img: '/assets/images/eggs-benedict.jpg', description: 'Poached eggs on English muffins with hollandaise.' },
    { id: 'bf-3', name: 'Pancakes & Maple Syrup', price: 10, img: '/assets/images/pancakes.jpg', description: 'Fluffy pancakes with real maple syrup.' },
    { id: 'bf-4', name: 'Avocado Toast', price: 9, img: '/assets/images/avocado-toast.jpg', description: 'Sourdough toast with smashed avocado.' },
    { id: 'bf-5', name: 'French Toast', price: 8, img: '/assets/images/french-toast.jpg', description: 'Brioche French toast with berries.' },
    { id: 'bf-6', name: 'Muesli Bowl', price: 7, img: '/assets/images/muesli-bowl.jpg', description: 'Swiss-style muesli with fresh fruit.' },
    { id: 'bf-7', name: 'Smoked Salmon Bagel', price: 11, img: '/assets/images/salmon-bagel.jpg', description: 'Bagel with smoked salmon and cream cheese.' },
    { id: 'bf-8', name: 'Omelette', price: 9, img: '/assets/images/omelette.jpg', description: 'Three-egg omelette with your choice of fillings.' },
    { id: 'bf-9', name: 'Bircher Muesli', price: 8, img: '/assets/images/bircher-muesli.jpg', description: 'Overnight oats with apple and nuts.' },
    { id: 'bf-10', name: 'Waffles & Berries', price: 10, img: '/assets/images/waffles.jpg', description: 'Belgian waffles with mixed berries.' },
    { id: 'bf-11', name: 'Continental Breakfast', price: 14, img: '/assets/images/continental-breakfast.jpg', description: 'Assorted breads, cheeses, and cold cuts.' },
    { id: 'bf-12', name: 'Yogurt Parfait', price: 7, img: '/assets/images/yogurt-parfait.jpg', description: 'Greek yogurt with granola and honey.' },
    { id: 'bf-13', name: 'Full English Breakfast', price: 13, img: '/assets/images/full-english.jpg', description: 'Eggs, bacon, sausage, beans, and toast.' },
  ],
  dessert: [
    { id: 'ds-1', name: 'Apple Strudel', price: 8, img: '/assets/images/apple-strudel.jpg', description: 'Flaky pastry with cinnamon-spiced apples.' },
    { id: 'ds-2', name: 'Tiramisu', price: 9, img: '/assets/images/tiramisu.jpg', description: 'Classic Italian coffee-flavored dessert.' },
    { id: 'ds-3', name: 'Gelato', price: 6, img: '/assets/images/gelato.jpg', description: 'Authentic Italian gelato, daily flavors.' },
    { id: 'ds-4', name: 'Black Forest Cake', price: 8, img: '/assets/images/black-forest-cake.jpg', description: 'Chocolate cake with cherries and cream.' },
    { id: 'ds-5', name: 'Crème Brûlée', price: 10, img: '/assets/images/creme-brulee.jpg', description: 'Vanilla custard with caramelized sugar.' },
    { id: 'ds-6', name: 'Panna Cotta', price: 9, img: '/assets/images/panna-cotta.jpg', description: 'Silky Italian cream dessert.' },
    { id: 'ds-7', name: 'Chocolate Mousse', price: 7, img: '/assets/images/chocolate-mousse.jpg', description: 'Rich and airy dark chocolate mousse.' },
    { id: 'ds-8', name: 'Berliner Pfannkuchen', price: 5, img: '/assets/images/berliner.jpg', description: 'Jam-filled Berlin doughnut.' },
    { id: 'ds-9', name: 'Sachertorte', price: 9, img: '/assets/images/sachertorte.jpg', description: 'Viennese chocolate cake with apricot jam.' },
  ],
  fastfood: [
    { id: 'ff-1', name: 'Currywurst & Fries', price: 8, img: '/assets/images/currywurst.jpg', description: 'Berlin\'s iconic sausage with curry ketchup.' },
    { id: 'ff-2', name: 'Classic Cheeseburger', price: 11, img: '/assets/images/cheeseburger.jpg', description: 'Beef patty with cheddar and pickles.' },
    { id: 'ff-3', name: 'Margherita Pizza', price: 12, img: '/assets/images/margherita-pizza.jpg', description: 'Wood-fired with mozzarella and basil.' },
    { id: 'ff-4', name: 'Chicken Nuggets', price: 8, img: '/assets/images/chicken-nuggets.jpeg', description: 'Crispy golden chicken nuggets.' },
    { id: 'ff-5', name: 'Beef Burger', price: 13, img: '/assets/images/beef-burger.jpg', description: 'Juicy Angus beef with caramelized onions.' },
    { id: 'ff-6', name: 'French Fries', price: 5, img: '/assets/images/french-fries.jpg', description: 'Crispy golden fries with sea salt.' },
    { id: 'ff-7', name: 'Döner Kebab', price: 7, img: '/assets/images/doner-kebab.jpeg', description: 'Berlin-style döner with fresh veggies.' },
    { id: 'ff-8', name: 'Hot Dog', price: 6, img: '/assets/images/hot-dog.jpeg', description: 'Grilled sausage in a soft bun.' },
    { id: 'ff-9', name: 'Fried Chicken Wings', price: 10, img: '/assets/images/fried-chicken.jpeg', description: 'Crispy wings with your choice of sauce.' },
    { id: 'ff-10', name: 'Club Sandwich', price: 9, img: '/assets/images/club-sandwich.jpeg', description: 'Triple-decker with turkey and bacon.' },
    { id: 'ff-11', name: 'Falafel Wrap', price: 7, img: '/assets/images/falafel-wrap.jpg', description: 'Crispy falafel with tahini in a wrap.' },
    { id: 'ff-12', name: 'Pepperoni Pizza', price: 13, img: '/assets/images/pepperoni-pizza.jpg', description: 'Loaded with spicy pepperoni.' },
    { id: 'ff-13', name: 'Loaded Nachos', price: 9, img: '/assets/images/loaded-nachos.jpeg', description: 'Nachos with cheese, jalapeños, and salsa.' },
    { id: 'ff-14', name: 'Onion Rings', price: 5, img: '/assets/images/onion-rings.jpeg', description: 'Beer-battered onion rings.' },
    { id: 'ff-15', name: 'Garlic Bread', price: 4, img: '/assets/images/garlic-bread.jpeg', description: 'Toasted bread with garlic butter.' },
    { id: 'ff-16', name: 'BBQ Wings', price: 10, img: '/assets/images/bbq-wings.jpeg', description: 'Sticky BBQ-glazed chicken wings.' },
    { id: 'ff-17', name: 'Pulled Pork Burger', price: 14, img: '/assets/images/pulled-pork-burger.jpg', description: 'Slow-cooked pulled pork with slaw.' },
    { id: 'ff-18', name: 'Grilled Panini', price: 8, img: '/assets/images/grilled-panini.jpg', description: 'Pressed Italian sandwich.' },
    { id: 'ff-19', name: 'Caesar Wrap', price: 9, img: '/assets/images/caesar-wrap.jpg', description: 'Chicken caesar salad in a wrap.' },
  ],
};

export const featuredDishes = [
  {
    id: 'md-1',
    name: 'Wiener Schnitzel',
    description: 'Golden-fried veal cutlet served with lemon wedge and parsley potatoes.',
    price: 18,
    img: '/assets/images/schnitzel.jpg',
    rating: 9.4,
  },
  {
    id: 'ff-3',
    name: 'Margherita Pizza',
    description: 'Wood-fired pizza with San Marzano tomatoes, fresh mozzarella and basil.',
    price: 12,
    img: '/assets/images/margherita-pizza.jpg',
    rating: 9.1,
  },
  {
    id: 'ff-5',
    name: 'Beef Burger',
    description: 'Juicy Angus beef patty with aged cheddar, caramelized onions and brioche bun.',
    price: 13,
    img: '/assets/images/beef-burger.jpg',
    rating: 9.7,
  },
  {
    id: 'ds-1',
    name: 'Apple Strudel',
    description: 'Flaky pastry filled with cinnamon-spiced apples and served with vanilla sauce.',
    price: 9,
    img: '/assets/images/apple-strudel.jpg',
    rating: 9.0,
  },
];

export const services = [
  {
    icon: '/assets/images/fi-rr-salad.png',
    heading: 'CATERING',
    paragraph: 'Delight your guests with our flavors and presentation',
  },
  {
    icon: '/assets/images/fi-rr-time-fast.png',
    heading: 'FAST DELIVERY',
    paragraph: 'We deliver your order promptly to your door',
  },
  {
    icon: '/assets/images/fi-rr-shopping-cart-check.png',
    heading: 'ONLINE ORDERING',
    paragraph: 'Explore menu & order with ease using our Online Ordering',
  },
  {
    icon: '/assets/images/fi-rr-gift.png',
    heading: 'GIFT CARDS',
    paragraph: 'Give the gift of exceptional dining with Foodi Gift Cards',
  },
];

export const faqs = [
  {
    heading: 'What types of dishes do you offer?',
    description: 'We offer a diverse menu featuring classic German and Berlin-style dishes, including schnitzels, bratwurst, currywurst, traditional desserts, and more.',
  },
  {
    heading: 'Can I make a reservation?',
    description: 'Yes, we accept reservations for both small and large groups. You can make a reservation using our online reservation system.',
  },
  {
    heading: 'Do you offer takeaway or delivery services?',
    description: 'Yes, we offer both takeaway and delivery services for your convenience. You can place an order for pickup or delivery through our website.',
  },
  {
    heading: 'Can I host events or parties at your restaurant?',
    description: 'Yes, we offer event hosting and catering services for special occasions, such as birthdays, anniversaries, weddings, and corporate events.',
  },
];