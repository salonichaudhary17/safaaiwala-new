const fs = require('fs');
const path = './frontend/src/components/RecyclerMatch.jsx';
let content = fs.readFileSync(path, 'utf8');

// The RecyclerMatch list has:
// name: lang === 'hi' ? 'ग्रीन ई-वेस्ट हब (दिल्ली)' : lang === 'mr' ? 'ग्रीन ई-वेस्ट हब (पुणे)' : 'Green E-Waste Hub',

content = content.replace(/name: lang === 'hi' \? 'ग्रीन ई-वेस्ट हब \(दिल्ली\)' : lang === 'mr' \? 'ग्रीन ई-वेस्ट हब \(पुणे\)' : 'Green E-Waste Hub',/g, 
  "name: { hi: 'ग्रीन ई-वेस्ट हब (दिल्ली)', mr: 'ग्रीन ई-वेस्ट हब (पुणे)', en: 'Green E-Waste Hub', bn: 'গ্রিন ই-বর্জ্য হাব', gu: 'ગ્રીન ઈ-કચરો હબ', kn: 'ಗ್ರೀನ್ ಇ-ತ್ಯಾಜ್ಯ ಹಬ್', te: 'గ్రీన్ ఈ-వేస్ట్ హబ్', ta: 'கிரீன் இ-கழிவு மையம்' }[lang] || 'Green E-Waste Hub',");

content = content.replace(/name: lang === 'hi' \? 'सुपर रीसाइक्लिंग सेंटर' : lang === 'mr' \? 'सुपर रिसायकलिंग सेंटर' : 'Super Recycling Center',/g, 
  "name: { hi: 'सुपर रीसाइक्लिंग सेंटर', mr: 'सुपर रिसायकलिंग सेंटर', en: 'Super Recycling Center', bn: 'সুপার রিসাইক্লিং সেন্টার', gu: 'સુપર રિસાયક્લિંગ સેન્ટર', kn: 'ಸೂಪರ್ ರಿಸೈಕ್ಲಿಂಗ್ ಸೆಂಟರ್', te: 'సూపర్ రీసైక్లింగ్ సెంటర్', ta: 'சூப்பர் ரீசைக்கிளிங் மையம்' }[lang] || 'Super Recycling Center',");

content = content.replace(/name: lang === 'hi' \? 'इको-स्क्रैप एग्रीगेटर' : lang === 'mr' \? 'इको-स्क्रॅप ॲग्रीगेटर' : 'Eco-Scrap Aggregator',/g, 
  "name: { hi: 'इको-स्क्रैप एग्रीगेटर', mr: 'इको-स्क्रॅप ॲग्रीगेटर', en: 'Eco-Scrap Aggregator', bn: 'ইকো-স্ক্র্যাপ এগ্রিগেটর', gu: 'ઇકો-સ્ક્રેપ એગ્રીગેટર', kn: 'ಇಕೋ-ಸ್ಕ್ರ್ಯಾಪ್ ಅಗ್ರಿಗೇಟರ್', te: 'ఎకో-స్క్రాప్ అగ్రిగేటర్', ta: 'எகோ-ஸ்கிராப் அக்ரிகேட்டர்' }[lang] || 'Eco-Scrap Aggregator',");

// UI labels
content = content.replace(/\{lang === 'hi' \? 'नजदीकी कबाड़ी \/ रीसायकलर' : lang === 'mr' \? 'जवळचे रीसायकलर' : 'Nearby Matched Recyclers'\}/g, 
  "{{ hi: 'नजदीकी कबाड़ी / रीसायकलर', mr: 'जवळचे रीसायकलर', en: 'Nearby Matched Recyclers', bn: 'কাছাকাছি রিসাইক্লার', gu: 'નજીકના રિસાયકલર', kn: 'ಹತ್ತಿರದ ರಿಸೈಕ್ಲರ್', te: 'సమీప రీసైక్లర్', ta: 'அருகிலுள்ள ரீசைக்கிளர்' }[lang] || 'Nearby Matched Recyclers'}");

content = content.replace(/\{lang === 'hi' \? 'कॉल करें' : lang === 'mr' \? 'कॉल करा' : 'Call'\}/g, 
  "{{ hi: 'कॉल करें', mr: 'कॉल करा', en: 'Call', bn: 'কল করুন', gu: 'કૉલ કરો', kn: 'ಕರೆ ಮಾಡಿ', te: 'కాల్ చేయండి', ta: 'அழைக்க' }[lang] || 'Call'}");

content = content.replace(/\{lang === 'hi' \? 'चुनें' : lang === 'mr' \? 'निवडा' : 'Select'\}/g, 
  "{{ hi: 'चुनें', mr: 'निवडा', en: 'Select', bn: 'নির্বাচন করুন', gu: 'પસંદ કરો', kn: 'ಆಯ್ಕೆಮಾಡಿ', te: 'ఎంచుకోండి', ta: 'தேர்ந்தெடு' }[lang] || 'Select'}");

fs.writeFileSync(path, content, 'utf8');
console.log('RecyclerMatch.jsx localized successfully');
