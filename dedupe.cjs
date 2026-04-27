const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/games.json', 'utf8'));
const seen = new Set();
const uniqueData = data.filter(item => {
  if (seen.has(item.id)) {
    console.log('Duplicate:', item.id);
    return false;
  }
  seen.add(item.id);
  return true;
});
fs.writeFileSync('src/data/games.json', JSON.stringify(uniqueData, null, 2));
