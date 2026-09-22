const fs = require('fs');
const path = './frontend/src/components/VoiceAssistant.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace MATERIAL_KEYWORDS with expanded version
const oldKeywordsTarget = `const MATERIAL_KEYWORDS = [`;
// Find the end of MATERIAL_KEYWORDS which is `  ];`
const blockEnd = `  ];`;

// Let's replace the whole block manually
const replaceStr = `const MATERIAL_KEYWORDS = [
    { id: "copper_cables", basePrice: 440, names: { hi: "तांबे के तार", mr: "तांब्याची तार", en: "Copper Wires", bn: "তামার তার", gu: "તાંબાનો વાયર", kn: "ತಾಮ್ರದ ತಂತಿ", te: "రాగి తీగ", ta: "செம்பு கம்பி" }, keys: ["तांबा", "तांबे", "copper", "wire", "cable", "তামা", "તાંબુ", "ತಾಮ್ರ", "రాగి", "செம்பு"] },
    { id: "pcb_motherboard", basePrice: 183, names: { hi: "सर्किट बोर्ड", mr: "सर्किट बोर्ड", en: "Circuit Boards", bn: "সার্কিট বোর্ড", gu: "સર્કિટ બોર્ડ", kn: "ಸರ್ಕ್ಯೂಟ್ ಬೋರ್ಡ್", te: "సర్క్యూట్ బోర్డ్", ta: "சர்க்யூட் போர்டு" }, keys: ["सर्किट", "मदरबोर्ड", "pcb", "circuit", "সার্কিট", "સર્કિટ", "ಸರ್ಕ್ಯೂಟ್", "సర్క్యూట్", "சர்க்யூட்"] },
    { id: "li_ion_battery", basePrice: 225, names: { hi: "लिथियम बैटरी", mr: "लिथियम बॅटरी", en: "Lithium Batteries", bn: "লিথিয়াম ব্যাটারি", gu: "લિથિયમ બેટરી", kn: "ಲಿಥಿಯಂ ಬ್ಯಾಟರಿ", te: "లిథియం బ్యాటరీ", ta: "லித்தியம் பேட்டரி" }, keys: ["बैटरी", "लिथियम", "battery", "lithium", "ব্যাটারি", "બેટરી", "ಬ್ಯಾಟರಿ", "బ్యాటరీ", "பேட்டரி"] },
    { id: "crt_monitor", basePrice: 85, names: { hi: "सीआरटी मॉनिटर", mr: "सीआरटी मॉनिटर", en: "CRT Monitor", bn: "সিআরটি মনিটর", gu: "સીઆરટી મોનિટર", kn: "ಸಿಆರ್‌ಟಿ ಮಾನಿಟರ್", te: "CRT మానిటర్", ta: "சிஆர்டி மானிட்டர்" }, keys: ["crt", "मॉनिटर", "कांच", "screen", "মনিটর", "મોનિટર", "ಮಾನಿಟರ್", "మానిటర్", "மானிட்டர்"] },
    { id: "aluminium_scrap", basePrice: 153, names: { hi: "एल्युमिनियम", mr: "अॅल्युमिनियम", en: "Aluminium Scrap", bn: "অ্যালুমিনিয়াম", gu: "એલ્યુમિનિયમ", kn: "ಅಲ್ಯೂಮಿನಿಯಂ", te: "అల్యూమినియం", ta: "அலுமினியம்" }, keys: ["एल्युमिनियम", "अल्युमिनियम", "aluminium", "aluminum", "অ্যালুমিনিয়াম", "એલ્યુમિનિયમ", "ಅಲ್ಯೂಮಿನಿಯಂ", "అల్యూమినియం", "அலுமினியம்"] },
    { id: "brass_bronze", basePrice: 310, names: { hi: "पीतल", mr: "पितळ", en: "Brass", bn: "পিতল", gu: "પિત્તળ", kn: "ಹಿತ್ತಾಳೆ", te: "ఇత్తడి", ta: "பித்தளை" }, keys: ["पीतल", "कांसा", "brass", "bronze", "পিতল", "પિત્તળ", "ಹಿತ್ತಾಳೆ", "ఇత్తడి", "பித்தளை"] },
    { id: "electric_motors", basePrice: 195, names: { hi: "इलेक्ट्रिक मोटर", mr: "इलेक्ट्रिक मोटर", en: "Electric Motors", bn: "ইলেকট্রিক মোটর", gu: "ઇલેક્ટ્રિક મોટર", kn: "ಎಲೆಕ್ಟ್ರಿಕ್ ಮೋಟಾರ್", te: "ఎలక్ట్రిక్ మోటార్", ta: "மின் மோட்டார்" }, keys: ["मोटर", "motor", "মোটর", "મોટર", "ಮೋಟಾರ್", "మోటార్", "மோட்டார்"] },
    { id: "pet_rigid_plastic", basePrice: 26, names: { hi: "कठोर प्लास्टिक", mr: "कठीण प्लॅस्टिक", en: "Rigid Plastics", bn: "প্লাস্টিক", gu: "પ્લાસ્ટિક", kn: "ಪ್ಲಾಸ್ಟಿಕ್", te: "ప్లాస్టిక్", ta: "பிளாஸ்டிக்" }, keys: ["प्लास्टिक", "plastic", "pet", "প্লাস্টিক", "પ્લાસ્ટિક", "ಪ್ಲಾಸ್ಟಿಕ್", "ప్లాస్టిక్", "பிளாஸ்டிக்"] },
    { id: "hdpe_plastic", basePrice: 34, names: { hi: "एचडीपीई ड्रम", mr: "एचडीपीई ड्रम", en: "HDPE Drums", bn: "এইচডিপিই", gu: "એચડીપીઇ", kn: "ಎಚ್ಡಿಪಿಇ", te: "HDPE", ta: "HDPE" }, keys: ["hdpe", "ड्रम", "drum", "container", "ড্রাম", "ડ્રમ", "ಡ್ರಮ್", "డ్రమ్", "டிரம்"] },
    { id: "lead_battery_plates", basePrice: 148, names: { hi: "लेड प्लेट", mr: "लेड प्लेट", en: "Lead Plates", bn: "সীসা", gu: "સીસું", kn: "ಸೀಸ", te: "సీసం", ta: "ஈயம்" }, keys: ["लेड", "सीसा", "lead", "ingot", "সীসা", "સીસું", "ಸೀಸ", "సీసం", "ஈயம்"] }
  ];`;

const startIndex = content.indexOf('const MATERIAL_KEYWORDS');
const endIndex = content.indexOf('];', startIndex) + 2;
content = content.substring(0, startIndex) + replaceStr + content.substring(endIndex);

// Update localized string responses
const oldResponse = `if (lang === 'hi') {
        response = \`\${matName} का ताज़ा भाव ₹\${netRate} प्रति किलो है, जिसमें ₹\${eprBonus} EPR बोनस शामिल है।\`;
      } else if (lang === 'mr') {
        response = \`\${matName} चा दर ₹\${netRate} प्रति किलो आहे.\`;
      } else {
        response = \`The current rate for \${matName} is ₹\${netRate} per kilogram.\`;
      }`;
      
const newResponse = `if (lang === 'hi') {
        response = \`\${matName} का ताज़ा भाव ₹\${netRate} प्रति किलो है, जिसमें ₹\${eprBonus} EPR बोनस शामिल है।\`;
      } else if (lang === 'mr') {
        response = \`\${matName} चा दर ₹\${netRate} प्रति किलो आहे.\`;
      } else if (lang === 'bn') {
        response = \`\${matName} এর বর্তমান দাম প্রতি কেজি ₹\${netRate}\`;
      } else if (lang === 'gu') {
        response = \`\${matName} નો આજનો ભાવ ₹\${netRate} પ્રતિ કિલો છે\`;
      } else if (lang === 'kn') {
        response = \`\${matName} ಪ್ರಸ್ತುತ ದರ ಪ್ರತಿ ಕೆಜಿಗೆ ₹\${netRate}\`;
      } else if (lang === 'te') {
        response = \`\${matName} ప్రస్తుత ధర కిలోకు ₹\${netRate}\`;
      } else if (lang === 'ta') {
        response = \`\${matName} தற்போதைய விலை கிலோவிற்கு ₹\${netRate}\`;
      } else {
        response = \`The current rate for \${matName} is ₹\${netRate} per kilogram.\`;
      }`;
content = content.replace(oldResponse, newResponse);

const langCodeMapTarget = `const langCodeMap = {
    hi: 'hi-IN',
    mr: 'mr-IN',
    en: 'en-IN'
  };`;
const langCodeMapReplace = `const langCodeMap = {
    hi: 'hi-IN',
    mr: 'mr-IN',
    en: 'en-IN',
    bn: 'bn-IN',
    gu: 'gu-IN',
    kn: 'kn-IN',
    te: 'te-IN',
    ta: 'ta-IN'
  };`;
content = content.replace(langCodeMapTarget, langCodeMapReplace);

const langBadgeTarget = `{lang === 'hi' ? 'हिंदी' : lang === 'mr' ? 'मराठी' : 'English'}`;
const langBadgeReplace = `{{hi:'हिंदी',mr:'मराठी',en:'English',bn:'বাংলা',gu:'ગુજરાતી',kn:'ಕನ್ನಡ',te:'తెలుగు',ta:'தமிழ்'}[lang] || 'English'}`;
content = content.replace(langBadgeTarget, langBadgeReplace);

fs.writeFileSync(path, content, 'utf8');
console.log("VoiceAssistant.jsx localized successfully.");
