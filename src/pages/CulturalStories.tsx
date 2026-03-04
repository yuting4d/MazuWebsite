import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { ArrowLeft, PlayCircle, MapPin, Users, Footprints, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CulturalStories() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = {
    en: {
      back: "Back to Home",
      heroTitle: "A Living Maritime Belief",
      heroSubtitle: "From sea-crossing legends to modern pilgrimages, faith leaves its footprints on the land.",
      historyTitle: "History & Sea Crossing",
      historyContent1: "The Mazu belief originated in Fujian and was brought to Taiwan by early immigrants. As a goddess of the sea, she provided spiritual comfort and protection to those braving the treacherous Taiwan Strait.",
      historyContent2: "During the era of migration, Mazu was not just a deity, but an anchor for the soul. Temples were built wherever people settled, marking the beginning of a profound connection between the goddess and the new land.",
      pilgrimageTitle: "The Formation of Pilgrimage Culture",
      pilgrimageContent1: "As settlements grew into villages and towns, the Mazu belief evolved from individual prayers for safe passage to collective community rituals. The 'Zhuangtou' (village) community became the core unit of this faith.",
      pilgrimageContent2: "The act of 'walking' (pilgrimage) is crucial. It's a physical manifestation of devotion, a way to retrace the steps of ancestors, and a powerful mechanism for forging local identity and solidarity among different communities.",
      scaleTitle: "The Scale of Modern Pilgrimages",
      scaleContent: "Today, Mazu pilgrimages in Taiwan are monumental events, recognized globally for their scale and fervor.",
      scaleStat1: "Over 1 Million",
      scaleStat1Desc: "Annual Participants",
      scaleStat2: "300+ km",
      scaleStat2Desc: "Walking Distance",
      scaleStat3: "Multi-County",
      scaleStat3Desc: "Spanning across central Taiwan",
      videoTitle: "Witness How Faith Walks",
      videoDesc: "Through aerial perspectives, overlook the magnificent scene of hundreds of thousands of people walking together from high above, and feel how faith flows across the land.",
      video1Title: "[Lao Wang Says] Why Pilgrimage? Two Supernatural Stories Related to Mazu",
      video2Title: "Taiwan's Mazu Pilgrimage Becomes One of the 'World's Three Major Religious Events'!? What's the Difference Between Dajia Mazu and Baishatun Mazu? | Shasha77",
      aerialTitle: "Dajia Mazu Pilgrimage Aerial Perspectives",
    },
    zh: {
      back: "返回首頁",
      heroTitle: "跨越海洋的守護",
      heroSubtitle: "從渡海傳說到萬人徒步，信仰在土地上留下足跡。",
      historyTitle: "歷史與渡海",
      historyContent1: "媽祖信仰發源於福建，隨著早期移民的腳步來到台灣。作為海神，她為那些勇敢橫渡險惡黑水溝的先民提供了精神上的撫慰與庇護。",
      historyContent2: "在那個充滿未知的移民時期，媽祖不僅是神明，更是心靈的錨。人們落腳何處，便在那裡建廟，開啟了女神與這片新土地的深厚連結。",
      pilgrimageTitle: "為何會形成繞境文化",
      pilgrimageContent1: "隨著聚落發展成庄頭與城鎮，媽祖信仰從個人祈求航海平安，演變為集體的社區儀式。「庄頭」社群成為了這股信仰力量的核心單元。",
      pilgrimageContent2: "「徒步」這個行為至關重要。它是虔誠的身體實踐，是重溫先民足跡的方式，更是凝聚地方認同、連結不同社群的強大機制。",
      scaleTitle: "現代繞境的文化規模",
      scaleContent: "今日，台灣的媽祖繞境已是規模宏大的盛事，其熱情與參與度受到全球矚目。",
      scaleStat1: "超過百萬人次",
      scaleStat1Desc: "每年參與人數",
      scaleStat2: "300 公里以上",
      scaleStat2Desc: "徒步路線距離",
      scaleStat3: "跨越數個縣市",
      scaleStat3Desc: "連結中台灣廣大區域",
      videoTitle: "看見信仰如何行走",
      videoDesc: "透過空拍視角，從高空俯瞰數十萬人同行的壯闊場景，感受信仰如何在土地上流動。",
      video1Title: "【老王說】為什麼要遶境-進香？ 跟媽祖有關的 兩則靈異故事",
      video2Title: "台灣媽祖遶境進香成為「世界三大宗教活動」！？大甲媽祖跟白沙屯媽祖，有什麼不同？｜志祺七七",
      aerialTitle: "大甲媽祖繞境 空拍視角",
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf8] font-sans selection:bg-mazu-red selection:text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => navigate('/')}
          className="pointer-events-auto flex items-center gap-2 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-black/60 transition-colors border border-white/20 shadow-lg"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">{t[lang].back}</span>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <iframe 
            className="w-full h-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src="https://www.youtube.com/embed/DNVYzEA5dQk?autoplay=1&mute=1&controls=0&loop=1&playlist=DNVYzEA5dQk&start=5"
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#fcfbf8]" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight drop-shadow-2xl">
                {t[lang].heroTitle}
              </h1>
              <p className="text-xl md:text-2xl font-serif italic text-mazu-sand drop-shadow-md">
                {t[lang].heroSubtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-5xl mx-auto px-4 py-24 space-y-32">
        
        {/* Section 1: History */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-mazu-dark mb-6 relative inline-block">
              {t[lang].historyTitle}
              <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-mazu-red" />
            </h2>
            <div className="space-y-6 text-lg text-gray-700 font-serif leading-relaxed">
              <p>{t[lang].historyContent1}</p>
              <p>{t[lang].historyContent2}</p>
            </div>
          </motion.div>
          <motion.div 
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://cdn-smiletaiwan.cw.com.tw/ckeditor/202009/ckeditor-5f4dad4939f34.jpg" 
              alt="Old Map / History" 
              className="w-full h-full object-cover sepia-[.3]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-4 border-white/20 rounded-2xl mix-blend-overlay"></div>
          </motion.div>
        </section>

        {/* Section 2: Pilgrimage Culture */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl md:order-1 order-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://resize-image.vocus.cc/resize?norotation=true&quality=80&url=https%3A%2F%2Fimages.vocus.cc%2Fc5922b8a-f9e0-4c0a-9458-9a51431ce098.jpg&width=740&sign=bJycgZyP-36hdd3ZMaTIVnPmN3dDQvx5awoGZd7SJ7I" 
              alt="Community / Walking" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-mazu-red/10 mix-blend-multiply"></div>
          </motion.div>
          <motion.div 
            className="md:order-2 order-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-mazu-dark mb-6 relative inline-block">
              {t[lang].pilgrimageTitle}
              <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-mazu-red" />
            </h2>
            <div className="space-y-6 text-lg text-gray-700 font-serif leading-relaxed">
              <p>{t[lang].pilgrimageContent1}</p>
              <p>{t[lang].pilgrimageContent2}</p>
            </div>
          </motion.div>
        </section>

        {/* Section 3: Scale */}
        <section className="bg-white rounded-3xl p-10 md:p-16 shadow-xl border border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-mazu-dark mb-6">{t[lang].scaleTitle}</h2>
            <p className="text-xl text-gray-600 font-serif max-w-2xl mx-auto">{t[lang].scaleContent}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#fcfbf8] border border-gray-100"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-mazu-red/10 rounded-full flex items-center justify-center mb-6 text-mazu-red">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold font-sans text-mazu-dark mb-2">{t[lang].scaleStat1}</h3>
              <p className="text-gray-500 font-serif">{t[lang].scaleStat1Desc}</p>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#fcfbf8] border border-gray-100"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-mazu-red/10 rounded-full flex items-center justify-center mb-6 text-mazu-red">
                <Footprints size={32} />
              </div>
              <h3 className="text-2xl font-bold font-sans text-mazu-dark mb-2">{t[lang].scaleStat2}</h3>
              <p className="text-gray-500 font-serif">{t[lang].scaleStat2Desc}</p>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#fcfbf8] border border-gray-100"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-mazu-red/10 rounded-full flex items-center justify-center mb-6 text-mazu-red">
                <Navigation size={32} />
              </div>
              <h3 className="text-2xl font-bold font-sans text-mazu-dark mb-2">{t[lang].scaleStat3}</h3>
              <p className="text-gray-500 font-serif">{t[lang].scaleStat3Desc}</p>
            </motion.div>
          </div>
        </section>

        {/* Section 5: Video Gallery */}
        <section className="pt-12 border-t border-gray-200">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-mazu-dark mb-4">{t[lang].videoTitle}</h2>
            <p className="text-lg text-gray-600 font-serif max-w-3xl mx-auto leading-relaxed">
              {t[lang].videoDesc}
            </p>
          </motion.div>

          {/* Featured Explainer Videos */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg bg-black">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/93lOD1M5RjY" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <h4 className="font-sans font-medium text-gray-800 line-clamp-2">
                {t[lang].video1Title}
              </h4>
            </div>
            <div className="space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg bg-black">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/2CSmJ0QDHvk" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <h4 className="font-sans font-medium text-gray-800 line-clamp-2">
                {t[lang].video2Title}
              </h4>
            </div>
          </div>

          {/* Aerial Footage Grid */}
          <h3 className="text-2xl font-serif text-mazu-dark mb-8 text-center">{t[lang].aerialTitle}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Cq2fza-k8Fg",
              "ZO20FzU7WcA",
              "UMRMYrb3y64",
              "I5k37dPdv8o"
            ].map((videoId, idx) => (
              <div key={idx} className="aspect-video rounded-xl overflow-hidden shadow-md bg-black group relative cursor-pointer">
                <iframe 
                  className="w-full h-full pointer-events-none"
                  src={`https://www.youtube.com/embed/${videoId}?controls=0`}
                  title={`Aerial footage ${idx + 1}`}
                  frameBorder="0" 
                ></iframe>
                <a 
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center"
                >
                  <PlayCircle className="text-white w-12 h-12 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </a>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
