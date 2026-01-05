import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('Main.tsx loaded');

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

console.log('Root element found, rendering App');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

console.log('App rendered');
