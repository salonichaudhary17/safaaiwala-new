const fs = require('fs');
const file = './frontend/src/components/TextToSpeech.jsx';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /utterance\.lang = lang === 'mr' \? 'mr-IN' : lang === 'hi' \? 'hi-IN' : 'en-US';/g,
    "utterance.lang = ({ hi: 'hi-IN', mr: 'mr-IN', en: 'en-US', bn: 'bn-IN', gu: 'gu-IN', kn: 'kn-IN', te: 'te-IN', ta: 'ta-IN' }[lang] || 'en-US');"
  );
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed TextToSpeech.jsx');
}
