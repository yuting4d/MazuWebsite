import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Footprints, Backpack, HeartHandshake, Utensils, ShieldAlert, CheckCircle2, AlertTriangle, Coffee, Bus, Tent, Info } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const t = {
  en: {
    title: "General Pilgrimage Guide",
    subtitle: "Everything you need to know before joining a Mazu pilgrimage in Taiwan.",
    tabs: {
      essentials: "Essentials",
      etiquette: "Etiquette",
      logistics: "Logistics"
    },
    sections: {
      essentials: {
        title: "What to Bring & Wear",
        items: [
          { icon: <Footprints />, title: "Comfortable Footwear", desc: "This is the most important item. Wear well-broken-in walking shoes or hiking boots. Bring extra socks to change frequently." },
          { icon: <Backpack />, title: "Lightweight Backpack", desc: "Keep it light. Only pack the absolute essentials. A rain cover for your backpack is highly recommended." },
          { icon: <CheckCircle2 />, title: "Clothing", desc: "Dress in layers. The weather can change from hot days to chilly nights. Moisture-wicking fabrics are best. Bring a lightweight rain jacket." },
          { icon: <AlertTriangle />, title: "First Aid Kit", desc: "Pack blister pads, bandages, muscle rub, and any personal medications. Sunscreen and mosquito repellent are also crucial." }
        ]
      },
      etiquette: {
        title: "Customs & Taboos",
        items: [
          { icon: <HeartHandshake />, title: "Respect the Rituals", desc: "Follow the instructions of temple staff. Do not cross in front of the palanquin or disrupt the procession." },
          { icon: <AlertTriangle />, title: "Traditional Taboos", desc: "Traditionally, those in mourning (within a year of a family member's passing) or women during menstruation are advised to observe from a distance rather than actively participating in the core procession, though modern interpretations vary." },
          { icon: <CheckCircle2 />, title: "Vegetarian Diet", desc: "Many pilgrims observe a vegetarian diet for a few days before and during the pilgrimage as a sign of purity and devotion." },
          { icon: <Info />, title: "Offerings & Incense", desc: "If you wish to offer incense, do so respectfully. You can often receive incense from the temple or other pilgrims." }
        ]
      },
      logistics: {
        title: "Food, Rest & Safety",
        items: [
          { icon: <Utensils />, title: "Free Food (Fu-Shi)", desc: "Locals generously provide free food and drinks along the route. Take only what you can finish to avoid waste. Always express gratitude." },
          { icon: <Tent />, title: "Accommodation", desc: "Many temples offer free floor space for sleeping. Bring a sleeping mat and light sleeping bag. Alternatively, book local hotels well in advance." },
          { icon: <Bus />, title: "Transportation", desc: "You don't have to walk the entire way. It's perfectly fine to take buses or trains between major stops if you are tired." },
          { icon: <ShieldAlert />, title: "Stay Safe", desc: "Stay hydrated. Listen to your body and rest when needed. Keep your valuables secure in crowds." }
        ]
      }
    }
  },
  zh: {
    title: "進香通用懶人包",
    subtitle: "參與台灣媽祖進香活動前，您需要知道的實用資訊與建議。",
    tabs: {
      essentials: "必備物品",
      etiquette: "習俗禁忌",
      logistics: "食宿交通"
    },
    sections: {
      essentials: {
        title: "穿著與裝備建議",
        items: [
          { icon: <Footprints />, title: "舒適的鞋襪", desc: "最重要的一環！請穿著已適應的健走鞋或慢跑鞋，切勿穿新鞋。建議多帶幾雙厚襪子替換，預防起水泡。" },
          { icon: <Backpack />, title: "輕量化背包", desc: "行李越輕越好，只帶必需品。建議準備背包防雨罩，以應對突如其來的天氣變化。" },
          { icon: <CheckCircle2 />, title: "洋蔥式穿搭", desc: "日夜溫差大，建議採洋蔥式穿搭。內層排汗、中層保暖、外層防風雨。必備輕便雨衣或雨具。" },
          { icon: <AlertTriangle />, title: "個人藥品與急救", desc: "必備水泡貼、透氣膠帶、肌肉痠痛藥膏及個人常備藥物。防曬乳與防蚊液也不可少。" }
        ]
      },
      etiquette: {
        title: "進香禮俗與禁忌",
        items: [
          { icon: <HeartHandshake />, title: "尊重儀式與秩序", desc: "聽從廟方與交通指揮人員的指示。切勿隨意穿越神轎隊伍（闖陣），保持虔誠與禮貌。" },
          { icon: <AlertTriangle />, title: "傳統禁忌", desc: "傳統習俗上，守喪期間（通常為一年內）或女性生理期間，建議在旁雙手合十參拜即可，避免觸碰神轎或參與核心儀式。" },
          { icon: <CheckCircle2 />, title: "茹素淨身", desc: "許多香客會在進香前及進香期間（或至少到祝壽大典前）茹素，以示對神明的敬意與身心清淨。" },
          { icon: <Info />, title: "香旗與進香", desc: "若有請進香旗，請妥善保管，不可帶進廁所。沿途參拜時，可跟隨大眾一同上香祈福。" }
        ]
      },
      logistics: {
        title: "食宿、交通與安全",
        items: [
          { icon: <Utensils />, title: "沿途福食", desc: "熱情的信眾會在沿途提供免費的餐飲（福食）。請抱持感恩的心，吃多少拿多少，切勿浪費，並協助做好垃圾分類。" },
          { icon: <Tent />, title: "住宿與休息", desc: "沿途廟宇多會提供香客大樓或空地供休息。建議自備睡墊與輕便睡袋。若需住旅館，務必提早數月預訂。" },
          { icon: <Bus />, title: "交通接駁", desc: "進香量力而為，不一定要全程徒步。走累了可以搭乘沿途的香客服務車，或利用大眾運輸工具前往下一站。" },
          { icon: <ShieldAlert />, title: "安全第一", desc: "隨時補充水分，注意防曬與保暖。人潮擁擠時請保管好貴重物品。若身體不適，請立即向醫療團隊求助。" }
        ]
      }
    }
  }
};

export default function GeneralTipsModal({ isOpen, onClose }: Props) {
  const { lang } = useLanguage();
  const content = t[lang];
  const [activeTab, setActiveTab] = useState<'essentials' | 'etiquette' | 'logistics'>('essentials');

  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'essentials', label: content.tabs.essentials, icon: <Backpack size={18} /> },
    { id: 'etiquette', label: content.tabs.etiquette, icon: <HeartHandshake size={18} /> },
    { id: 'logistics', label: content.tabs.logistics, icon: <Bus size={18} /> }
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-stone-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-amber-700 text-stone-50 p-6 sm:p-8 shrink-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-stone-950/20 hover:bg-stone-950/40 rounded-full transition-colors z-10"
              >
                <X size={24} />
              </button>
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-2">{content.title}</h2>
                <p className="text-amber-100/90 text-lg max-w-2xl">{content.subtitle}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-stone-200 bg-white shrink-0 hide-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium text-sm sm:text-base whitespace-nowrap transition-colors relative ${
                    activeTab === tab.id ? 'text-amber-700' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-stone-50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                        {tabs.find(t => t.id === activeTab)?.icon}
                      </span>
                      {content.sections[activeTab].title}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {content.sections[activeTab].items.map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-4">
                            <div className="text-amber-600 bg-amber-50 p-3 rounded-xl shrink-0">
                              {item.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-stone-800 text-lg mb-2">{item.title}</h4>
                              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Footer */}
            <div className="bg-white p-4 sm:p-6 border-t border-stone-200 shrink-0 text-center">
              <p className="text-stone-500 text-sm">
                {lang === 'en' ? 'May Mazu bless your journey with peace and safety.' : '祈求媽祖保佑，進香平安順利。'}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
