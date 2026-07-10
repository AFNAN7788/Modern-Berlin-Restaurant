const https = require('https');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images');

const images = {
  // Main Dish
  'bratwurst.jpg': 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?w=400&q=80',
  'beef-steak.jpg': 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80',
  'salmon-fillet.jpg': 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&q=80',
  'spaghetti-bolognese.jpg': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
  'penne-arrabiata.jpg': 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80',
  'chicken-marsala.jpg': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80',
  'lamb-chops.jpg': 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=400&q=80',
  'mushroom-risotto.jpg': 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80',
  'kaesespaetzle.jpg': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
  'rouladen.jpg': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80',
  'sauerbraten.jpg': 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80',
  'grilled-chicken.jpg': 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&q=80',
  'eisbein.jpg': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80',
  // Breakfast
  'pretzel.jpg': 'https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=400&q=80',
  'eggs-benedict.jpg': 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80',
  'pancakes.jpg': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
  'avocado-toast.jpg': 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&q=80',
  'french-toast.jpg': 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80',
  'muesli-bowl.jpg': 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&q=80',
  'salmon-bagel.jpg': 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&q=80',
  'omelette.jpg': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80',
  'bircher-muesli.jpg': 'https://images.unsplash.com/photo-1517093728432-a0440f8d45af?w=400&q=80',
  'waffles.jpg': 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&q=80',
  'continental-breakfast.jpg': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80',
  'yogurt-parfait.jpg': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
  'full-english.jpg': 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400&q=80',
  // Dessert
  'tiramisu.jpg': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
  'gelato.jpg': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&q=80',
  'black-forest-cake.jpg': 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80',
  'creme-brulee.jpg': 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&q=80',
  'panna-cotta.jpg': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
  'cheesecake.jpg': 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=400&q=80',
  'chocolate-mousse.jpg': 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400&q=80',
  'berliner.jpg': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80',
  'sachertorte.jpg': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
  // Fast Food
  'cheeseburger.jpg': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
  'french-fries.jpg': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
  'fish-and-chips.jpg': 'https://images.unsplash.com/photo-1588673756288-db0959be3905?w=400&q=80',
  'falafel-wrap.jpg': 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80',
  'pepperoni-pizza.jpg': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80',
  'caesar-wrap.jpg': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80',
  'pulled-pork-burger.jpg': 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&q=80',
  'grilled-panini.jpg': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80',
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  const entries = Object.entries(images);
  let done = 0;
  const total = entries.length;

  // Download 5 at a time
  for (let i = 0; i < entries.length; i += 5) {
    const batch = entries.slice(i, i + 5);
    const promises = batch.map(([name, url]) => {
      const dest = path.join(imgDir, name);
      if (fs.existsSync(dest)) {
        done++;
        console.log(`[${done}/${total}] SKIP (exists): ${name}`);
        return Promise.resolve();
      }
      return download(url, dest)
        .then(() => { done++; console.log(`[${done}/${total}] OK: ${name}`); })
        .catch((err) => { done++; console.log(`[${done}/${total}] FAIL: ${name} - ${err.message}`); });
    });
    await Promise.all(promises);
  }
  console.log('\nAll downloads complete!');
}

main();
