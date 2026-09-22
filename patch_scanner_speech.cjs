const fs = require('fs');
const path = './frontend/src/components/Scanner.jsx';
let content = fs.readFileSync(path, 'utf8');

// The speakWarning strings inside Scanner.jsx

// 1. handleSelectRecycler
const oldRecyclerSelect = `speakWarning(
      lang === 'hi' ? \`\${recycler.name} को चुना गया।\` : 
      lang === 'mr' ? \`\${recycler.name} निवडले.\` : 
      \`\${recycler.name} selected.\`
    );`;

const newRecyclerSelect = `speakWarning(
      { 
        hi: \`\${recycler.name} को चुना गया।\`, 
        mr: \`\${recycler.name} निवडले.\`, 
        en: \`\${recycler.name} selected.\`,
        bn: \`\${recycler.name} নির্বাচন করা হয়েছে.\`,
        gu: \`\${recycler.name} પસંદ કરેલ છે.\`,
        kn: \`\${recycler.name} ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ.\`,
        te: \`\${recycler.name} ఎంచుకోబడింది.\`,
        ta: \`\${recycler.name} தேர்ந்தெடுக்கப்பட்டது.\`
      }[lang] || \`\${recycler.name} selected.\`
    );`;
content = content.replace(oldRecyclerSelect, newRecyclerSelect);


// 2. Camera start/stop
const oldCamStart = `speakWarning(lang === 'mr' ? 'कॅमेरा सुरू झाला' : lang === 'hi' ? 'कैमरा चालू हो गया' : 'Camera started');`;
const newCamStart = `speakWarning({ hi: 'कैमरा चालू हो गया', mr: 'कॅमेरा सुरू झाला', en: 'Camera started', bn: 'ক্যামেরা চালু হয়েছে', gu: 'કેમેરા ચાલુ થયો', kn: 'ಕ್ಯಾಮೆರಾ ಪ್ರಾರಂಭವಾಯಿತು', te: 'కెమెరా ప్రారంభించబడింది', ta: 'கேமரா தொடங்கப்பட்டது' }[lang] || 'Camera started');`;
content = content.replace(oldCamStart, newCamStart);


const oldCamStop = `speakWarning(lang === 'mr' ? 'कॅमेरा बंद झाला' : lang === 'hi' ? 'कैमरा बंद हो गया' : 'Camera stopped');`;
const newCamStop = `speakWarning({ hi: 'कैमरा बंद हो गया', mr: 'कॅमेरा बंद झाला', en: 'Camera stopped', bn: 'ক্যামেরা বন্ধ হয়েছে', gu: 'કેમેરા બંધ થયો', kn: 'ಕ್ಯಾಮೆರಾ ನಿಂತಿದೆ', te: 'కెమెరా ఆగిపోయింది', ta: 'கேமரா நிறுத்தப்பட்டது' }[lang] || 'Camera stopped');`;
content = content.replace(oldCamStop, newCamStop);


// 3. Scan logic
const oldScanning = `speakWarning(lang === 'hi' ? 'स्कैनिंग शुरू हो रही है...' : lang === 'mr' ? 'स्कॅनिंग सुरू होत आहे...' : 'Scanning started');`;
const newScanning = `speakWarning({ hi: 'स्कैनिंग शुरू हो रही है...', mr: 'स्कॅनिंग सुरू होत आहे...', en: 'Scanning started', bn: 'স্ক্যানিং শুরু হচ্ছে...', gu: 'સ્કેનિંગ શરૂ થઈ રહ્યું છે...', kn: 'ಸ್ಕ್ಯಾನಿಂಗ್ ಪ್ರಾರಂಭವಾಗುತ್ತಿದೆ...', te: 'స్కానింగ్ ప్రారంభమవుతోంది...', ta: 'ஸ்கேனிங் தொடங்குகிறது...' }[lang] || 'Scanning started');`;
content = content.replace(oldScanning, newScanning);

// 4. Fallback strings
content = content.replace(
  /lang === 'hi' \? 'कोई सामग्री नहीं मिली' : lang === 'mr' \? 'काहीही सापडले नाही' : 'No material detected'/g,
  "({ hi: 'कोई सामग्री नहीं मिली', mr: 'काहीही सापडले नाही', en: 'No material detected', bn: 'কিছু পাওয়া যায়নি', gu: 'કંઈ મળ્યું નથી', kn: 'ಏನೂ ಕಂಡುಬಂದಿಲ್ಲ', te: 'ఏమీ కనుగొనబడలేదు', ta: 'எதுவும் கிடைக்கவில்லை' }[lang] || 'No material detected')"
);

fs.writeFileSync(path, content, 'utf8');
console.log('Scanner speech strings localized successfully');
