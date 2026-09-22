const fs = require('fs');
const path = './frontend/src/components/Scanner.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `              speakWarning(t.savedSuccess);
            }}
          />`;

const replaceStr = `              speakWarning(
                { 
                  hi: \`\${recycler.name} को चुना गया\`, 
                  mr: \`\${recycler.name} निवडले\`, 
                  en: \`\${recycler.name} selected\`,
                  bn: \`\${recycler.name} নির্বাচন করা হয়েছে\`,
                  gu: \`\${recycler.name} પસંદ કરેલ છે\`,
                  kn: \`\${recycler.name} ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ\`,
                  te: \`\${recycler.name} ఎంచుకోబడింది\`,
                  ta: \`\${recycler.name} தேர்ந்தெடுக்கப்பட்டது\`
                }[lang] || \`\${recycler.name} selected\`
              );
            }}
          />`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replaceStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Scanner select patched!');
} else {
  console.log('Target string not found in Scanner.jsx');
}
