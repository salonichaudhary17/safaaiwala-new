const fs = require('fs');
const path = './frontend/src/components/Scanner.jsx';
let content = fs.readFileSync(path, 'utf8');

// We have labels like:
// {lang === 'hi' ? '✏️ विवरण बदलें' : lang === 'mr' ? '✏️ तपशील बदला' : '✏️ Edit Details'}
const editLabelMap = `{ bn: '✏️ বিবরণ পরিবর্তন', gu: '✏️ વિગતો બદલો', kn: '✏️ ವಿವರಗಳನ್ನು ಬದಲಾಯಿಸಿ', te: '✏️ వివరాలను సవరించండి', ta: '✏️ விவரங்களை மாற்று', hi: '✏️ विवरण बदलें', mr: '✏️ तपशील बदला', en: '✏️ Edit Details' }[lang] || '✏️ Edit Details'`;
content = content.replace(/{lang === 'hi' \? '✏️ विवरण बदलें' : lang === 'mr' \? '✏️ तपशील बदला' : '✏️ Edit Details'}/g, `{${editLabelMap}}`);

const weightLabelMap = `{ bn: 'প্রকৃত লট ওজন (কেজি)', gu: 'વાસ્તવિક વજન (કિલો)', kn: 'ನಿಜವಾದ ತೂಕ (ಕೆಜಿ)', te: 'అసలు బరువు (కిలోలు)', ta: 'உண்மையான எடை (கிலோ)', hi: 'लॉट का वास्तविक वजन (किग्रा)', mr: 'लॉटचे प्रत्यक्ष वजन (किग्रॅ)', en: 'Actual Lot Weight (KG)' }[lang] || 'Actual Lot Weight (KG)'`;
content = content.replace(/{lang === 'hi' \? 'लॉट का वास्तविक वजन \(किग्रा\)' : lang === 'mr' \? 'लॉटचे प्रत्यक्ष वजन \(किग्रॅ\)' : 'Actual Lot Weight \(KG\)'}/g, `{${weightLabelMap}}`);

const conditionLabelMap = `{ bn: 'অবস্থা', gu: 'સ્થિતિ', kn: 'ಸ್ಥಿತಿ', te: 'పరిస్థితి', ta: 'நிலை', hi: 'सामग्री की स्थिति', mr: 'सामग्रीची स्थिती', en: 'Physical Condition' }[lang] || 'Physical Condition'`;
content = content.replace(/{lang === 'hi' \? 'सामग्री की स्थिति' : lang === 'mr' \? 'सामग्रीची स्थिती' : 'Physical Condition'}/g, `{${conditionLabelMap}}`);

const workingMap = `{ bn: 'কাজ করছে (+20%)', gu: 'ચાલુ સ્થિતિ (+20%)', kn: 'ಕೆಲಸ ಮಾಡುತ್ತಿದೆ (+20%)', te: 'పనిచేస్తోంది (+20%)', ta: 'வேலை செய்கிறது (+20%)', hi: 'चालू स्थिति / अक्षुण्ण (+20% मूल्य)', mr: 'चालू स्थिती / अखंड (+20% मूल्य)', en: 'Working / Functional (+20% value)' }[lang] || 'Working / Functional (+20% value)'`;
content = content.replace(/{lang === 'hi' \? 'चालू स्थिति \/ अक्षुण्ण \(\+20% मूल्य\)' : lang === 'mr' \? 'चालू स्थिती \/ अखंड \(\+20% मूल्य\)' : 'Working \/ Functional \(\+20% value\)'}/g, `{${workingMap}}`);

const semiMap = `{ bn: 'আংশিক খারাপ (মূল দাম)', gu: 'આંશિક ખરાબ (મૂળ દર)', kn: 'ಅರೆ-ಹಾನಿಯಾಗಿದೆ (ಮೂಲ ದರ)', te: 'పాక్షికంగా దెబ్బతిన్నది (బేస్ రేటు)', ta: 'பழுது பார்க்கக்கூடியது (அடிப்படை விலை)', hi: 'आंशिक खराब / मरम्मत योग्य (मूल दर)', mr: 'अंशतः खराब / दुरुस्तीयोग्य (मूळ दर)', en: 'Semi-Damaged / Repairable (Base rate)' }[lang] || 'Semi-Damaged / Repairable (Base rate)'`;
content = content.replace(/{lang === 'hi' \? 'आंशिक खराब \/ मरम्मत योग्य \(मूल दर\)' : lang === 'mr' \? 'अंशतः खराब \/ दुरुस्तीयोग्य \(मूळ दर\)' : 'Semi-Damaged \/ Repairable \(Base rate\)'}/g, `{${semiMap}}`);

const scrapMap = `{ bn: 'ভাঙা (-15%)', gu: 'તૂટેલું (-15%)', kn: 'ತುಂಡಾದ (-15%)', te: 'విరిగిన (-15%)', ta: 'உடைந்த (-15%)', hi: 'केवल कबाड़ / टूटा-फूटा (-15% मूल्य)', mr: 'फक्त भंगार / तुटलेले (-15% मूल्य)', en: 'Scrap Only / Broken (-15% value)' }[lang] || 'Scrap Only / Broken (-15% value)'`;
content = content.replace(/{lang === 'hi' \? 'केवल कबाड़ \/ टूटा-फूटा \(-15% मूल्य\)' : lang === 'mr' \? 'फक्त भंगार \/ तुटलेले \(-15% मूल्य\)' : 'Scrap Only \/ Broken \(-15% value\)'}/g, `{${scrapMap}}`);

const ageLabelMap = `{ bn: 'ব্যবহারের বয়স', gu: 'ઉંમર', kn: 'ವಯಸ್ಸು', te: 'వాడిన కాలం', ta: 'பயன்படுத்திய காலம்', hi: 'कितना पुराना है', mr: 'किती जुने आहे', en: 'Item Age / Usage' }[lang] || 'Item Age / Usage'`;
content = content.replace(/{lang === 'hi' \? 'कितना पुराना है' : lang === 'mr' \? 'किती जुने आहे' : 'Item Age \/ Usage'}/g, `{${ageLabelMap}}`);

// The age buttons use a labels object:
content = content.replace(
  `'<2': { en: '< 2 Years', hi: '2 वर्ष से कम', mr: '2 वर्षांपेक्षा कमी' },`,
  `'<2': { en: '< 2 Years', hi: '2 वर्ष से कम', mr: '2 वर्षांपेक्षा कमी', bn: '< ২ বছর', gu: '< ૨ વર્ષ', kn: '< ೨ ವರ್ಷ', te: '< 2 సంవత్సరాలు', ta: '< 2 ஆண்டுகள்' },`
);
content = content.replace(
  `'2-5': { en: '2 - 5 Years', hi: '2 से 5 वर्ष', mr: '2 ते 5 वर्षे' },`,
  `'2-5': { en: '2 - 5 Years', hi: '2 से 5 वर्ष', mr: '2 ते 5 वर्षे', bn: '২ - ৫ বছর', gu: '૨ - ૫ વર્ષ', kn: '೨ - ೫ ವರ್ಷ', te: '2 - 5 సంవత్సరాలు', ta: '2 - 5 ஆண்டுகள்' },`
);
content = content.replace(
  `'>5': { en: '> 5 Years', hi: '5 वर्ष से अधिक', mr: '5 वर्षांपेक्षा जास्त' }`,
  `'>5': { en: '> 5 Years', hi: '5 वर्ष से अधिक', mr: '5 वर्षांपेक्षा जास्त', bn: '> ৫ বছর', gu: '> ૫ વર્ષ', kn: '> ೫ ವರ್ಷ', te: '> 5 సంవత్సరాలు', ta: '> 5 ஆண்டுகள்' }`
);

fs.writeFileSync(path, content, 'utf8');
console.log("Scanner.jsx localized successfully.");
