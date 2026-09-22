const fs = require('fs');
const path = './frontend/src/components/SafetyGuide.jsx';
let content = fs.readFileSync(path, 'utf8');

// The Safety guidelines have 3 items. I need to make them dynamic for all languages.
const safetyData = `  const safetyTips = [
    {
      id: 1,
      title: { hi: 'तारों को न जलाएं', mr: 'वायर जाळू नका', en: 'Do Not Burn Cables', bn: 'তার পোড়াবেন না', gu: 'વાયર બાળશો નહીં', kn: 'ತಂತಿಗಳನ್ನು ಸುಡಬೇಡಿ', te: 'తీగలను కాల్చవద్దు', ta: 'கம்பிகளை எரிக்க வேண்டாம்' }[lang] || 'Do Not Burn Cables',
      desc: { hi: 'तांबा निकालने के लिए तारों को न जलाएं। इससे जहरीला धुआं निकलता है।', mr: 'तांबे काढण्यासाठी वायर जाळू नका. यातून विषारी धूर निघतो.', en: 'Do not burn cables to extract copper. It releases toxic fumes.', bn: 'তামা বের করতে তার পোড়াবেন না। এতে বিষাক্ত ধোঁয়া বের হয়।', gu: 'તાંબુ કાઢવા વાયર બાળશો નહીં. તે ઝેરી ધુમાડો કાઢે છે.', kn: 'ತಾಮ್ರ ತೆಗೆಯಲು ತಂತಿ ಸುಡಬೇಡಿ. ಇದು ವಿಷಕಾರಿ ಹೊಗೆಯನ್ನು ಬಿಡುಗಡೆ ಮಾಡುತ್ತದೆ.', te: 'రాగి తీయడానికి తీగలను కాల్చవద్దు. ఇది విషపూరిత పొగను విడుదల చేస్తుంది.', ta: 'தாமிரம் எடுக்க கம்பிகளை எரிக்க வேண்டாம். இது நச்சு புகையை வெளியிடும்.' }[lang] || 'Do not burn cables to extract copper. It releases toxic fumes.',
      icon: '🔥'
    },
    {
      id: 2,
      title: { hi: 'बैटरी को न तोड़ें', mr: 'बॅटरी फोडू नका', en: 'Do Not Break Batteries', bn: 'ব্যাটারি ভাঙবেন না', gu: 'બેટરી તોડશો નહીં', kn: 'ಬ್ಯಾಟರಿ ಒಡೆಯಬೇಡಿ', te: 'బ్యాటరీని పగలగొట్టవద్దు', ta: 'பேட்டரியை உடைக்க வேண்டாம்' }[lang] || 'Do Not Break Batteries',
      desc: { hi: 'लिथियम बैटरी फटने या आग लगने का खतरा होता है। इसे सुरक्षित रखें।', mr: 'लिथियम बॅटरी फुटण्याचा किंवा आग लागण्याचा धोका असतो. सुरक्षित ठेवा.', en: 'Lithium batteries can explode or catch fire. Store them safely.', bn: 'লিথিয়াম ব্যাটারি ফাটতে পারে। এটি নিরাপদে রাখুন।', gu: 'લિથિયમ બેટરી ફાટી શકે છે. સુરક્ષિત રાખો.', kn: 'ಲಿಥಿಯಂ ಬ್ಯಾಟರಿ ಸ್ಫೋಟಗೊಳ್ಳಬಹುದು. ಸುರಕ್ಷಿತವಾಗಿಡಿ.', te: 'లిథియం బ్యాటరీలు పేలవచ్చు. సురక్షితంగా ఉంచండి.', ta: 'லித்தியம் பேட்டரி வெடிக்கலாம். பாதுகாப்பாக வைக்கவும்.' }[lang] || 'Lithium batteries can explode or catch fire. Store them safely.',
      icon: '🔋'
    },
    {
      id: 3,
      title: { hi: 'एसिड से बचें', mr: 'अॅसिडपासून दूर राहा', en: 'Avoid Acids', bn: 'অ্যাসিড থেকে দূরে থাকুন', gu: 'એસિડથી દૂર રહો', kn: 'ಆಮ್ಲಗಳಿಂದ ದೂರವಿರಿ', te: 'ఆమ్లాలకు దూరంగా ఉండండి', ta: 'அமிலங்களை தவிர்க்கவும்' }[lang] || 'Avoid Acids',
      desc: { hi: 'सर्किट बोर्ड से सोना निकालने के लिए एसिड का उपयोग न करें। यह जानलेवा है।', mr: 'सर्किट बोर्डमधून सोने काढण्यासाठी अॅसिड वापरू नका. हे धोकादायक आहे.', en: 'Do not use acid to extract gold from circuit boards. It is lethal.', bn: 'সার্কিট বোর্ড থেকে সোনা বের করতে অ্যাসিড ব্যবহার করবেন না।', gu: 'સર્કિટ બોર્ડમાંથી સોનું કાઢવા એસિડ વાપરશો નહીં.', kn: 'ಸರ್ಕ್ಯೂಟ್ ಬೋರ್ಡ್‌ನಿಂದ ಚಿನ್ನ ತೆಗೆಯಲು ಆಮ್ಲ ಬಳಸಬೇಡಿ.', te: 'సర్క్యూట్ బోర్డ్ నుండి బంగారం తీయడానికి యాసిడ్ ఉపయోగించవద్దు.', ta: 'சர்க்யூட் போர்டில் இருந்து தங்கம் எடுக்க அமிலத்தை பயன்படுத்த வேண்டாம்.' }[lang] || 'Do not use acid to extract gold from circuit boards. It is lethal.',
      icon: '🧪'
    }
  ];`;

// Regex replace the old safetyTips array
content = content.replace(/const safetyTips = \[\s*\{[\s\S]*?\}\s*\];/m, safetyData);

const safetyGuidelineTitle = `                  {{ hi: 'सुरक्षा निर्देश', mr: 'सुरक्षा सूचना', en: 'Safety Guidelines', bn: 'নিরাপত্তা নির্দেশিকা', gu: 'સુરક્ષા માર્ગદર્શિકા', kn: 'ಸುರಕ್ಷತಾ ಮಾರ್ಗಸೂಚಿಗಳು', te: 'భద్రతా సూచనలు', ta: 'பாதுகாப்பு வழிகாட்டுதல்கள்' }[lang] || 'Safety Guidelines'}`;
content = content.replace(/\{lang === 'hi' \? 'सुरक्षा निर्देश' : lang === 'mr' \? 'सुरक्षा सूचना' : 'Safety Guidelines'\}/g, safetyGuidelineTitle);

fs.writeFileSync(path, content, 'utf8');
console.log('SafetyGuide.jsx localized successfully');
