

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Loader2,
  Wallet,
  Share2,      // Used in BasketDetailPage and SuccessPage

} from 'lucide-react';
import { saveBuyBasket } from '../../api/basketApi';
import { useWallet } from '../../hook/wallet';

const BasketDetailPage = ({ darkMode, setCurrentView, selectedBasket, setShowWalletModal, walletConnected, setInvestAmount, investAmount }) => {
  const [isBuying, setIsBuying] = useState(false);
  const estimatedTokens = investAmount ? (parseFloat(investAmount) * 0.95).toFixed(2) : '0';
  const { getBalance, formatAddress, walletAddress, buyBasket } = useWallet();
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => setCurrentView('explore')}
            className="flex items-center gap-2 hover:text-purple-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Explorer
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{selectedBasket?.image}</div>
              <div>
                <h1 className="text-3xl font-bold">{selectedBasket?.name}</h1>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Created by {selectedBasket?.creator}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowWalletModal(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${walletConnected ? 'bg-green-600' : 'bg-purple-600'} text-white hover:opacity-90 transition-opacity`}
              >
                <Wallet className="w-4 h-4" />
                {walletConnected ? 'Connected' : 'Connect Wallet'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Performance */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <h2 className="text-xl font-semibold mb-4">Performance</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>7 Day</p>
                  <div className="flex items-center gap-2">
                    {selectedBasket?.performance7d > 0 ?
                      <TrendingUp className="w-5 h-5 text-green-400" /> :
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    }
                    <span className={`text-2xl font-bold ${selectedBasket?.performance7d > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedBasket?.performance7d > 0 ? '+' : ''}{selectedBasket?.performance7d}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>30 Day</p>
                  <div className="flex items-center gap-2">
                    {selectedBasket?.performance30d > 0 ?
                      <TrendingUp className="w-5 h-5 text-green-400" /> :
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    }
                    <span className={`text-2xl font-bold ${selectedBasket?.performance30d > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedBasket?.performance30d > 0 ? '+' : ''}{selectedBasket?.performance30d}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Composition */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <h2 className="text-xl font-semibold mb-6">Token Composition</h2>
              <div className="space-y-4">
                {selectedBasket?.tokens.map((token, index) => (
                  <div key={token.ticker} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        {token.ticker.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium">{token.ticker}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{token.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{token.weight}%</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>${token.price}</p>
                    </div>
                    <div className={`w-16 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} relative`}>
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${token.weight}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Investment Panel */}
          <div className="space-y-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg sticky top-24`}>
              <h3 className="text-xl font-semibold mb-6">Invest in this Basket</h3>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Investment Amount (USDC)
                  </label>
                  <input
                    type="number"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    placeholder="100"
                    className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                </div>

                {investAmount && (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>You'll receive:</span>
                        <span className="font-medium">{estimatedTokens} bTokens</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>+ Basket NFT</span>
                        <span className="font-medium">1 NFT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Fees (5%):</span>
                        <span className="font-medium">${(parseFloat(investAmount || '0') * 0.05).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={async () => {
                    if (getBalance() < 0.01) {
                      alert('You need at least 0.01 SOL to create a basket');
                    }
                    if (!walletConnected) {
                      setShowWalletModal(true);
                    } else if (investAmount) {
                      setIsBuying(true);
                      const newBasketTokens = selectedBasket.tokens.map((item) => ({
                        ...item,
                        entryPrice: 0.0,
                      }));

                      const userId = formatAddress(walletAddress);
                      const sessionId = "current_session_id";
                      const buyBasketData = {
                        "userId": userId,
                        "sessionId": sessionId,
                        "basketData": {
                          "basketName": selectedBasket.name,
                          "description": selectedBasket.description,
                          "image": selectedBasket.image,
                          "createdBy": selectedBasket.creator,
                          "totalWeight": 100,
                          "items": newBasketTokens,
                        },
                        "category": selectedBasket.category,
                      }


                      console.log(buyBasketData);
                      try {
                        const result = await buyBasket(
                          investAmount,
                          selectedBasket.address
                        )

                        console.log('Basket created successfully:', result["transactionSignature"]);

                        if (result["transactionSignature"] !== null && result["success"]) {
                          //const data = await buyBasket(buyBasketData);
                          console.log('Basket created:', data);
                          setCurrentView('confirm');
                        }

                      } catch (err) {
                        console.error('Error creating basket:', err.message);
                        alert('Failed to create basket. Please try again.');
                      } finally {
                        setIsBuying(false);
                      }
                    }
                  }}
                  disabled={!investAmount || isBuying}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  {isBuying ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Buying...
                    </div>
                  ) : (
                    walletConnected ? 'Buy This Basket' : 'Connect Wallet to Buy'
                  )}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Total Holders</span>
                  <span className="font-medium">{selectedBasket?.holders}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketDetailPage;