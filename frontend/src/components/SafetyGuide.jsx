import React, { useState } from 'react';
import { AlertTriangle, X, Battery, Droplet, Flame, Volume2 } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function SafetyGuide({ lang = 'hi' }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang] || translations.hi;

    const safetyItems = [
    {
      icon: <Flame className="w-8 h-8 text-red-500" />,
      title: { hi: 'तारों को न जलाएं', mr: 'वायर जाळू नका', en: 'Do Not Burn Cables', bn: 'তার পোড়াবেন না', gu: 'વાયર બાળશો નહીં', kn: 'ತಂತಿಗಳನ್ನು ಸುಡಬೇಡಿ', te: 'తీగలను కాల్చవద్దు', ta: 'கம்பிகளை எரிக்க வேண்டாம்' }[lang] || 'Do Not Burn Cables',
      desc: { hi: 'तांबा निकालने के लिए तारों को न जलाएं। इससे जहरीला धुआं निकलता है।', mr: 'तांबे काढण्यासाठी वायर जाळू नका. यातून विषारी धूर निघतो.', en: 'Do not burn cables to extract copper. It releases toxic fumes.', bn: 'তামা বের করতে তার পোড়াবেন না। এতে বিষাক্ত ধোঁয়া বের হয়।', gu: 'તાંબુ કાઢવા વાયર બાળશો નહીં. તે ઝેરી ધુમાડો કાઢે છે.', kn: 'ತಾಮ್ರ ತೆಗೆಯಲು ತಂತಿ ಸುಡಬೇಡಿ. ಇದು ವಿಷಕಾರಿ ಹೊಗೆಯನ್ನು ಬಿಡುಗಡೆ ಮಾಡುತ್ತದೆ.', te: 'రాగి తీయడానికి తీగలను కాల్చవద్దు. ఇది విషపూరిత పొగను విడుదల చేస్తుంది.', ta: 'தாமிரம் எடுக்க கம்பிகளை எரிக்க வேண்டாம். இது நச்சு புகையை வெளியிடும்.' }[lang] || 'Do not burn cables to extract copper. It releases toxic fumes.',
      color: 'bg-red-50 border-red-200 text-red-900'
    },
    {
      icon: <Battery className="w-8 h-8 text-orange-500" />,
      title: { hi: 'बैटरी को न तोड़ें', mr: 'बॅटरी फोडू नका', en: 'Do Not Break Batteries', bn: 'ব্যাটারি ভাঙবেন না', gu: 'બેટરી તોડશો નહીં', kn: 'ಬ್ಯಾಟರಿ ಒಡೆಯಬೇಡಿ', te: 'బ్యాటరీని పగలగొట్టవద్దు', ta: 'பேட்டரியை உடைக்க வேண்டாம்' }[lang] || 'Do Not Break Batteries',
      desc: { hi: 'लिथियम बैटरी फटने या आग लगने का खतरा होता है। इसे सुरक्षित रखें।', mr: 'लिथियम बॅटरी फुटण्याचा किंवा आग लागण्याचा धोका असतो. सुरक्षित ठेवा.', en: 'Lithium batteries can explode or catch fire. Store them safely.', bn: 'লিথিয়াম ব্যাটারি ফাটতে পারে। এটি নিরাপদে রাখুন।', gu: 'લિથિયમ બેટરી ફાટી શકે છે. સુરક્ષિત રાખો.', kn: 'ಲಿಥಿಯಂ ಬ್ಯಾಟರಿ ಸ್ಫೋಟಗೊಳ್ಳಬಹುದು. ಸುರಕ್ಷಿತವಾಗಿಡಿ.', te: 'లిథియం బ్యాటరీలు పేలవచ్చు. సురక్షితంగా ఉంచండి.', ta: 'லித்தியம் பேட்டரி வெடிக்கலாம். பாதுகாப்பாக வைக்கவும்.' }[lang] || 'Lithium batteries can explode or catch fire. Store them safely.',
      color: 'bg-orange-50 border-orange-200 text-orange-900'
    },
    {
      icon: <Droplet className="w-8 h-8 text-yellow-500" />,
      title: { hi: 'एसिड से बचें', mr: 'अॅसिडपासून दूर राहा', en: 'Avoid Acids', bn: 'অ্যাসিড থেকে দূরে থাকুন', gu: 'એસિડથી દૂર રહો', kn: 'ಆಮ್ಲಗಳಿಂದ ದೂರವಿರಿ', te: 'ఆమ్లాలకు దూరంగా ఉండండి', ta: 'அமிலங்களை தவிர்க்கவும்' }[lang] || 'Avoid Acids',
      desc: { hi: 'सर्किट बोर्ड से सोना निकालने के लिए एसिड का उपयोग न करें। यह जानलेवा है।', mr: 'सर्किट बोर्डमधून सोने काढण्यासाठी अॅसिड वापरू नका. हे धोकादायक आहे.', en: 'Do not use acid to extract gold from circuit boards. It is lethal.', bn: 'সার্কিট বোর্ড থেকে সোনা বের করতে অ্যাসিড ব্যবহার করবেন না।', gu: 'સર્કિટ બોર્ડમાંથી સોનું કાઢવા એસિડ વાપરશો નહીં.', kn: 'ಸರ್ಕ್ಯೂಟ್ ಬೋರ್ಡ್‌ನಿಂದ ಚಿನ್ನ ತೆಗೆಯಲು ಆಮ್ಲ ಬಳಸಬೇಡಿ.', te: 'సర్క్యూట్ బోర్డ్ నుండి బంగారం తీయడానికి యాసిడ్ ఉపయోగించవద్దు.', ta: 'சர்க்யூட் போர்டில் இருந்து தங்கம் எடுக்க அமிலத்தை பயன்படுத்த வேண்டாம்.' }[lang] || 'Do not use acid to extract gold from circuit boards. It is lethal.',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-900'
    }
  ];

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
        // Force wake-up for Desktop Chrome bug where voices aren't loaded immediately
        let voices = window.speechSynthesis.getVoices();
        const targetLang = ({ hi: 'hi-IN', mr: 'mr-IN', en: 'en-IN', bn: 'bn-IN', gu: 'gu-IN', kn: 'kn-IN', te: 'te-IN', ta: 'ta-IN' }[lang] || 'en-IN');
        utterance.lang = targetLang;
        
        if (voices.length > 0) {
          // 1. Try to find an exact regional match (e.g., Google हिन्दी)
          let voice = voices.find(v => v.lang.replace('_','-') === targetLang);
          // 2. Try to find a broad language match (e.g., hi)
          if (!voice) voice = voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
          // 3. Fallback to any Google Voice (Desktop Chrome cloud voices usually work better)
          if (!voice && targetLang !== 'en-IN') voice = voices.find(v => v.name.includes('Google') && v.lang.startsWith(targetLang.split('-')[0]));
          
          if (!voice && targetLang === 'mr-IN') {
             voice = voices.find(v => v.lang.startsWith('hi'));
          }
          
          if (voice) {
            utterance.voice = voice;
          }
        }

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-3 sm:p-4 rounded-full shadow-2xl flex items-center justify-center transition active:scale-95 z-40 border-2 border-white"
        aria-label="Safety Guide"
      >
        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-red-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="font-black text-lg">
                                    {{ hi: 'सुरक्षा निर्देश', mr: 'सुरक्षा सूचना', en: 'Safety Guidelines', bn: 'নিরাপত্তা নির্দেশিকা', gu: 'સુરક્ષા માર્ગદર્શિકા', kn: 'ಸುರಕ್ಷತಾ ಮಾರ್ಗಸೂಚಿಗಳು', te: 'భద్రతా సూచనలు', ta: 'பாதுகாப்பு வழிகாட்டுதல்கள்' }[lang] || 'Safety Guidelines'}
                </h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-red-700 transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              {safetyItems.map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${item.color} flex gap-4 items-start`}>
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm sm:text-base mb-1">{item.title}</h4>
                    <p className="text-xs sm:text-sm opacity-90">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => speak(`${item.title}. ${item.desc}`)}
                    className="p-2 bg-white/50 hover:bg-white rounded-full transition shadow-sm border border-slate-200/50"
                  >
                    <Volume2 className="w-5 h-5 opacity-80" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition"
              >
                {t.doneBtn || 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
