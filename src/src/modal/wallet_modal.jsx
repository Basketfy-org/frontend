
import React, { useState, useEffect } from 'react';
import {
  X,
  Loader2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

import { useWallet } from '../hook/wallet';



const WalletModal = ({ showWalletModal, setShowWalletModal, darkMode, setWalletConnected, }) => {
  const {
    connectWallet,
    disconnectWallet,
    connected,
    connecting,
    walletAddress,
    formatAddress,
  } = useWallet();

  const [error, setError] = useState('');

  const wallets = [
    { name: 'Phantom', icon: '👻', adapter: 'phantom' },
    { name: 'Solflare', icon: '☀️', adapter: 'solflare' },
    { name: 'Backpack', icon: '🎒', adapter: 'backpack' },
    { name: 'Coinbase Wallet', icon: '🔵', adapter: 'coinbase' }
  ];

  const handleConnect = async (walletType) => {
    setError('');
    const result = await connectWallet(walletType);

    if (result.success) {
     
      setShowWalletModal(false);
      setWalletConnected(true);
    } else {
      setError(result.error);
      setWalletConnected(false);
    }
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    setShowWalletModal(false);
    setWalletConnected(false);
  };

  if (!showWalletModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-sm w-full mx-4`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {connected ? 'Wallet Connected' : 'Connect Wallet'}
          </h3>
          <button
            onClick={() => setShowWalletModal(false)}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {connected ? (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'} border ${darkMode ? 'border-gray-600' : 'border-green-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-green-500" size={20} />
                <span className="font-medium text-green-700 dark:text-green-400">Connected</span>
              </div>
              <div className="text-sm opacity-75">
                Address: {formatAddress(walletAddress)}
              </div>
            </div>

            <button
              onClick={handleDisconnect}
              className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {error && (
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-red-900/50' : 'bg-red-50'} border ${darkMode ? 'border-red-800' : 'border-red-200'}`}>
                <div className="flex items-center gap-2">
                  <AlertCircle className="text-red-500" size={16} />
                  <span className="text-sm text-red-700 dark:text-red-400">{error}</span>
                </div>
              </div>
            )}

            {wallets.map((wallet) => (
              <button
                key={wallet.adapter}
                onClick={() => handleConnect(wallet.adapter)}
                disabled={connecting}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
                  } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="w-8 h-8 flex items-center justify-center text-lg">
                  {wallet.icon}
                </div>
                <span className="flex-1 text-left">{wallet.name}</span>
                {connecting && <Loader2 className="animate-spin" size={16} />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default WalletModal;