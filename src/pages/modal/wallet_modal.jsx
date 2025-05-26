
import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Zap,
  Shield,
  Globe,
  ChevronRight,
  Twitter,
  Github,
  MessageCircle,
  Mail,
  ExternalLink,
  DollarSign,
  BarChart3,
  Coins,
  Target,
  ArrowRight,
  ArrowLeft,
  Search,
  Wallet,
  X,
  Plus,
  Minus,
  // Missing imports that are used in your components:
  Share2,      // Used in BasketDetailPage and SuccessPage
  Check,       // Used in ConfirmTransaction and SuccessPage  
  Loader2      // Used in ConfirmTransaction and CreateBasketPage
} from 'lucide-react';


  const WalletModal = ({ showWalletModal, darkMode,setShowWalletModal,setWalletConnected }) => {
  return(  showWalletModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-sm w-full mx-4`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Connect Wallet</h3>
            <button
              onClick={() => setShowWalletModal(false)}
              className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
            >
            </button>
          </div>

          <div className="space-y-3">
            {['Phantom', 'Backpack', 'Solflare'].map((wallet) => (
              <button
                key={wallet}
                onClick={() => {
                  setWalletConnected(true);
                  setShowWalletModal(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} transition-colors`}
              >
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {wallet[0]}
                </div>
                <span>{wallet}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    ))
};
  export default WalletModal;