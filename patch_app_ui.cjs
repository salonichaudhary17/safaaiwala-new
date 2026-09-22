const fs = require('fs');
const path = './frontend/src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Passbook Tab
const passbookTarget = /\{lang === 'hi' \? 'खाता' : lang === 'mr' \? 'खाते' : 'Passbook'\}/g;
const passbookReplace = `{{ hi: 'खाता', mr: 'खाते', en: 'Passbook', bn: 'পাসবুক', gu: 'પાસબુક', kn: 'ಪಾಸ್‌ಬುಕ್', te: 'పాస్‌బుక్', ta: 'பாஸ்புக்' }[lang] || 'Passbook'}`;
content = content.replace(passbookTarget, passbookReplace);

// 2. Logout Button
// Searching for the plain text "Logout" that sits right after onClick={handleLogout}
const logoutRegex = /(onClick=\{handleLogout\}\s*className="[^"]*"\s*>\s*)Logout/g;
const logoutReplace = `$1{{ hi: 'लॉगआउट', mr: 'लॉगआउट', en: 'Logout', bn: 'লগআউট', gu: 'લોગઆઉટ', kn: 'ಲಾಗ್ಔಟ್', te: 'లాగ్అవుట్', ta: 'லாக்அவுட்' }[lang] || 'Logout'}`;
content = content.replace(logoutRegex, logoutReplace);

fs.writeFileSync(path, content, 'utf8');
console.log('App.jsx Passbook and Logout localized successfully!');
