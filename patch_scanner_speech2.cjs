const fs = require('fs');
const path = './frontend/src/components/Scanner.jsx';
let content = fs.readFileSync(path, 'utf8');

// The string to replace
const identifiedStr = `(
      {
        hi: 'पहचाना गया।',
        mr: 'ओळखले गेले.',
        en: 'detected.',
        bn: 'শনাক্ত করা হয়েছে.',
        gu: 'ઓળખાયેલ છે.',
        kn: 'ಪತ್ತೆಯಾಗಿದೆ.',
        te: 'కనుగొనబడింది.',
        ta: 'கண்டறியப்பட்டது.'
      }[lang] || 'detected.'
    )`;

content = content.replace(/speakWarning\(\`\$\{item\.name\} पहचाना गया। \$\{item\.tip\}\`\);/g, 
  "speakWarning(`${item.name} ` + " + identifiedStr + " + ` ${item.tip}`);");

content = content.replace(/speakWarning\(\`\$\{topMatch\.class\} पहचाना गया। \$\{item\.tip\}\`\);/g, 
  "speakWarning(`${topMatch.class} ` + " + identifiedStr + " + ` ${item.tip}`);");

const scanCompleteStr = `(
      {
        hi: 'स्कैन पूरा हुआ',
        mr: 'स्कॅन पूर्ण झाले',
        en: 'Scan complete',
        bn: 'স্ক্যান সম্পূর্ণ',
        gu: 'સ્કેન પૂર્ણ',
        kn: 'ಸ್ಕ್ಯಾನ್ ಪೂರ್ಣಗೊಂಡಿದೆ',
        te: 'స్కాన్ పూర్తయింది',
        ta: 'ஸ்கேன் முடிந்தது'
      }[lang] || 'Scan complete'
    )`;

content = content.replace(/speakWarning\(analysisData\.safetyWarning \|\| analysisData\.disposalTips \|\| ' स्कैन पूरा हुआ'\);/g, 
  "speakWarning(analysisData.safetyWarning || analysisData.disposalTips || " + scanCompleteStr + ");");

// I also noticed:
// speakWarning(t.savedSuccess);
// Wait, is there another t.savedSuccess in Scanner.jsx?
// The user says "When I select the English language and I select the particular material". So this is it!

fs.writeFileSync(path, content, 'utf8');
console.log('Scanner material speech patched successfully');
