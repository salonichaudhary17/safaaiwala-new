const fs = require('fs');
const path = './frontend/src/components/Scanner.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /onClick=\{\(\) => setWeightKg\(\+\(weightKg \+ 1\)\.toFixed\(1\)\)\}/g,
  "onClick={() => setWeightKg(+(weightKg + 0.1).toFixed(1))}"
);

content = content.replace(
  /onClick=\{\(\) => setWeightKg\(Math\.max\(0\.1, \+\(weightKg - 1\)\.toFixed\(1\)\)\)\}/g,
  "onClick={() => setWeightKg(Math.max(0.1, +(weightKg - 0.1).toFixed(1)))}"
);

fs.writeFileSync(path, content, 'utf8');
console.log("Updated step size to 0.1kg (100g)!");
