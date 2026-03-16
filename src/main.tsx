import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import CulturalStories from './pages/CulturalStories.tsx';
import { LanguageProvider } from './LanguageContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cultural-stories" element={<CulturalStories />} />
        </Routes>
      </HashRouter>
    </LanguageProvider>
  </StrictMode>
);
