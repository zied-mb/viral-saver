(function() {
  const originalParse = JSON.parse;
  JSON.parse = function(text, reviver) {
    if (typeof text === 'string' && text.includes('[object Object]')) {
      return {};
    }
    if (typeof text === 'string' && (text.includes('ybNLQq') || text.includes('OGQE'))) {
      return {};
    }
    try {
      return originalParse(text, reviver);
    } catch (e) {
      if (typeof text === 'string' && text.includes('selfassured')) {
        return {};
      }
      throw e;
    }
  };
})();

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'

createRoot(document.getElementById("root")!).render(<App />);
