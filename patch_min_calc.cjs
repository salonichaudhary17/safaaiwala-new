const fs = require('fs');
const path = './frontend/src/utils/mineralCalculator.js';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'const cat = (category || "").toLowerCase();',
  'const cat = String(category || "").toLowerCase();'
);

fs.writeFileSync(path, content, 'utf8');
console.log("Patched mineralCalculator.js safely");
