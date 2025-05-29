import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WalletProvider } from './src/hook/wallet.jsx'
import { Toaster } from 'react-hot-toast';
import { Buffer } from 'buffer'
window.Buffer = Buffer
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WalletProvider autoConnect={true}>
        <Toaster position="top-right" />
    <App />
    </WalletProvider>

  </StrictMode>,
)
