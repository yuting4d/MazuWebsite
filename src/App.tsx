/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Compass, Anchor, Info, ArrowRight, Footprints, HeartHandshake, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TaiwanMap from './components/TaiwanMap';
import DajiaPilgrimageModal from './components/DajiaPilgrimageModal';
import GeneralTipsModal from './components/GeneralTipsModal';
import { useLanguage, Language } from './LanguageContext';

function Header() {
  const { lang, setLang } = useLanguage();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-end pointer-events-none">
      <div className="bg-black/40 backdrop-blur-md rounded-full p-1 flex gap-1 border border-white/20 pointer-events-auto shadow-lg">
        <button 
          onClick={() => setLang('en')}
          className={`px-4 py-1.5 rounded-full text-sm font-sans transition-all duration-300 ${lang === 'en' ? 'bg-white text-black shadow-sm' : 'text-white hover:bg-white/20'}`}
        >
          EN
        </button>
        <button 
          onClick={() => setLang('zh')}
          className={`px-4 py-1.5 rounded-full text-sm font-sans transition-all duration-300 ${lang === 'zh' ? 'bg-white text-black shadow-sm' : 'text-white hover:bg-white/20'}`}
        >
          中文
        </button>
      </div>
    </header>
  )
}

function Hero() {
  const { lang } = useLanguage();
  
  const t = {
    en: {
      title: "Mazu Belief Across Taiwan",
      subtitle: "A Spiritual Journey Through Islands, Cities, and Seas",
      intro: "From bustling cities to remote islands, Mazu belief shapes Taiwan’s cultural landscape.\nEach temple tells a story of migration, protection, and faith by the sea.",
      btn1: "Explore Mazu Routes",
      btn2: "Plan Your Cultural Journey"
    },
    zh: {
      title: "走進台灣媽祖信仰",
      subtitle: "一場橫跨海洋、城市與人心的文化旅程",
      intro: "從繁華城市到偏遠離島，媽祖信仰形塑了台灣的文化風景。\n每一座廟宇都訴說著移民、庇護與海洋信仰的故事。",
      btn1: "探索媽祖路線",
      btn2: "規劃文化之旅"
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black">
        <img 
          src="https://media.artogo.tw/exhibition/29910832f32e/creation_photo_aa298a8b827f_458f3c8c0f5d_3240x2160.jpeg" 
          alt="Taiwan Temple" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto mt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tight drop-shadow-lg">
              {t[lang].title}
            </h1>
            <p className="text-xl md:text-2xl font-serif italic mb-12 text-mazu-sand drop-shadow-md">
              {t[lang].subtitle}
            </p>
            
            <p className="mx-auto text-base md:text-lg font-sans font-light opacity-90 mb-12 leading-relaxed drop-shadow max-w-3xl whitespace-pre-line">
              {t[lang].intro}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-mazu-red text-white rounded-full font-sans tracking-wider hover:bg-red-800 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                {t[lang].btn1} <ArrowRight size={18} />
              </button>
              <button className="px-8 py-4 bg-black/30 backdrop-blur-sm border border-white/50 text-white rounded-full font-sans tracking-wider hover:bg-white/10 transition-colors w-full sm:w-auto shadow-lg">
                {t[lang].btn2}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function WhyMazu() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  
  const t = {
    en: {
      title: "Why Mazu Matters to Taiwan",
      content: (
        <>
          <p className="mb-6">
            Mazu is more than a religious belief; she is the cultural symbol of Taiwan's coexistence with the ocean. She has guarded sailors and accompanied immigrants crossing the sea, becoming a stabilizing force in people's hearts through countless storms and migrations.
          </p>
          <p className="mb-6">
            From ports to villages, from temple squares to alleys, Mazu connects the life memories of different generations and shapes Taiwan's unique faith landscape.
          </p>
          <p>
            When you truly understand Mazu's story, you will see why hundreds of thousands of people are willing to walk together every year. It's not just a ritual, but a cross-generational cultural experience.
          </p>
        </>
      ),
      ctaTitle: "Step into Mazu's Cultural Context",
      ctaDesc: "From sea-crossing legends to modern pilgrimages, explore how faith became the shared memory of Taiwan's land.",
      ctaBtn: "Explore Mazu's Cultural Stories",
      ctaSub: "Discover the cultural roots of Mazu belief in Taiwan",
      ctaBullets: [
        "Over a million participants annually",
        "Walking distance exceeding 300 kilometers",
        "Spanning multiple counties and cities, a globally recognized religious event"
      ]
    },
    zh: {
      title: "為什麼媽祖對台灣如此重要",
      content: (
        <>
          <p className="mb-6">
            媽祖不只是宗教信仰，更是台灣與海洋共生的文化象徵。她守護航海者、陪伴渡海移民，在一次次風浪與遷徙之中，成為人們心中的安定力量。
          </p>
          <p>
            當你真正理解媽祖的故事，就會明白，為何每年有數十萬人願意徒步同行。那不只是儀式，而是一場跨越世代的文化體驗。
          </p>
        </>
      ),
      ctaTitle: "走進媽祖的文化脈絡",
      ctaDesc: "從渡海傳說到現代繞境，探索信仰如何成為台灣土地的共同記憶。",
      ctaBtn: "探索媽祖文化故事",
      ctaSub: "Discover the cultural roots of Mazu belief in Taiwan",
      ctaBullets: [
        "每年參與人數超過百萬人次",
        "行走距離可達 300 公里以上",
        "橫跨數個縣市，成為全球矚目的信仰盛事"
      ]
    }
  };

  return (
    <section className="py-24 px-4 bg-[#fcfbf8]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={lang}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl md:text-5xl font-serif text-mazu-dark mb-8">{t[lang].title}</h2>
                <div className="w-16 h-1 bg-mazu-red mx-auto md:mx-0 mb-10" />
                
                <div className="text-lg md:text-xl font-serif text-gray-800 leading-relaxed max-w-3xl text-justify md:text-left mb-12">
                  {t[lang].content}
                </div>

                {/* CTA Section */}
                <div className="mt-12 pt-10 border-t border-gray-200">
                  <h3 className="text-2xl md:text-3xl font-serif text-mazu-dark mb-4">{t[lang].ctaTitle}</h3>
                  <p className="text-gray-600 mb-6 font-serif text-lg">{t[lang].ctaDesc}</p>
                  
                  <ul className="mb-8 space-y-3">
                    {t[lang].ctaBullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700 font-serif text-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-mazu-red/60" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="inline-flex flex-col items-center md:items-start group cursor-pointer" onClick={() => navigate('/cultural-stories')}>
                    <button className="relative overflow-hidden px-8 py-3 border border-mazu-red text-mazu-red font-serif tracking-widest transition-all duration-500 group-hover:bg-mazu-red group-hover:text-white flex items-center gap-3">
                      <span>{t[lang].ctaBtn}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </button>
                    <span className="mt-3 text-xs tracking-widest text-gray-400 uppercase font-sans">
                      {t[lang].ctaSub}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex-1 w-full max-w-[396px] mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://i1.kknews.cc/IVoYnXqGEAZ7qocbWZzceLX6EYaP-RhDrNpI888/0.jpg" 
              alt="Mazu Culture" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const regionsData = [
  {
    id: 'north',
    title: { en: 'North Taiwan', zh: '北台灣｜城市與河海信仰' },
    desc: { en: 'Urban development × River protection × Faith in modern life', zh: '城市發展 × 河海守護 × 現代生活中的信仰延續' },
    temples: [
      { 
        name: { en: 'Guandu Temple', zh: '關渡宮' }, 
        desc: { en: 'A riverside temple watching over northern Taiwan.', zh: '守護淡水河口三百餘年，見證城市與信仰共存。' },
        image: 'https://www.kuantu.org.tw/images/Puja/Puja_01_02.jpg'
      }
    ],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX8kbbuf5qoJ7F2WD4SlXWvNxkEf_Tnb5-GA&s'
  },
  {
    id: 'central',
    title: { en: 'Central Taiwan', zh: '中台灣｜遶境與信仰行腳' },
    desc: { en: 'Walking × Participation × Collective belief', zh: '行走 × 參與 × 集體信念' },
    temples: [
      { 
        name: { en: 'Dajia Jenn Lann Temple', zh: '大甲鎮瀾宮' }, 
        desc: { en: 'One of the world’s largest religious pilgrimages.', zh: '世界知名的媽祖遶境行腳，百萬人同行。' },
        image: 'https://www.twreporter.org/images/20230426140650-79677908f8a1a7e50479fa48d5459b87-mobile.jpg'
      },
      { 
        name: { en: 'Baishatun Gongtian Temple', zh: '白沙屯拱天宮' }, 
        desc: { en: 'A pilgrimage guided by faith, not maps.', zh: '沒有固定路線的遶境，只跟隨信仰前行。粉紅超跑是白沙屯媽祖的神轎外觀。' },
        image: 'https://bucket-image.inkmaginecms.com/version/hd/1/image/2025/05/6c4c1a49-64c1-4ca6-9cb4-e0bca96c7fd0.jpg'
      }
    ],
    image: 'https://i.marieclaire.com.tw/assets/mc/202502/67ADA396143FA1739432854.png'
  },
  {
    id: 'south',
    title: { en: 'South Taiwan', zh: '南台灣｜海洋、移民與開墾' },
    desc: { en: 'Ocean × Migration × Settlement history', zh: '海洋 × 移民 × 開墾歷史' },
    temples: [
      { 
        name: { en: 'Beigang Chaotian Temple', zh: '北港朝天宮' }, 
        desc: { en: 'The spiritual heart of Mazu belief.', zh: '台灣媽祖信仰的重要精神源頭。' },
        image: 'https://www.matsu.org.tw/upload_files/web/uploadfile/2024010916/original/240109160623618077.png'
      },
      { 
        name: { en: 'Luerhmen Tienhou Temple', zh: '鹿耳門天后宮' }, 
        desc: { en: 'Where belief meets Taiwan’s earliest settlement history.', zh: '連結台灣早期開墾與海上移民歷史。' },
        image: 'https://today-obs.line-scdn.net/0h-8JxN10Ychd3AWR0emENQE1XcXhEbWEUEzcjFDRvLCBbMDBASmU7IVRVLCBfNzVJGTM1clYFaSYPNDRCTWQ7/w280'
      },
      { 
        name: { en: 'Cijin Tianhou Temple', zh: '旗津天后宮' }, 
        desc: { en: 'A seaside guardian of fishermen and travelers.', zh: '漁港守護信仰，與海洋生活緊密相連。' },
        image: 'https://khh.travel/image/39606/1024x768'
      }
    ],
    image: 'https://blog.tripbaa.com/wp-content/uploads/2021/03/134219193_224658775852010_7761455563695185490_n.jpg'
  },
  {
    id: 'islands',
    title: { en: 'Offshore Islands', zh: '離島｜傳說與起源' },
    desc: { en: 'Origins × Legends × The root of ocean faith', zh: '起源 × 傳說 × 海洋信仰根本' },
    temples: [
      { 
        name: { en: 'Penghu Tianhou Temple', zh: '澎湖天后宮' }, 
        desc: { en: 'The oldest Mazu temple in Taiwan.', zh: '台灣歷史最悠久的媽祖廟。' },
        image: 'https://www.penghu-nsa.gov.tw/FileDownLoad/TravelInformation/NotSet/20230201090056059293.JPG'
      },
      { 
        name: { en: 'Matsu Tianhou Temple', zh: '馬祖天后宮' }, 
        desc: { en: 'The legendary birthplace of Mazu.', zh: '傳說中媽祖的誕生地，信仰起源之島。' },
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiYQINgAeIkCKwvhmI2IQUtjQm6akny6h7Hg&s'
      }
    ],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiYQINgAeIkCKwvhmI2IQUtjQm6akny6h7Hg&s'
  }
];

function Regions() {
  const { lang } = useLanguage();
  const [activeRegion, setActiveRegion] = useState(regionsData[0]);
  
  const t = {
    en: {
      title: "Explore Mazu Across Taiwan",
      intro: "From north to south, from the main island to offshore islands, every Mazu temple corresponds to a Taiwanese story."
    },
    zh: {
      title: "探索全台媽祖信仰",
      intro: "從北到南，從本島到離島，每一座媽祖廟，都對應一段台灣故事。"
    }
  };

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div 
            key={lang}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-mazu-dark mb-6">{t[lang].title}</h2>
            <p className="text-xl font-serif text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {t[lang].intro}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
          {/* Left: Map */}
          <div className="w-full lg:w-1/2 flex justify-center items-center order-1 relative min-h-[400px] lg:min-h-[600px] bg-gray-50/50 rounded-3xl border border-gray-100">
            <TaiwanMap activeRegionId={activeRegion.id} onRegionClick={(id) => setActiveRegion(regionsData.find(r => r.id === id)!)} />
          </div>

          {/* Right: Region List & Details */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 order-2">
            {/* Region List */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {regionsData.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${activeRegion.id === region.id ? 'bg-mazu-red text-white shadow-lg scale-[1.02]' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                  <h3 className="text-lg font-serif font-bold mb-1">{region.title[lang].split('｜')[0]}</h3>
                  <p className={`text-xs font-sans line-clamp-1 ${activeRegion.id === region.id ? 'text-white/80' : 'text-gray-500'}`}>{region.desc[lang]}</p>
                </button>
              ))}
            </div>

            {/* Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRegion.id + lang}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-[#fcfbf8] rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-lg flex-grow"
              >
                <div className="relative h-40 lg:h-48 rounded-xl overflow-hidden mb-6 shrink-0">
                  <img 
                    src={activeRegion.image} 
                    alt={activeRegion.title.en}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl lg:text-2xl font-serif text-white">{activeRegion.title[lang]}</h3>
                </div>

                <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar max-h-[400px] lg:max-h-[450px]">
                  {activeRegion.temples.map((temple, tidx) => (
                    <div key={tidx} className="flex gap-4 items-start border-l-2 border-mazu-red/30 pl-4">
                      {temple.image && (
                        <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-lg overflow-hidden">
                          <img src={temple.image} alt={temple.name.en} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <h4 className="text-lg lg:text-xl font-serif font-semibold text-mazu-dark">{temple.name[lang]}</h4>
                        <p className="text-gray-600 font-sans text-sm leading-relaxed">{temple.desc[lang]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

const routesData = [
  {
    id: 'route1',
    title: { en: 'Grand Pilgrimage', zh: '跟隨 大甲鎮瀾宮' },
    desc: { en: 'Experience Taiwan\'s most spectacular religious pilgrimage.', zh: '體驗台灣最震撼的信仰行腳盛事。' },
    icon: Navigation,
    color: 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100',
    image: 'https://www.welcometw.com/wp-content/uploads/2026/02/1_608018188_18414065173190704_6432066409440275631_n-943x630.jpg'
  },
  {
    id: 'route2',
    title: { en: 'Mysterious Faith', zh: '從 白沙屯拱天宮 出發' },
    desc: { en: 'A journey without a map, where every step is guided by belief.', zh: '沒有固定路線，每一步都是信念的選擇。' },
    icon: Compass,
    color: 'bg-rose-50 text-rose-900 border-rose-200 hover:bg-rose-100',
    image: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2025/05/06/realtime/31985160.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=930'
  },
  {
    id: 'route3',
    title: { en: 'Heritage & History', zh: '走訪 北港朝天宮、鹿耳門天后宮' },
    desc: { en: 'Explore how Mazu belief shaped Taiwan\'s history.', zh: '探索媽祖信仰與台灣歷史。' },
    icon: MapPin,
    color: 'bg-stone-50 text-stone-900 border-stone-200 hover:bg-stone-100',
    image: 'https://blog.tripbaa.com/wp-content/uploads/2021/03/134219193_224658775852010_7761455563695185490_n.jpg'
  },
  {
    id: 'route4',
    title: { en: 'Coastal Belief', zh: '沿著高雄、東部與離島海岸' },
    desc: { en: 'Feel the power that protects sailors along the coast.', zh: '感受守護漁民與航海者的海洋信仰。' },
    icon: Anchor,
    color: 'bg-cyan-50 text-cyan-900 border-cyan-200 hover:bg-cyan-100',
    image: 'https://khh.travel/image/39606/1024x768'
  }
];

function Routes({ onOpenModal }: { onOpenModal: (tab: string) => void }) {
  const { lang } = useLanguage();
  
  const t = {
    en: { title: "Choose Your Mazu Journey" },
    zh: { title: "選擇你的媽祖旅程" }
  };

  return (
    <section className="py-24 px-4 bg-[#fcfbf8]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={lang}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-4xl md:text-5xl font-serif text-mazu-dark mb-6"
            >
              {t[lang].title}
            </motion.h2>
          </AnimatePresence>
          <div className="w-16 h-1 bg-mazu-blue mx-auto md:mx-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routesData.map((route, idx) => {
            const Icon = route.icon;
            return (
              <motion.div
                key={route.id}
                onClick={() => {
                  if (route.id === 'route1') {
                    onOpenModal('map');
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-2xl border ${route.color} transition-all duration-300 cursor-pointer flex flex-col h-full group overflow-hidden`}
              >
                <div className="h-48 w-full relative overflow-hidden">
                  <img src={route.image} alt={route.title.en} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-4 left-4 bg-white/80 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Icon size={24} className="opacity-80" />
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <p className="font-sans text-xs tracking-widest uppercase mb-3 opacity-70">Route {idx + 1}</p>
                  <div className="mt-auto pt-6 border-t border-current/10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={lang}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <h3 className="text-2xl font-serif font-bold mb-4">{route.title[lang]}</h3>
                        <p className="text-sm font-sans opacity-80 leading-relaxed">{route.desc[lang]}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Tips() {
  const { lang } = useLanguage();
  
  const t = {
    en: { 
      title: "Essential Travel Tips",
      subtitle: "Prepare for your spiritual journey with these practical guidelines.",
    },
    zh: { 
      title: "行前準備與建議",
      subtitle: "為您的進香之旅做好準備，請參考以下實用建議。",
    }
  };

  const tipsData = [
    { 
      icon: <Footprints className="w-6 h-6" />,
      en: { title: "Comfortable Footwear", desc: "You will be walking long distances. Prioritize well-broken-in, comfortable shoes to prevent blisters." }, 
      zh: { title: "舒適的鞋履", desc: "進香需長時間步行，請務必穿著已適應且舒適的鞋款，避免起水泡。" } 
    },
    { 
      icon: <HeartHandshake className="w-6 h-6" />,
      en: { title: "Respect Local Customs", desc: "Observe and respect the traditional rituals. Follow the guidance of temple staff and elders." }, 
      zh: { title: "尊重在地文化", desc: "請尊重傳統儀式與在地習俗，並聽從廟方人員與長輩的指導。" } 
    },
    { 
      icon: <Leaf className="w-6 h-6" />,
      en: { title: "Eco-Friendly Practices", desc: "Bring your own reusable tableware and water bottle. Help keep the environment clean along the route." }, 
      zh: { title: "環保與永續", desc: "建議自備環保餐具與水壺，並協助維持沿途環境整潔，不亂丟垃圾。" } 
    },
    { 
      icon: <Compass className="w-6 h-6" />,
      en: { title: "Embrace the Pace", desc: "Don't rush. Take time to experience the warmth of the Taiwanese people and the deep spiritual atmosphere." }, 
      zh: { title: "放慢您的腳步", desc: "無需急躁，細細體會台灣濃厚的人情味與莊嚴的信仰氛圍。" } 
    }
  ];

  return (
    <section className="py-32 px-4 bg-stone-950 text-stone-200 relative overflow-hidden">
      {/* Subtle background pattern or gradient */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-700/20 via-stone-950 to-stone-950"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={`title-${lang}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif mb-6 text-amber-50"
            >
              {t[lang].title}
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${lang}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-stone-400 max-w-2xl mx-auto font-sans font-light"
            >
              {t[lang].subtitle}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {tipsData.map((tip, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 + 0.2 }}
              className="group bg-stone-900/50 border border-stone-800 hover:border-amber-900/50 p-8 md:p-10 rounded-3xl transition-all duration-500 hover:bg-stone-900"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="bg-stone-800 text-amber-400 p-4 rounded-2xl group-hover:scale-110 group-hover:bg-amber-900/30 transition-all duration-500 shrink-0">
                  {tip.icon}
                </div>
                <div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lang}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h3 className="text-xl font-serif font-medium text-stone-100 mb-3">{tip[lang].title}</h3>
                      <p className="text-stone-400 leading-relaxed font-sans font-light">{tip[lang].desc}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  const { lang } = useLanguage();
  
  const t = {
    en: {
      title: "More Than a Belief.\nA Way of Life.",
      content: "Mazu belief is not just a single place, but a cultural landscape spanning across Taiwan.",
      cta: "START YOUR MAZU JOURNEY IN TAIWAN"
    },
    zh: {
      title: "不只是信仰，\n更是生活方式。",
      content: "媽祖信仰不是單一地點，而是一張橫跨全台的文化風景。",
      cta: "展開你的台灣媽祖之旅"
    }
  };

  return (
    <section className="py-32 px-4 bg-mazu-red text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <img 
          src="https://images.unsplash.com/photo-1574236170882-b6bfb5774813?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Pattern"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight whitespace-pre-line">
              {t[lang].title}
            </h2>
            <p className="text-2xl md:text-3xl font-serif mb-16 text-mazu-sand">
              {t[lang].content}
            </p>
            <button className="px-12 py-6 bg-white text-mazu-red rounded-full font-sans font-bold tracking-widest hover:bg-mazu-sand transition-colors text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              {t[lang].cta}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Footer() {
  const { lang } = useLanguage();
  
  const t = {
    en: { rights: "All rights reserved.", privacy: "Privacy Policy", terms: "Terms of Service", contact: "Contact" },
    zh: { rights: "版權所有", privacy: "隱私權政策", terms: "服務條款", contact: "聯絡我們" }
  };

  return (
    <footer className="bg-[#050404] text-gray-500 py-12 text-center font-sans text-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Mazu Belief Across Taiwan. {t[lang].rights}</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">{t[lang].privacy}</a>
          <a href="#" className="hover:text-white transition-colors">{t[lang].terms}</a>
          <a href="#" className="hover:text-white transition-colors">{t[lang].contact}</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [isDajiaModalOpen, setIsDajiaModalOpen] = useState(false);
  const [dajiaModalTab, setDajiaModalTab] = useState('map');
  const [isGeneralTipsOpen, setIsGeneralTipsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcfbf8] font-sans selection:bg-mazu-red selection:text-white">
      <Header />
      <Hero />
      <WhyMazu />
      <Regions />
      <Routes onOpenModal={(tab) => {
        setDajiaModalTab(tab);
        setIsDajiaModalOpen(true);
      }} />
      <Tips />
      <Closing />
      <Footer />

      <DajiaPilgrimageModal 
        isOpen={isDajiaModalOpen} 
        onClose={() => setIsDajiaModalOpen(false)} 
        initialTab={dajiaModalTab}
      />

      <GeneralTipsModal 
        isOpen={isGeneralTipsOpen} 
        onClose={() => setIsGeneralTipsOpen(false)} 
      />

      {/* Floating Action Button */}
      <button
        onClick={() => setIsGeneralTipsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-mazu-red text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
      >
        <Info size={24} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[120px] transition-all duration-300 ease-in-out font-serif">
          行前懶人包
        </span>
      </button>
    </div>
  );
}
