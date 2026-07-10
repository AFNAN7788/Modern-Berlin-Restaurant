const fs = require('fs');
const files = ['Fastfood.html', 'breakfast.html', 'dessert.html', 'main-dish.html', 'cart.html', 'index.html', 'contact.html', 'booking.html', 'login.html', 'signup.html'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace explicit index.html with /
    content = content.replace(/href="\.\/index\.html(#[^"]+)?"/g, 'href="/$1"');
    content = content.replace(/href="index\.html(#[^"]+)?"/g, 'href="/$1"');
    
    // Remove .html from other specific links
    content = content.replace(/href="breakfast\.html"/g, 'href="/breakfast"');
    content = content.replace(/href="Fastfood\.html"/g, 'href="/Fastfood"');
    content = content.replace(/href="dessert\.html"/g, 'href="/dessert"');
    content = content.replace(/href="main-dish\.html"/g, 'href="/main-dish"');
    content = content.replace(/href="cart\.html"/g, 'href="/cart"');
    content = content.replace(/href="booking\.html"/g, 'href="/booking"');
    content = content.replace(/href="contact\.html"/g, 'href="/contact"');
    content = content.replace(/href="login\.html"/g, 'href="/login"');
    content = content.replace(/href="signup\.html"/g, 'href="/signup"');
    content = content.replace(/href="\.\/contact\.html"/g, 'href="/contact"');
    content = content.replace(/href="\.\/booking\.html"/g, 'href="/booking"');

    // Fix empty href="/undefined" (from replacing without hash) back to "/"
    content = content.replace(/href="\/undefined"/g, 'href="/"');

    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
