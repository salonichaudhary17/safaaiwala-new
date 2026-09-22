const fs = require('fs');
const path = './frontend/src/components/ReceiptModal.jsx';
let content = fs.readFileSync(path, 'utf8');

const itemizedMap = `{ bn: 'লট বিবরণ', gu: 'લોટ વિગતો', kn: 'ಲಾಟ್ ವಿವರಗಳು', te: 'లాట్ వివరాలు', ta: 'லாட் விவரங்கள்', hi: 'लॉट का विवरण', mr: 'लॉट तपशील', en: 'Itemized Scrap Details' }[lang] || 'Itemized Scrap Details'`;
content = content.replace(/{lang === 'hi' \? 'लॉट का विवरण' : lang === 'mr' \? 'लॉट तपशील' : 'Itemized Scrap Details'}/g, `{${itemizedMap}}`);

content = content.replace(
  /const condText = cond === 'working' \? \(lang === 'hi' \? 'चालू स्थिति' : lang === 'mr' \? 'चालू स्थिती' : 'Working'\) : cond === 'scrap' \? \(lang === 'hi' \? 'टूटा-फूटा' : lang === 'mr' \? 'तुटलेले' : 'Broken Scrap'\) : \(lang === 'hi' \? 'मरम्मत योग्य' : lang === 'mr' \? 'दुरुस्तीयोग्य' : 'Repairable'\);/g,
  `const condMap = { working: {bn:'কাজ করছে',gu:'ચાલુ',kn:'ಕೆಲಸ ಮಾಡುತ್ತಿದೆ',te:'పనిచేస్తోంది',ta:'வேலை செய்கிறது',hi:'चालू स्थिति',mr:'चालू स्थिती',en:'Working'}, scrap: {bn:'ভাঙা',gu:'તૂટેલું',kn:'ತುಂಡಾದ',te:'విరిగిన',ta:'உடைந்த',hi:'टूटा-फूटा',mr:'तुटलेले',en:'Broken Scrap'}, semi: {bn:'আংশিক',gu:'આંશિક',kn:'ಅರೆ-ಹಾನಿಯಾಗಿದೆ',te:'పాక్షికంగా',ta:'பழுது',hi:'मरम्मत योग्य',mr:'दुरुस्तीयोग्य',en:'Repairable'} };
                const condText = cond === 'working' ? condMap.working[lang]||condMap.working.en : cond === 'scrap' ? condMap.scrap[lang]||condMap.scrap.en : condMap.semi[lang]||condMap.semi.en;`
);

content = content.replace(
  /\{transaction\.condition === 'working' \? \(lang === 'hi' \? 'चालू स्थिति' : lang === 'mr' \? 'चालू स्थिती' : 'Working'\) : transaction\.condition === 'scrap' \? \(lang === 'hi' \? 'टूटा-फूटा' : lang === 'mr' \? 'तुटलेले' : 'Broken Scrap'\) : \(lang === 'hi' \? 'मरम्मत योग्य' : lang === 'mr' \? 'दुरुस्तीयोग्य' : 'Repairable'\)\}/g,
  `{(() => {
                    const cond = transaction.condition || 'semi-working';
                    const condMap = { working: {bn:'কাজ করছে',gu:'ચાલુ',kn:'ಕೆಲಸ ಮಾಡುತ್ತಿದೆ',te:'పనిచేస్తోంది',ta:'வேலை செய்கிறது',hi:'चालू स्थिति',mr:'चालू स्थिती',en:'Working'}, scrap: {bn:'ভাঙা',gu:'તૂટેલું',kn:'ತುಂಡಾದ',te:'విరిగిన',ta:'உடைந்த',hi:'टूटा-फूटा',mr:'तुटलेले',en:'Broken Scrap'}, semi: {bn:'আংশিক',gu:'આંશિક',kn:'ಅರೆ-ಹಾನಿಯಾಗಿದೆ',te:'పాక్షికంగా',ta:'பழுது',hi:'मरम्मत योग्य',mr:'दुरुस्तीयोग्य',en:'Repairable'} };
                    return cond === 'working' ? (condMap.working[lang]||'Working') : cond === 'scrap' ? (condMap.scrap[lang]||'Broken') : (condMap.semi[lang]||'Repairable');
                  })()}`
);

fs.writeFileSync(path, content, 'utf8');
console.log("ReceiptModal.jsx localized successfully.");
