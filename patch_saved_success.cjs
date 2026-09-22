const fs = require('fs');
const path = './frontend/src/components/Scanner.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/speakWarning\(t\.savedSuccess\);/g, "speakWarning((t.savedSuccess || '').replace(/!/g, '.'));");

fs.writeFileSync(path, content, 'utf8');
console.log('savedSuccess punctuation patched!');
