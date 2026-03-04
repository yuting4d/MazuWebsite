import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Map as MapIcon, Calendar, BookOpen, Heart, Send, MapPin, Clock, AlertTriangle, Coffee, Bus, CheckCircle2, Navigation, Tent, Info, ArrowRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../LanguageContext';
import { t, itineraryData } from '../locales/dajia';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

const tabs = [
  { id: 'map', icon: MapIcon },
  { id: 'guide', icon: CheckCircle2 },
  { id: 'culture', icon: BookOpen },
  { id: 'wishes', icon: Heart }
];

const normalIcon = L.divIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="width: 16px; height: 16px; background-color: #ca6702; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const activeIcon = L.divIcon({
  className: 'custom-leaflet-marker-active',
  html: `<div style="width: 24px; height: 24px; background-color: #9b2226; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.5); position: relative;">
           <div style="position: absolute; inset: -4px; border-radius: 50%; border: 2px solid #9b2226; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; opacity: 0.5;"></div>
         </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 11, { duration: 1.5 });
  }, [center, map]);
  return null;
}

export default function DajiaPilgrimageModal({ isOpen, onClose, initialTab = 'map' }: Props) {
  const { lang } = useLanguage();
  const content = t[lang];
  const itinerary = itineraryData[lang];

  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeLoc, setActiveLoc] = useState(0);
  const [newWish, setNewWish] = useState("");
  const [wishes, setWishes] = useState(content.wishes.initialWishes.map((w, i) => ({ id: i + 1, ...w })));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveTab(initialTab);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, initialTab]);

  useEffect(() => {
    setWishes(content.wishes.initialWishes.map((w, i) => ({ id: i + 1, ...w })));
  }, [lang, content.wishes.initialWishes]);

  if (!isOpen) return null;

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.trim()) return;
    setWishes([{ id: Date.now(), text: newWish, name: content.wishes.anonymous }, ...wishes]);
    setNewWish("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 z-50 bg-[#fcfbf8] overflow-y-auto custom-scrollbar"
        >
          {/* Close Button - Fixed */}
          <button 
            onClick={onClose}
            className="fixed top-6 right-6 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-3 rounded-full transition-colors z-[60]"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="relative h-64 md:h-80 shrink-0">
            <img 
              src="https://www.welcometw.com/wp-content/uploads/2026/02/1_608018188_18414065173190704_6432066409440275631_n-943x630.jpg" 
              alt="Dajia Pilgrimage" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 md:left-12">
              <span className="bg-mazu-red text-white px-3 py-1 rounded-full text-sm font-bold tracking-widest mb-3 inline-block">
                ROUTE 1
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white font-bold">{content.title}</h2>
              <p className="text-white/80 mt-2 font-sans">{content.subtitle}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="flex max-w-6xl mx-auto px-4 md:px-12 overflow-x-auto custom-scrollbar">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-6 font-serif text-lg whitespace-nowrap transition-colors relative ${isActive ? 'text-mazu-red' : 'text-gray-500 hover:text-gray-800'}`}
                  >
                    <Icon size={20} />
                    {content.tabs[tab.id as keyof typeof content.tabs]}
                    {isActive && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-mazu-red" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-[#fcfbf8] p-4 md:p-12 pb-24">
            <div className="max-w-6xl mx-auto">
              
              {/* Tab 1: Map & Itinerary */}
              {activeTab === 'map' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col lg:flex-row gap-8">
                  {/* Simulated Map */}
                  <div className="flex-1 bg-blue-50 rounded-3xl border border-blue-100 overflow-hidden relative min-h-[400px] lg:min-h-[600px] lg:sticky lg:top-24 z-10">
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-md flex items-center gap-2 text-sm font-bold text-mazu-blue z-[1000]">
                      <Navigation size={16} className="animate-pulse" />
                      {content.map.gps}
                    </div>
                    <MapContainer 
                      center={itinerary[activeLoc].coords} 
                      zoom={11} 
                      scrollWheelZoom={false} 
                      className="w-full h-full absolute inset-0 z-0"
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Polyline 
                        positions={itinerary.map(i => i.coords)} 
                        color="var(--color-mazu-red)" 
                        weight={3} 
                        opacity={0.5} 
                        dashArray="10, 10" 
                      />
                      {itinerary.map((loc, idx) => (
                        <Marker 
                          key={idx} 
                          position={loc.coords} 
                          icon={activeLoc === idx ? activeIcon : normalIcon}
                          eventHandlers={{
                            click: () => setActiveLoc(idx),
                          }}
                        >
                          <Popup>
                            <div className="font-sans">
                              <strong className="text-mazu-red">{loc.name}</strong><br />
                              {loc.day} - {loc.action}
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                      <MapUpdater center={itinerary[activeLoc].coords} />
                    </MapContainer>
                  </div>
                  {/* Itinerary */}
                  <div className="w-full lg:w-1/3 space-y-6">
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
                      <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                        <Info size={18} />
                        {content.map.disclaimerTitle}
                      </h4>
                      <p className="text-sm text-amber-800 leading-relaxed">
                        {content.map.disclaimerText}
                      </p>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-mazu-dark mb-6">{content.map.interactiveItinerary}</h3>
                    <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
                      {itinerary.map((item, idx) => {
                        const isActive = activeLoc === idx;
                        return (
                          <div 
                            key={item.id} 
                            className={`relative pl-8 cursor-pointer group ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                            onClick={() => setActiveLoc(idx)}
                          >
                            <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 transition-colors ${isActive ? 'bg-mazu-red border-mazu-red' : 'bg-white border-gray-300 group-hover:border-mazu-red'}`} />
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-sm font-bold text-mazu-red bg-mazu-red/10 px-2 py-1 rounded">{item.day}</span>
                              <span className="text-sm font-sans text-gray-500 flex items-center gap-1"><Calendar size={14}/> {item.date}</span>
                              <span className="text-sm font-sans text-gray-500 flex items-center gap-1"><Clock size={14}/> {item.time}</span>
                            </div>
                            <h4 className="text-xl font-serif font-bold text-gray-900 mb-1">{item.name} <span className="text-base font-normal text-gray-500 ml-2">{item.action}</span></h4>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Guide */}
              {activeTab === 'guide' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <h3 className="text-3xl font-serif font-bold text-mazu-dark mb-4">{content.guide.title}</h3>
                    <p className="text-gray-600">{content.guide.desc}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Equipment */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                      <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={24} />
                      </div>
                      <h4 className="text-xl font-serif font-bold mb-4">{content.guide.equipment}</h4>
                      <ul className="space-y-3 text-gray-600">
                        {content.guide.equipmentList.map((item, idx) => {
                          const [title, desc] = item.text.split('：');
                          return (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-mazu-red mt-1">•</span> 
                              <span><strong>{title}{desc ? '：' : ''}</strong>{desc}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    {/* Taboos */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                      <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6">
                        <AlertTriangle size={24} />
                      </div>
                      <h4 className="text-xl font-serif font-bold mb-4">{content.guide.taboos}</h4>
                      <ul className="space-y-3 text-gray-600">
                        {content.guide.taboosList.map((item, idx) => {
                          const [title, desc] = item.text.split('：');
                          return (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-mazu-red mt-1">•</span> 
                              <span><strong>{title}{desc ? '：' : ''}</strong>{desc}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* Logistics */}
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                      <MapPin size={24} />
                    </div>
                    <h4 className="text-xl font-serif font-bold mb-4">{content.guide.logistics}</h4>
                    
                    <div className="space-y-8">
                      <div>
                        <h5 className="font-bold text-lg mb-3 text-blue-900 font-serif">{content.guide.howToGetThere}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-6 rounded-2xl">
                            <h6 className="font-bold mb-4 flex items-center gap-2 text-lg"><Bus size={20} /> {content.guide.publicTransport}</h6>
                            <ul className="space-y-3 text-gray-600 font-sans">
                              {content.guide.publicTransportList.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <span>{item}</span></li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-gray-50 p-6 rounded-2xl">
                            <h6 className="font-bold mb-4 flex items-center gap-2 text-lg"><Navigation size={20} /> {content.guide.driving}</h6>
                            <ul className="space-y-3 text-gray-600 font-sans">
                              {content.guide.drivingList.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <span>{item}</span></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-bold text-lg mb-3 text-blue-900 font-serif">{content.guide.accommodation}</h5>
                        <div className="overflow-x-auto custom-scrollbar mb-6">
                          <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                              <tr className="bg-blue-50 text-blue-900 font-sans">
                                <th className="p-4 rounded-tl-xl font-bold">{content.guide.accTable.type}</th>
                                <th className="p-4 font-bold">{content.guide.accTable.desc}</th>
                                <th className="p-4 font-bold">{content.guide.accTable.cost}</th>
                                <th className="p-4 rounded-tr-xl font-bold">{content.guide.accTable.note}</th>
                              </tr>
                            </thead>
                            <tbody className="text-gray-600 font-sans">
                              {content.guide.accTable.rows.map((row, idx) => (
                                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                  <td className="p-4 font-bold text-blue-600">{row.type}</td>
                                  <td className="p-4">{row.desc}</td>
                                  <td className="p-4">{row.cost}</td>
                                  <td className="p-4">{row.note}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="bg-blue-50 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                          <div>
                            <h6 className="font-bold text-blue-900 mb-3 font-serif text-lg">{content.guide.accAdvice}</h6>
                            <ul className="space-y-2 text-blue-800 font-sans">
                              {content.guide.accAdviceList.map((item, idx) => {
                                const [title, desc] = item.text.split('：');
                                return (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span> 
                                    <span><strong>{title}{desc ? '：' : ''}</strong>{desc}</span>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                          <a 
                            href="https://taiwanstay.net.tw/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="shrink-0 bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
                          >
                            {content.guide.searchHotel} <ArrowRight size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* How to participate */}
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h4 className="text-2xl font-serif font-bold mb-4 text-mazu-dark">{content.guide.participation}</h4>
                    <p className="text-gray-600 mb-6 font-sans">{content.guide.participationDesc}</p>
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="bg-gray-50 text-gray-700 font-sans">
                            <th className="p-4 rounded-tl-xl font-bold">{content.guide.partTable.method}</th>
                            <th className="p-4 font-bold">{content.guide.partTable.cost}</th>
                            <th className="p-4 font-bold">{content.guide.partTable.desc}</th>
                            <th className="p-4 rounded-tr-xl font-bold">{content.guide.partTable.target}</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 font-sans">
                          {content.guide.partTable.rows.map((row, idx) => (
                            <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                              <td className="p-4 font-bold text-mazu-red">{row.method}</td>
                              <td className="p-4">{row.cost}</td>
                              <td className="p-4">{row.desc}</td>
                              <td className="p-4">{row.target}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Incense Flag */}
                  <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
                    <h4 className="text-2xl font-serif font-bold mb-4 text-amber-900 flex items-center gap-3">
                      {content.guide.flag}
                    </h4>
                    <p className="text-amber-800 mb-8 font-sans">{content.guide.flagDesc}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white/60 p-6 rounded-2xl">
                        <h5 className="font-bold text-lg mb-4 text-amber-900 font-serif">{content.guide.flagProcess}</h5>
                        <ol className="list-decimal list-inside space-y-3 text-amber-800 font-sans">
                          {content.guide.flagProcessList.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ol>
                      </div>
                      <div className="bg-white/60 p-6 rounded-2xl">
                        <h5 className="font-bold text-lg mb-4 text-amber-900 font-serif">{content.guide.flagNotes}</h5>
                        <ul className="space-y-3 text-amber-800 font-sans">
                          {content.guide.flagNotesList.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2"><span className="text-mazu-red mt-1">⚠️</span> <span>{item}</span></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Culture */}
              {activeTab === 'culture' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
                  {/* Faces */}
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-mazu-dark mb-8 flex items-center gap-3">
                      <Heart className="text-mazu-red" /> {content.culture.stories}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col gap-4">
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100">
                          <iframe 
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/mMZjjZIdkRg" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div>
                          <h4 className="text-xl font-serif font-bold mb-2">{content.culture.story1.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">{content.culture.story1.desc}</p>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col gap-4">
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100">
                          <iframe 
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/_GNMRGRFArA" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div>
                          <h4 className="text-xl font-serif font-bold mb-2">{content.culture.story2.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">{content.culture.story2.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Encyclopedia */}
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-mazu-dark mb-8 flex items-center gap-3">
                      <BookOpen className="text-mazu-blue" /> {content.culture.encyclopedia}
                    </h3>
                    <div className="space-y-8">
                      {/* 報馬仔 & 哨角隊 (Grid) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100">
                          <div className="text-4xl mb-4">{content.culture.encyclopediaList[0].icon}</div>
                          <h4 className="text-xl font-serif font-bold mb-2 text-rose-900">{content.culture.encyclopediaList[0].title}</h4>
                          <p className="text-gray-700 leading-relaxed font-sans">{content.culture.encyclopediaList[0].desc}</p>
                        </div>
                        <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200">
                          <div className="text-4xl mb-4">{content.culture.encyclopediaList[1].icon}</div>
                          <h4 className="text-xl font-serif font-bold mb-2 text-stone-900">{content.culture.encyclopediaList[1].title}</h4>
                          <p className="text-gray-700 leading-relaxed font-sans">{content.culture.encyclopediaList[1].desc}</p>
                        </div>
                      </div>

                      {/* 鑽轎腳 (Full width card with lists) */}
                      <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-4xl">🙇‍♂️</div>
                          <h4 className="text-2xl font-serif font-bold text-amber-900">{content.culture.crawling.title}</h4>
                        </div>
                        <p className="text-gray-700 mb-6 leading-relaxed font-sans">{content.culture.crawling.desc}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="bg-white/60 p-6 rounded-2xl">
                            <h5 className="font-bold text-lg mb-3 text-amber-900 font-serif">✅ {content.culture.crawling.correct}</h5>
                            <ul className="space-y-2 text-gray-700 font-sans">
                              {content.culture.crawling.correctList.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2"><span className="text-mazu-red mt-1">•</span> <span>{item}</span></li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-white/60 p-6 rounded-2xl">
                            <h5 className="font-bold text-lg mb-3 text-amber-900 font-serif">⚠️ {content.culture.crawling.taboos}</h5>
                            <ul className="space-y-2 text-gray-700 font-sans">
                              {content.culture.crawling.taboosList.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2"><span className="text-mazu-red mt-1">•</span> <span>{item}</span></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* 點心站 & 起駕宴 (Grid) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                          <div className="text-4xl mb-4">🍜</div>
                          <h4 className="text-xl font-serif font-bold mb-2 text-blue-900">{content.culture.food.title}</h4>
                          <p className="text-gray-700 mb-4 leading-relaxed font-sans">{content.culture.food.desc}</p>
                          <div className="bg-white/60 p-4 rounded-xl">
                            <h5 className="font-bold text-blue-900 mb-2 font-serif">{content.culture.food.etiquette}</h5>
                            <ul className="space-y-1 text-sm text-gray-700 font-sans">
                              {content.culture.food.etiquetteList.map((item, idx) => (
                                <li key={idx}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="bg-purple-50 p-8 rounded-3xl border border-purple-100">
                          <div className="text-4xl mb-4">🏮</div>
                          <h4 className="text-xl font-serif font-bold mb-2 text-purple-900">{content.culture.banquet.title}</h4>
                          <div className="space-y-4 mt-4">
                            {content.culture.banquet.events.map((event, idx) => (
                              <div key={idx} className="bg-white/60 p-4 rounded-xl">
                                <h5 className="font-bold text-purple-900 mb-1 font-serif">{event.name}</h5>
                                <p className="text-sm text-gray-700 font-sans">{event.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 4: Wishes */}
              {activeTab === 'wishes' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-serif font-bold text-mazu-dark mb-4">{content.wishes.title}</h3>
                    <p className="text-gray-600">{content.wishes.desc}</p>
                  </div>

                  <form onSubmit={handleWishSubmit} className="bg-white p-6 rounded-3xl shadow-md flex gap-4 mb-12">
                    <input 
                      type="text" 
                      value={newWish}
                      onChange={e => setNewWish(e.target.value)}
                      placeholder={content.wishes.placeholder} 
                      className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-mazu-red outline-none"
                    />
                    <button type="submit" className="bg-mazu-red text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-800 transition-colors flex items-center gap-2 shrink-0">
                      <Send size={18} /> {content.wishes.submit}
                    </button>
                  </form>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {wishes.map((wish, idx) => (
                        <motion.div
                          key={wish.id}
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-gradient-to-br from-amber-100 to-orange-50 p-6 rounded-2xl shadow-sm relative overflow-hidden group"
                        >
                          <div className="absolute -right-4 -top-4 text-amber-200 opacity-50 group-hover:scale-110 transition-transform">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 8H9L12 2Z"/><path d="M12 22L9 16H15L12 22Z"/><path d="M2 12L8 9V15L2 12Z"/><path d="M22 12L16 15V9L22 12Z"/></svg>
                          </div>
                          <p className="text-lg font-serif text-gray-800 mb-4 relative z-10">"{wish.text}"</p>
                          <p className="text-sm text-gray-500 text-right relative z-10">— {wish.name}</p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
