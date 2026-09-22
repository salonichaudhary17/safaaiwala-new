const fs = require('fs');

const files = [
  './frontend/src/components/Scanner.jsx',
  './frontend/src/components/SafetyGuide.jsx',
  './frontend/src/components/VoiceAssistant.jsx',
  './frontend/src/components/PriceSpeaker.tsx',
  './frontend/src/components/AudioAccessibilityPlayer.tsx',
  './frontend/src/components/TextToSpeech.jsx',
  './frontend/src/hooks/useAudioGuidance.js',
  './frontend/src/lib/voice.js'
];

const getLangStr = `const getSpeechLang = (l) => {
  const map = { hi: 'hi-IN', mr: 'mr-IN', en: 'en-IN', bn: 'bn-IN', gu: 'gu-IN', kn: 'kn-IN', te: 'te-IN', ta: 'ta-IN' };
  return map[l] || 'en-IN';
};`;

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // Pattern 1: utterance.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
  if (content.includes("lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN'")) {
    content = content.replace(/lang === 'mr' \? 'mr-IN' : lang === 'hi' \? 'hi-IN' : 'en-IN'/g, 
      "({ hi: 'hi-IN', mr: 'mr-IN', en: 'en-IN', bn: 'bn-IN', gu: 'gu-IN', kn: 'kn-IN', te: 'te-IN', ta: 'ta-IN' }[lang] || 'en-IN')");
    changed = true;
  }
  
  // Pattern 2: lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-US'
  if (content.includes("lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-US'")) {
    content = content.replace(/lang === 'hi' \? 'hi-IN' : lang === 'mr' \? 'mr-IN' : 'en-US'/g, 
      "({ hi: 'hi-IN', mr: 'mr-IN', en: 'en-US', bn: 'bn-IN', gu: 'gu-IN', kn: 'kn-IN', te: 'te-IN', ta: 'ta-IN' }[lang] || 'en-US')");
    changed = true;
  }
  
  // Pattern 3: lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN'
  if (content.includes("lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN'")) {
    content = content.replace(/lang === 'hi' \? 'hi-IN' : lang === 'mr' \? 'mr-IN' : 'en-IN'/g, 
      "({ hi: 'hi-IN', mr: 'mr-IN', en: 'en-IN', bn: 'bn-IN', gu: 'gu-IN', kn: 'kn-IN', te: 'te-IN', ta: 'ta-IN' }[lang] || 'en-IN')");
    changed = true;
  }

  // Check if they use an explicit locale variable: locale === 'hi' ? 'hi-IN' ...
  if (content.includes("locale === 'hi' ? 'hi-IN'")) {
    content = content.replace(/locale === 'hi' \? 'hi-IN' : locale === 'mr' \? 'mr-IN' : 'en-IN'/g,
      "({ hi: 'hi-IN', mr: 'mr-IN', en: 'en-IN', bn: 'bn-IN', gu: 'gu-IN', kn: 'kn-IN', te: 'te-IN', ta: 'ta-IN' }[locale] || 'en-IN')");
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated TTS in ${file}`);
  }
}
