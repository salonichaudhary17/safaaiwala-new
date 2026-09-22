const fs = require('fs');

const createRobustSpeak = (langVar) => `
        // Force wake-up for Desktop Chrome bug where voices aren't loaded immediately
        let voices = window.speechSynthesis.getVoices();
        const targetLang = ({ hi: 'hi-IN', mr: 'mr-IN', en: 'en-IN', bn: 'bn-IN', gu: 'gu-IN', kn: 'kn-IN', te: 'te-IN', ta: 'ta-IN' }[${langVar}] || 'en-IN');
        utterance.lang = targetLang;
        
        if (voices.length > 0) {
          // 1. Try to find an exact regional match (e.g., Google हिन्दी)
          let voice = voices.find(v => v.lang.replace('_','-') === targetLang);
          // 2. Try to find a broad language match (e.g., hi)
          if (!voice) voice = voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
          // 3. Fallback to any Google Voice (Desktop Chrome cloud voices usually work better)
          if (!voice && targetLang !== 'en-IN') voice = voices.find(v => v.name.includes('Google') && v.lang.startsWith(targetLang.split('-')[0]));
          
          if (voice) {
            utterance.voice = voice;
          }
        }
`;

function patchFile(file, langVar) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  const target = "utterance.lang = ({ hi: 'hi-IN', mr: 'mr-IN', en: 'en-IN', bn: 'bn-IN', gu: 'gu-IN', kn: 'kn-IN', te: 'te-IN', ta: 'ta-IN' }[" + langVar + "] || 'en-IN');";
  
  if (content.includes(target)) {
    content = content.replace(target, createRobustSpeak(langVar));
    fs.writeFileSync(file, content, 'utf8');
    console.log("Patched TTS in " + file);
  } else {
    console.log("Could not find target in " + file);
  }
}

patchFile('./frontend/src/components/Scanner.jsx', 'lang');
patchFile('./frontend/src/components/SafetyGuide.jsx', 'lang');
