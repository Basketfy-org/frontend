
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

 const CreateBasketPage =  ({ darkMode,  setCurrentView, }) => {
    const [basketName, setBasketName] = useState('');
    const [basketDescription, setBasketDescription] = useState('');
    const [selectedTokens, setSelectedTokens] = useState([]);
    const [tokenWeights, setTokenWeights] = useState({});

    const availableTokens = [
      { ticker: 'SOL', name: 'Solana', price: 145.23 },
      { ticker: 'RNDR', name: 'Render Token', price: 8.45 },
      { ticker: 'RAY', name: 'Raydium', price: 1.85 },
      { ticker: 'ORCA', name: 'Orca', price: 2.17 },
      { ticker: 'MNGO', name: 'Mango', price: 0.089 },
      { ticker: 'FET', name: 'Fetch.ai', price: 0.82 },
      { ticker: 'OCEAN', name: 'Ocean Protocol', price: 0.54 }
    ];

    const totalWeight = Object.values(tokenWeights).reduce((sum, weight) => sum + (parseFloat(weight) || 0), 0);

    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {/* Header */}
        <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentView('landing')}
                className="flex items-center gap-2 hover:text-purple-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
              <h1 className="text-2xl font-bold">Create Basket</h1>
              <div></div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="space-y-6">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <h2 className="text-xl font-semibold mb-4">Basket Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Basket Name
                    </label>
                    <input
                      type="text"
                      value={basketName}
                      onChange={(e) => setBasketName(e.target.value)}
                      placeholder="My DeFi Basket"
                      className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Description
                    </label>
                    <textarea
                      value={basketDescription}
                      onChange={(e) => setBasketDescription(e.target.value)}
                      placeholder="A curated collection of top DeFi tokens..."
                      rows={3}
                      className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    />
                  </div>
                </div>
              </div>

              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <h2 className="text-xl font-semibold mb-4">Token Selection</h2>
                <div className="space-y-3">
                  {availableTokens.map((token) => (
                    <div key={token.ticker} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedTokens.includes(token.ticker)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTokens([...selectedTokens, token.ticker]);
                              setTokenWeights({ ...tokenWeights, [token.ticker]: '20' });
                            } else {
                              setSelectedTokens(selectedTokens.filter(t => t !== token.ticker));
                              const newWeights = { ...tokenWeights };
                              delete newWeights[token.ticker];
                              setTokenWeights(newWeights);
                            }
                          }}
                          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <div>
                          <p className="font-medium">{token.ticker}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{token.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>${token.price}</span>
                        {selectedTokens.includes(token.ticker) && (
                          <input
                            type="number"
                            value={tokenWeights[token.ticker] || ''}
                            onChange={(e) => setTokenWeights({ ...tokenWeights, [token.ticker]: e.target.value })}
                            placeholder="20"
                            className={`w-16 px-2 py-1 text-sm rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between">
                    <span>Total Weight:</span>
                    <span className={`font-medium ${totalWeight === 100 ? 'text-green-400' : 'text-red-400'}`}>
                      {totalWeight}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <h2 className="text-xl font-semibold mb-4">Preview</h2>
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">🧺</div>
                  <h3 className="text-lg font-semibold">{basketName || 'Untitled Basket'}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {basketDescription || 'No description provided'}
                  </p>
                </div>

                {selectedTokens.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Token Allocation</h4>
                    {selectedTokens.map((ticker) => {
                      const token = availableTokens.find(t => t.ticker === ticker);
                      const weight = parseFloat(tokenWeights[ticker] || '0');
                      return (
                        <div key={ticker} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                              {ticker.slice(0, 2)}
                            </div>
                            <span className="text-sm">{ticker}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{weight}%</span>
                            <div className={`w-12 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} relative`}>
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                style={{ width: `${Math.min(weight, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  if (basketName && basketDescription && selectedTokens.length > 0 && totalWeight === 100) {
                    setIsCreating(true);
                    setTimeout(() => {
                      setIsCreating(false);
                      setCurrentView('landing');
                    }, 3000);
                  }
                }}
                disabled={!basketName || !basketDescription || selectedTokens.length === 0 || totalWeight !== 100 || isCreating}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Basket...
                  </>
                ) : (
                  'Create Basket'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default CreateBasketPage;