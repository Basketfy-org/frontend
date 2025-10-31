

export const API_BASE_URL = import.meta.env.VITE_BASE_URL;
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const VAULT_CONTRACT_ID = import.meta.env.VITE_VAULT_CONTRACT_ID;
export const VITE_PROJECT_ID = import.meta.env.VITE_PROJECT_ID
export const MOCK_USDC_ADDRESS = import.meta.env.VITE_MOCK_USDC_ADDRESS
export const VITE_REOWN_PROJECT_ID = import.meta.env.VITE_REOWN_PROJECT_ID


import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { hederaTestnet } from '@reown/appkit/networks'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'


// Get projectId from https://dashboard.reown.com
export const projectId = VITE_REOWN_PROJECT_ID // this is a public projectId only to use on localhost

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const metadata = {
    name: 'Basketfy',
    description: 'Basketfy - Hedera Powered DEFI for Everyone',
    url: 'https://basketfy.netlify.app' || 'http://localhost:5173',
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}


export const networks = [hederaTestnet]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks
})

// Set up Solana Adapter
export const solanaWeb3JsAdapter = new SolanaAdapter()

export const config = wagmiAdapter.wagmiConfig