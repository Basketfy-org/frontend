import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WalletProvider } from './src/hook/wallet.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WalletProvider autoConnect={true}>
    <App />
    </WalletProvider>

  </StrictMode>,
)
