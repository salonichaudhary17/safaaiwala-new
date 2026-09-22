import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Globe, Sparkles } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function VoiceAssistant({ lang = 'hi', setLang, onNavigate, onTriggerScan }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [spokenText, setSpokenText] = useState('');
  const recognitionRef = useRef(null);

  const t = translations[lang] || translations.hi;

  const langCodeMap = {
    hi: 'hi-IN',
    mr: 'mr-IN',
    en: 'en-IN',
    bn: 'bn-IN',
    gu: 'gu-IN',
    kn: 'kn-IN',
    te: 'te-IN',
    ta: 'ta-IN'
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false; // More reliable across browsers
      rec.lang = langCodeMap[lang] || 'hi-IN';

      rec.onresult = (event) => {
        const currentTranscript = event.results[0][0].transcript;
        setTranscript(currentTranscript);
        parseVoiceCommand(currentTranscript);
      };

      rec.onerror = (e) => {
        console.warn('Speech recognition status:', e.error);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, [lang]);

  const speak = (text) => {
    setSpokenText(text);
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langCodeMap[lang] || 'hi-IN';
        utterance.rate = 0.92;
        
        // Pick appropriate vernacular voice if available in browser
        const voices = window.speechSynthesis.getVoices();
        const matchingVoice = voices.find(v => v.lang.startsWith(lang) || v.lang.includes(langCodeMap[lang]));
        if (matchingVoice) utterance.voice = matchingVoice;
        
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
      }
    }
  };

  const parseVoiceCommand = (rawCmd) => {
    const cmd = rawCmd.toLowerCase();

  const MATERIAL_KEYWORDS = [
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
  ];

    // Single item rate check
    let matchedItem = null;
    for (const item of MATERIAL_KEYWORDS) {
      if (item.keys.some(k => cmd.includes(k.toLowerCase()))) {
        matchedItem = item;
        break;
      }
    }

    if (matchedItem) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      const matName = matchedItem.names[lang] || matchedItem.names.en;
      const baseRate = matchedItem.basePrice;
      const eprBonus = 15;
      const netRate = baseRate + eprBonus;

      let response = '';
      if (lang === 'hi') {
        response = `${matName} का ताज़ा भाव ₹${netRate} प्रति किलो है, जिसमें ₹${eprBonus} EPR बोनस शामिल है।`;
      } else if (lang === 'mr') {
        response = `${matName} चा दर ₹${netRate} प्रति किलो आहे.`;
      } else if (lang === 'bn') {
        response = `${matName} এর বর্তমান দাম প্রতি কেজি ₹${netRate}`;
      } else if (lang === 'gu') {
        response = `${matName} નો આજનો ભાવ ₹${netRate} પ્રતિ કિલો છે`;
      } else if (lang === 'kn') {
        response = `${matName} ಪ್ರಸ್ತುತ ದರ ಪ್ರತಿ ಕೆಜಿಗೆ ₹${netRate}`;
      } else if (lang === 'te') {
        response = `${matName} ప్రస్తుత ధర కిలోకు ₹${netRate}`;
      } else if (lang === 'ta') {
        response = `${matName} தற்போதைய விலை கிலோவிற்கு ₹${netRate}`;
      } else {
        response = `The current rate for ${matName} is ₹${netRate} per kilogram.`;
      }

      setSpokenText(response); // Ensure we show the exact text spoken
      speak(response);
      if (onNavigate) onNavigate('prices');
      return;
    }

    // Pricing (all items)
    if (
      cmd.includes('price') || cmd.includes('rate') || cmd.includes('bhav') || 
      cmd.includes('भाव') || cmd.includes('दाम') || cmd.includes('रेट') || 
      cmd.includes('दर') || cmd.includes('किंमत')
    ) {
      const response = lang === 'mr'
        ? 'लाइव्ह भाव दाखवत आहे. सर्व 10 वस्तूंचे दर याप्रमाणे आहेत: तांब्याची तार ₹440, सर्किट बोर्ड ₹183, लिथियम बॅटरी ₹225, रॅम मेमरी ₹850, संमिश्र ई-कचरा ₹45, पीईटी प्लॅस्टिक ₹26, सीआरटी ग्लास ₹85, इलेक्ट्रिक मोटर ₹195, एचडीपीई प्लॅस्टिक ₹34, आणि लेड बॅटरी प्लेट्स ₹148 प्रति किलो.'
        : lang === 'en'
        ? 'Showing live scrap prices. Here are the rates for all 10 items: Copper wires are ₹440, Circuit Boards ₹183, Lithium Batteries ₹225, RAM Memory ₹850, Mixed E-waste ₹45, PET Plastic ₹26, CRT Glass ₹85, Electric Motors ₹195, HDPE Plastic ₹34, and Lead Battery plates ₹148 per kg.'
        : 'लाइव भाव दिखाया जा रहा है। सभी 10 सामग्रियों की दरें इस प्रकार हैं: तांबे का तार ₹440, सर्किट बोर्ड ₹183, लिथियम बैटरी ₹225, रैम मेमोरी ₹850, मिश्रित ई-कचरा ₹45, पीईटी प्लास्टिक ₹26, CRT ग्लास ₹85, इलेक्ट्रिक मोटर ₹195, एचडीपीई प्लास्टिक ₹34, और लेड बैटरी प्लेट्स ₹148 प्रति किलो हैं।';
      speak(response);
      if (onNavigate) onNavigate('prices');
      return;
    }

    // Scanner / Camera
    if (
      cmd.includes('scan') || cmd.includes('camera') || cmd.includes('photo') ||
      cmd.includes('कैमरा') || cmd.includes('स्कैन') || cmd.includes('फोटो') ||
      cmd.includes('कॅमेरा') || cmd.includes('स्कॅन') || cmd.includes('तपासा')
    ) {
      const response = lang === 'mr'
        ? 'कॅमेरा सुरू करत आहे. ई-कचरा कॅमेऱ्यासमोर ठेवा.'
        : lang === 'en'
        ? 'Opening waste classifier camera. Show your scrap item to the lens.'
        : 'कैमरा स्कैनर खोला जा रहा है। सामग्री को कैमरे के सामने रखें।';
      speak(response);
      if (onNavigate) onNavigate('scanner');
      if (onTriggerScan) onTriggerScan();
      return;
    }

    // Recycler Portal
    if (
      cmd.includes('recycler') || cmd.includes('portal') || cmd.includes('center') ||
      cmd.includes('रीसायकलर') || cmd.includes('कबाड़ी') || cmd.includes('सेंटर') ||
      cmd.includes('हब') || cmd.includes('हस्तांतरण')
    ) {
      const response = lang === 'mr'
        ? 'CPCB अधिकृत रीसायकलर पोर्टल उघडत आहे.'
        : lang === 'en'
        ? 'Navigating to CPCB EPR Recycler Management Portal.'
        : 'CPCB अधिकृत रीसायकलर पोर्टल खोला जा रहा है।';
      speak(response);
      if (onNavigate) onNavigate('recycler');
      return;
    }

    // Fallback general prompt
    const defaultReply = lang === 'mr'
      ? `तुम्ही म्हटले: "${rawCmd}". कृपया "भाव", "स्कॅनर" किंवा "रीसायकलर" बोला.`
      : lang === 'en'
      ? `You said: "${rawCmd}". Say "Price", "Scanner", or "Recycler Portal".`
      : `आपने कहा: "${rawCmd}". कृपया "भाव", "स्कैनर", या "रीसायकलर" कहें।`;
    speak(defaultReply);
  };
const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(t.micUnsupported);
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
      setIsListening(false);
    } else {
      setTranscript('');
      try {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          // Unlock audio context on mobile by speaking an empty string during user interaction
          const unlockUtterance = new SpeechSynthesisUtterance('');
          unlockUtterance.volume = 0;
          window.speechSynthesis.speak(unlockUtterance);
        }
        
        if (!recognitionRef.current) {
          const rec = new SpeechRecognition();
          rec.continuous = false;
          rec.interimResults = false;
          rec.lang = langCodeMap[lang] || 'hi-IN';
          rec.onresult = (event) => {
            const currentTranscript = event.results[0][0].transcript;
            setTranscript(currentTranscript);
            parseVoiceCommand(currentTranscript);
          };
          rec.onerror = (e) => {
            setIsListening(false);
            if (e.error === 'network' || !navigator.onLine) {
              const offlineMsg = lang === 'mr' ? 'इंटरनेट कनेक्शन नाही. व्हॉइस असिस्टंट ऑफलाइन कार्य करत नाही.' : lang === 'en' ? 'No internet connection. Voice assistant requires internet for speech recognition.' : 'इंटरनेट कनेक्शन नहीं है। वॉयस असिस्टेंट को इंटरनेट की आवश्यकता है।';
              speak(offlineMsg);
            }
          };
          rec.onend = () => setIsListening(false);
          recognitionRef.current = rec;
        }
        
        recognitionRef.current.lang = langCodeMap[lang] || 'hi-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Speech start error:', err);
        setIsListening(false);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white p-4 sm:p-5 rounded-2xl shadow-xl mb-6 border border-emerald-700/40">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={toggleListening}
            aria-label="Voice Assistant Mic"
            className={`p-4 rounded-2xl transition-all flex items-center justify-center shrink-0 shadow-lg ${
              isListening
                ? 'bg-red-500 text-white ring-4 ring-red-400/50 animate-pulse scale-105'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:scale-105 active:scale-95'
            }`}
          >
            {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                {t.voiceTitle} ({lang.toUpperCase()})
              </h3>
              <span className="text-[11px] bg-emerald-800/80 text-emerald-200 px-2 py-0.5 rounded-full font-bold border border-emerald-600/50">
                {{hi:'हिंदी',mr:'मराठी',en:'English',bn:'বাংলা',gu:'ગુજરાતી',kn:'ಕನ್ನಡ',te:'తెలుగు',ta:'தமிழ்'}[lang] || 'English'}
              </span>
            </div>
            <p className="text-emerald-200/90 text-xs sm:text-sm mt-0.5">
              {isListening ? (
                <span className="text-amber-300 font-semibold animate-pulse">
                  🎙️ {transcript || t.listening}
                </span>
              ) : (
                t.speakPrompt
              )}
            </p>
          </div>
        </div>

        {spokenText && (
          <div className="w-full md:w-auto max-w-md bg-emerald-800/60 backdrop-blur px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 text-emerald-100 border border-emerald-600/40">
            <Volume2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span className="truncate">{spokenText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
