import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import CulturalStories from './pages/CulturalStories.tsx';
import { LanguageProvider } from './LanguageContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cultural-stories" element={<CulturalStories />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>
);
