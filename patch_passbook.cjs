const fs = require('fs');
const path = './frontend/src/components/Passbook.jsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
  {
    target: /\{lang === 'hi' \? 'कुल कमाई' : lang === 'mr' \? 'एकूण कमाई' : 'Total Earned'\}/g,
    replace: `{{ hi: 'कुल कमाई', mr: 'एकूण कमाई', en: 'Total Earned', bn: 'মোট উপার্জন', gu: 'કુલ કમાણી', kn: 'ಒಟ್ಟು ಗಳಿಕೆ', te: 'మొత్తం సంపాదన', ta: 'மொத்த வருமானம்' }[lang] || 'Total Earned'}`
  },
  {
    target: /\{lang === 'hi' \? 'बकाया राशि' : lang === 'mr' \? 'बाकी रक्कम' : 'Pending Dues'\}/g,
    replace: `{{ hi: 'बकाया राशि', mr: 'बाकी रक्कम', en: 'Pending Dues', bn: 'বকেয়া পাওনা', gu: 'બાકી રકમ', kn: 'ಬಾಕಿ ಮೊತ್ತ', te: 'పెండింగ్ బకాయిలు', ta: 'நிலுவை தொகை' }[lang] || 'Pending Dues'}`
  },
  {
    target: /\{lang === 'hi' \? 'कुल कबाड़ दिया' : lang === 'mr' \? 'एकूण भंगार दिले' : 'Total Scrap Handed Over'\}/g,
    replace: `{{ hi: 'कुल कबाड़ दिया', mr: 'एकूण भंगार दिले', en: 'Total Scrap Handed Over', bn: 'মোট স্ক্র্যাপ দেওয়া হয়েছে', gu: 'કુલ ભંગાર આપ્યો', kn: 'ಒಟ್ಟು ಸ್ಕ್ರ್ಯಾಪ್ ನೀಡಲಾಗಿದೆ', te: 'మొత్తం స్క్రాప్ ఇవ్వబడింది', ta: 'மொத்த ஸ்கிராப் கொடுக்கப்பட்டது' }[lang] || 'Total Scrap Handed Over'}`
  },
  {
    target: /\{lang === 'hi' \? 'लेन-देन इतिहास' : lang === 'mr' \? 'व्यवहार इतिहास' : 'Transaction History'\}/g,
    replace: `{{ hi: 'लेन-देन इतिहास', mr: 'व्यवहार इतिहास', en: 'Transaction History', bn: 'লেনদেনের ইতিহাস', gu: 'વ્યવહાર ઇતિહાસ', kn: 'ವಹಿವಾಟು ಇತಿಹಾಸ', te: 'లావాదేవీ చరిత్ర', ta: 'பரிவர்த்தனை வரலாறு' }[lang] || 'Transaction History'}`
  },
  {
    target: /\{lang === 'hi' \? 'अभी तक कोई लेन-देन नहीं हुआ' : lang === 'mr' \? 'अद्याप कोणताही व्यवहार नाही' : 'No transactions yet'\}/g,
    replace: `{{ hi: 'अभी तक कोई लेन-देन नहीं हुआ', mr: 'अद्याप कोणताही व्यवहार नाही', en: 'No transactions yet', bn: 'এখনও কোনো লেনদেন হয়নি', gu: 'હજી સુધી કોઈ વ્યવહાર નથી', kn: 'ಇನ್ನೂ ಯಾವುದೇ ವಹಿವಾಟುಗಳಿಲ್ಲ', te: 'ఇంకా లావాదేవీలు లేవు', ta: 'இதுவரை எந்த பரிவர்த்தனையும் இல்லை' }[lang] || 'No transactions yet'}`
  },
  {
    target: /\(lang === 'hi' \? 'ई-कचरा' : lang === 'mr' \? 'ई-कचरा' : 'E-Waste'\)/g,
    replace: `({ hi: 'ई-कचरा', mr: 'ई-कचरा', en: 'E-Waste', bn: 'ই-বর্জ্য', gu: 'ઇ-કચરો', kn: 'ಇ-ತ್ಯಾಜ್ಯ', te: 'ఈ-వేస్ట్', ta: 'இ-கழிவு' }[lang] || 'E-Waste')`
  },
  {
    target: /lang === 'hi' \? 'hi-IN' : 'en-IN'/g,
    replace: `({ hi: 'hi-IN', mr: 'mr-IN', en: 'en-IN', bn: 'bn-IN', gu: 'gu-IN', kn: 'kn-IN', te: 'te-IN', ta: 'ta-IN' }[lang] || 'en-IN')`
  },
  {
    target: /\{lang === 'hi' \? 'ऑफ़लाइन \(सिंक बाकी\)' : lang === 'mr' \? 'ऑफलाइन \(सिंक बाकी\)' : 'Offline \(Pending Sync\)'\}/g,
    replace: `{{ hi: 'ऑफ़लाइन (सिंक बाकी)', mr: 'ऑफलाइन (सिंक बाकी)', en: 'Offline (Pending Sync)', bn: 'অফলাইন (সিঙ্ক বাকি)', gu: 'ઓફલાઇન (સિંક બાકી)', kn: 'ಆಫ್‌ಲೈನ್ (ಸಿಂಕ್ ಬಾಕಿ)', te: 'ఆఫ్‌లైన్ (సింక్ పెండింగ్)', ta: 'ஆஃப்லைன் (ஒத்திசைவு நிலுவையில் உள்ளது)' }[lang] || 'Offline (Pending Sync)'}`
  },
  {
    target: /\(lang === 'hi' \? 'बकाया' : lang === 'mr' \? 'बाकी' : 'PENDING'\)/g,
    replace: `({ hi: 'बकाया', mr: 'बाकी', en: 'PENDING', bn: 'বকেয়া', gu: 'બાકી', kn: 'ಬಾಕಿ', te: 'పెండింగ్', ta: 'நிலுவையில்' }[lang] || 'PENDING')`
  },
  {
    target: /\(lang === 'hi' \? 'प्राप्त' : lang === 'mr' \? 'मिळाले' : 'RECEIVED'\)/g,
    replace: `({ hi: 'प्राप्त', mr: 'मिळाले', en: 'RECEIVED', bn: 'প্রাপ্ত', gu: 'મળ્યું', kn: 'ಸ್ವೀಕರಿಸಲಾಗಿದೆ', te: 'స్వీకరించబడింది', ta: 'பெறப்பட்டது' }[lang] || 'RECEIVED')`
  }
];

let success = true;
replacements.forEach(r => {
  if (content.match(r.target)) {
    content = content.replace(r.target, r.replace);
  } else {
    console.warn("Failed to match:", r.target);
    success = false;
  }
});

fs.writeFileSync(path, content, 'utf8');
if (success) {
  console.log('Passbook.jsx localized successfully!');
}
