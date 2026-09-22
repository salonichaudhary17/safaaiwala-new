import React, { useState } from 'react';
import { AlertTriangle, X, Battery, Droplet, Flame, Volume2 } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function SafetyGuide({ lang = 'hi' }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang] || translations.hi;

  const safetyItems = [
    {
      icon: <Flame className="w-8 h-8 text-red-500" />,
      title: lang === 'hi' ? 'तारों को न जलाएं' : lang === 'mr' ? 'वायर जाळू नका' : 'Do Not Burn Cables',
      desc: lang === 'hi' ? 'तांबा निकालने के लिए तारों को न जलाएं। इससे जहरीला धुआं निकलता है।' : lang === 'mr' ? 'तांबे काढण्यासाठी वायर जाळू नका. यातून विषारी धूर निघतो.' : 'Do not burn cables to extract copper. It releases toxic fumes.',
      color: 'bg-red-50 border-red-200 text-red-900'
    },
    {
      icon: <Battery className="w-8 h-8 text-orange-500" />,
      title: lang === 'hi' ? 'बैटरी को न तोड़ें' : lang === 'mr' ? 'बॅटरी फोडू नका' : 'Do Not Break Batteries',
      desc: lang === 'hi' ? 'लिथियम बैटरी फटने या आग लगने का खतरा होता है। इसे सुरक्षित रखें।' : lang === 'mr' ? 'लिथियम बॅटरी फुटण्याचा किंवा आग लागण्याचा धोका असतो. सुरक्षित ठेवा.' : 'Lithium batteries can explode or catch fire. Store them safely.',
      color: 'bg-orange-50 border-orange-200 text-orange-900'
    },
    {
      icon: <Droplet className="w-8 h-8 text-yellow-500" />,
      title: lang === 'hi' ? 'एसिड से बचें' : lang === 'mr' ? 'अॅसिडपासून दूर राहा' : 'Avoid Acids',
      desc: lang === 'hi' ? 'सर्किट बोर्ड से सोना निकालने के लिए एसिड का उपयोग न करें। यह जानलेवा है।' : lang === 'mr' ? 'सर्किट बोर्डमधून सोने काढण्यासाठी अॅसिड वापरू नका. हे धोकादायक आहे.' : 'Do not use acid to extract gold from circuit boards. It is lethal.',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-900'
    }
  ];

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = ({ hi: 'hi-IN', mr: 'mr-IN', en: 'en-IN', bn: 'bn-IN', gu: 'gu-IN', kn: 'kn-IN', te: 'te-IN', ta: 'ta-IN' }[lang] || 'en-IN');
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
