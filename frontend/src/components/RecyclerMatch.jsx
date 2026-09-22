import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Truck, ShieldCheck, CheckCircle2, Factory } from 'lucide-react';

export default function RecyclerMatch({ materialCategory, weightKg, totalValue, onSelect, lang = 'hi' }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock Recycler Dataset (Matches SIH Requirement)
  const recyclers = [
    {
      id: "REC-7382",
      name: { hi: 'ग्रीन ई-वेस्ट हब (दिल्ली)', mr: 'ग्रीन ई-वेस्ट हब (पुणे)', en: 'Green E-Waste Hub', bn: 'গ্রিন ই-বর্জ্য হাব', gu: 'ગ્રીન ઈ-કચરો હબ', kn: 'ಗ್ರೀನ್ ಇ-ತ್ಯಾಜ್ಯ ಹಬ್', te: 'గ్రీన్ ఈ-వేస్ట్ హబ్', ta: 'கிரீன் இ-கழிவு மையம்' }[lang] || 'Green E-Waste Hub',
      distanceKm: 2.4,
      cpcbVerified: true,
      accepts: ['pcb', 'battery', 'metal'],
      rateMultiplier: 1.05,
      pickup: true,
      phone: "+91 98765 43210"
    },
    {
      id: "REC-9104",
      name: { hi: 'सुपर रीसाइक्लिंग सेंटर', mr: 'सुपर रिसायकलिंग सेंटर', en: 'Super Recycling Center', bn: 'সুপার রিসাইক্লিং সেন্টার', gu: 'સુપર રિસાયક્લિંગ સેન્ટર', kn: 'ಸೂಪರ್ ರಿಸೈಕ್ಲಿಂಗ್ ಸೆಂಟರ್', te: 'సూపర్ రీసైక్లింగ్ సెంటర్', ta: 'சூப்பர் ரீசைக்கிளிங் மையம்' }[lang] || 'Super Recycling Center',
      distanceKm: 4.1,
      cpcbVerified: true,
      accepts: ['plastic', 'metal', 'glass'],
      rateMultiplier: 1.0,
      pickup: false,
      phone: "+91 87654 32109"
    },
    {
      id: "REC-2291",
      name: { hi: 'इको-स्क्रैप एग्रीगेटर', mr: 'इको-स्क्रॅप ॲग्रीगेटर', en: 'Eco-Scrap Aggregator', bn: 'ইকো-স্ক্র্যাপ এগ্রিগেটর', gu: 'ઇકો-સ્ક્રેપ એગ્રીગેટર', kn: 'ಇಕೋ-ಸ್ಕ್ರ್ಯಾಪ್ ಅಗ್ರಿಗೇಟರ್', te: 'ఎకో-స్క్రాప్ అగ్రిగేటర్', ta: 'எகோ-ஸ்கிராப் அக்ரிகேட்டர்' }[lang] || 'Eco-Scrap Aggregator',
      distanceKm: 7.8,
      cpcbVerified: false,
      accepts: ['pcb', 'battery', 'plastic', 'metal', 'glass'],
      rateMultiplier: 0.9,
      pickup: true,
      phone: "+91 76543 21098"
    }
  ];

  useEffect(() => {
    // Simulate GPS fetch for Recycler Match
    const timer = setTimeout(() => {
      setLocation({ lat: 28.6139, lng: 77.2090 });
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-xl border border-slate-200 mt-4 animate-pulse flex gap-3">
        <div className="w-10 h-10 bg-slate-200 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-1/2" />
          <div className="h-3 bg-slate-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

  // Filter and sort by distance and rate
  const matched = recyclers.sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 2);

  return (
    <div className="mt-5 border-t border-slate-200 pt-5">
      <div className="flex items-center gap-2 mb-3">
        <Factory className="w-5 h-5 text-slate-500" />
        <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider">
          {{ hi: 'नजदीकी कबाड़ी / रीसायकलर', mr: 'जवळचे रीसायकलर', en: 'Nearby Matched Recyclers', bn: 'কাছাকাছি রিসাইক্লার', gu: 'નજીકના રિસાયકલર', kn: 'ಹತ್ತಿರದ ರಿಸೈಕ್ಲರ್', te: 'సమీప రీసైక్లర్', ta: 'அருகிலுள்ள ரீசைக்கிளர்' }[lang] || 'Nearby Matched Recyclers'}
        </h3>
      </div>
      
      <div className="space-y-3">
        {matched.map(rec => {
          const offer = Math.round(totalValue * rec.rateMultiplier);
          return (
            <div key={rec.id} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    {rec.name}
                    {rec.cpcbVerified && (
                      <span className="bg-emerald-100 text-emerald-700 text-[9px] px-1.5 py-0.5 rounded font-black border border-emerald-200 flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" /> CPCB
                      </span>
                    )}
                  </h4>
                  <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                    <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {rec.distanceKm} km</span>
                    {rec.pickup && <span className="flex items-center gap-0.5 text-blue-600 font-medium"><Truck className="w-3 h-3" /> Pickup</span>}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Offer</span>
                  <span className="font-black text-emerald-700 text-lg">₹{offer}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <a href={`tel:${rec.phone}`} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition">
                  <Phone className="w-3.5 h-3.5" /> 
                  {{ hi: 'कॉल करें', mr: 'कॉल करा', en: 'Call', bn: 'কল করুন', gu: 'કૉલ કરો', kn: 'ಕರೆ ಮಾಡಿ', te: 'కాల్ చేయండి', ta: 'அழைக்க' }[lang] || 'Call'}
                </a>
                <button 
                  onClick={() => onSelect(rec)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> 
                  {{ hi: 'चुनें', mr: 'निवडा', en: 'Select', bn: 'নির্বাচন করুন', gu: 'પસંદ કરો', kn: 'ಆಯ್ಕೆಮಾಡಿ', te: 'ఎంచుకోండి', ta: 'தேர்ந்தெடு' }[lang] || 'Select'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
