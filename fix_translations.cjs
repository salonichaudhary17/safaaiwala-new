const fs = require('fs');
const path = './frontend/src/i18n/translations.js';
let content = fs.readFileSync(path, 'utf8');

// The file currently has:
//   }
// };
// 
//   bn: {

content = content.replace(/}\n};\n\n  bn: {/g, '},\n  bn: {');
fs.writeFileSync(path, content, 'utf8');
console.log("Fixed syntax error in translations.js");
