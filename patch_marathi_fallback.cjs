const fs = require('fs');

const fixFallback = "          if (!voice && targetLang !== 'en-IN') voice = voices.find(v => v.name.includes('Google') && v.lang.startsWith(targetLang.split('-')[0]));\n          \n          if (!voice && targetLang === 'mr-IN') {\n             voice = voices.find(v => v.lang.startsWith('hi'));\n          }\n          \n          if (voice) {";

function applyFix(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const targetStr = "          if (!voice && targetLang !== 'en-IN') voice = voices.find(v => v.name.includes('Google') && v.lang.startsWith(targetLang.split('-')[0]));\n          \n          if (voice) {";
  
  if (content.includes(targetStr)) {
    content = content.replace(targetStr, fixFallback);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Patched fallback in " + filePath);
  } else {
    console.log("Could not find target string in " + filePath);
  }
}

applyFix('./frontend/src/components/Scanner.jsx');
applyFix('./frontend/src/components/SafetyGuide.jsx');
