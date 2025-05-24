import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, Users, Wallet, ArrowLeft, Plus, PieChart, BarChart3, Share2, ExternalLink, Check, Loader2 } from 'lucide-react';
import './App.css';
// Mock data
const mockBaskets = [
  {
    id: 1,
    name: "AI Basket",
    description: "Top AI and machine learning tokens on Solana",
    creator: "AI Research DAO",
    performance7d: 12.5,
    performance30d: 34.2,
    holders: 1247,
    category: "AI",
    tokens: [
      { ticker: "RNDR", name: "Render Token", weight: 30, price: 8.45 },
      { ticker: "FET", name: "Fetch.ai", weight: 25, price: 0.82 },
      { ticker: "OCEAN", name: "Ocean Protocol", weight: 20, price: 0.54 },
      { ticker: "AGIX", name: "SingularityNET", weight: 15, price: 0.31 },
      { ticker: "NMR", name: "Numeraire", weight: 10, price: 17.23 }
    ],
    image: "🤖"
  },
  {
    id: 2,
    name: "Solana DeFi",
    description: "Leading DeFi protocols built on Solana",
    creator: "Solana Foundation",
    performance7d: -3.2,
    performance30d: 18.7,
    holders: 2156,
    category: "DeFi",
    tokens: [
      { ticker: "RAY", name: "Raydium", weight: 25, price: 1.85 },
      { ticker: "SRM", name: "Serum", weight: 20, price: 0.23 },
      { ticker: "ORCA", name: "Orca", weight: 20, price: 2.17 },
      { ticker: "MNGO", name: "Mango", weight: 15, price: 0.089 },
      { ticker: "TULIP", name: "Tulip Protocol", weight: 20, price: 3.42 }
    ],
    image: "🏦"
  },
  {
    id: 3,
    name: "Restaking",
    description: "Next-gen staking and restaking protocols",
    creator: "Staking Alliance",
    performance7d: 8.3,
    performance30d: 22.1,
    holders: 892,
    category: "Staking",
    tokens: [
      { ticker: "EIGEN", name: "EigenLayer", weight: 40, price: 4.23 },
      { ticker: "LDO", name: "Lido DAO", weight: 30, price: 1.87 },
      { ticker: "RPL", name: "Rocket Pool", weight: 20, price: 12.45 },
      { ticker: "SWISE", name: "StakeWise", weight: 10, price: 0.65 }
    ],
    image: "🔒"
  }
];

const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [investAmount, setInvestAmount] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [transactionStep, setTransactionStep] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [darkMode, setDarkMode] = useState(true);

  const filteredBaskets = mockBaskets.filter(basket => {
    const matchesSearch = basket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         basket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || basket.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const LandingPage = () => (
    <div className={`w-[100rem] min-h-screen  ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black' : 'bg-gradient-to-br from-white via-purple-50 to-gray-100'} ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Basketfy
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setCurrentView('create')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            Create Basket
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
            Invest in Crypto Themes,<br />Not Just Tokens
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-2xl mx-auto leading-relaxed`}>
            Discover curated baskets of tokens around themes like AI, DeFi, and Restaking. 
            One-click diversified investing powered by Solana.
          </p>
          <button
            onClick={() => setCurrentView('explore')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Explore Baskets
          </button>
        </div>
      </section>

      {/* Featured Baskets */}
      <section className="px-6 pb-24">
        <h2 className="text-4xl font-bold mb-12 text-center">Featured Baskets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mockBaskets.map((basket) => (
            <div
              key={basket.id}
              className={`${darkMode ? 'bg-gray-800/50 hover:bg-gray-800/70' : 'bg-white/70 hover:bg-white/90'} backdrop-blur-sm p-8 rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              onClick={() => {
                setSelectedBasket(basket);
                setCurrentView('detail');
              }}
            >
              <div className="text-4xl mb-4">{basket.image}</div>
              <h3 className="text-2xl font-semibold mb-3">{basket.name}</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 leading-relaxed`}>{basket.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {basket.performance7d > 0 ? 
                    <TrendingUp className="w-4 h-4 text-green-400" /> : 
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  }
                  <span className={basket.performance7d > 0 ? 'text-green-400' : 'text-red-400'}>
                    {basket.performance7d > 0 ? '+' : ''}{basket.performance7d}%
                  </span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <Users className="w-4 h-4" />
                  <span>{basket.holders}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const ExplorePage = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2 hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
            <h1 className="text-2xl font-bold">Basket Explorer</h1>
            <button
              onClick={() => setShowWalletModal(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${walletConnected ? 'bg-green-600' : 'bg-purple-600'} text-white hover:opacity-90 transition-opacity`}
            >
              <Wallet className="w-4 h-4" />
              {walletConnected ? 'Connected' : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search baskets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border focus:ring-2 focus:ring-purple-500`}
          >
            <option value="all">All Categories</option>
            <option value="ai">AI</option>
            <option value="defi">DeFi</option>
            <option value="staking">Staking</option>
          </select>
        </div>

        {/* Baskets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBaskets.map((basket) => (
            <div
              key={basket.id}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              onClick={() => {
                setSelectedBasket(basket);
                setCurrentView('detail');
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-3xl mb-2">{basket.image}</div>
                  <h3 className="text-xl font-semibold mb-1">{basket.name}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>by {basket.creator}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
                  {basket.category}
                </div>
              </div>
              
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 text-sm`}>{basket.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>7D Performance</p>
                  <div className="flex items-center gap-1">
                    {basket.performance7d > 0 ? 
                      <TrendingUp className="w-3 h-3 text-green-400" /> : 
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    }
                    <span className={`text-sm font-medium ${basket.performance7d > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {basket.performance7d > 0 ? '+' : ''}{basket.performance7d}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Holders</p>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-purple-400" />
                    <span className="text-sm font-medium">{basket.holders}</span>
                  </div>
                </div>
              </div>
              
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Top tokens:</div>
              <div className="flex flex-wrap gap-1">
                {basket.tokens.slice(0, 3).map((token) => (
                  <span key={token.ticker} className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {token.ticker}
                  </span>
                ))}
                {basket.tokens.length > 3 && (
                  <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    +{basket.tokens.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BasketDetailPage = () => {
    const estimatedTokens = investAmount ? (parseFloat(investAmount) * 0.95).toFixed(2) : '0';
    
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
                    onClick={() => {
                      if (!walletConnected) {
                        setShowWalletModal(true);
                      } else if (investAmount) {
                        setCurrentView('confirm');
                      }
                    }}
                    disabled={!investAmount}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    {!walletConnected ? 'Connect Wallet to Invest' : 'Buy This Basket'}
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

  const ConfirmTransaction = () => {
    const steps = [
      'Swapping on OKX',
      'Minting bToken',
      'Minting Basket NFT',
      'Depositing tokens into PDA'
    ];

    useEffect(() => {
      if (transactionStep < steps.length) {
        const timer = setTimeout(() => {
          setTransactionStep(prev => prev + 1);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => {
          setCurrentView('success');
        }, 1000);
      }
    }, [transactionStep]);

    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center justify-center`}>
        <div className={`max-w-md w-full mx-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-xl`}>
          <h2 className="text-2xl font-bold text-center mb-6">Confirm Transaction</h2>
          
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-6`}>
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">{selectedBasket?.image}</div>
              <h3 className="text-lg font-semibold">{selectedBasket?.name}</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Investment Amount:</span>
                <span className="font-medium">${investAmount} USDC</span>
              </div>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>bTokens to receive:</span>
                <span className="font-medium">{(parseFloat(investAmount || '0') * 0.95).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Basket NFT:</span>
                <span className="font-medium">1 NFT</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  index < transactionStep ? 'bg-green-500' : 
                  index === transactionStep ? 'bg-purple-500' : 
                  `${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`
                }`}>
                  {index < transactionStep ? 
                    <Check className="w-3 h-3 text-white" /> : 
                    index === transactionStep ? 
                      <Loader2 className="w-3 h-3 text-white animate-spin" /> :
                      <span className="text-xs text-white">{index + 1}</span>
                  }
                </div>
                <span className={`${
                  index < transactionStep ? 'text-green-400' : 
                  index === transactionStep ? 'text-purple-400' : 
                  `${darkMode ? 'text-gray-400' : 'text-gray-600'}`
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>

          {transactionStep >= steps.length && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <p className="text-green-400 font-medium">Transaction Complete!</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const SuccessPage = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center justify-center`}>
      <div className={`max-w-md w-full mx-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-xl text-center`}>
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
        <p className="text-lg mb-6">You now own the <span className="font-semibold text-purple-400">{selectedBasket?.name}</span>!</p>
        
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-6`}>
          <div className="text-3xl mb-2">{selectedBasket?.image}</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>bToken Balance:</span>
              <span className="font-medium">{(parseFloat(investAmount || '0') * 0.95).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Basket NFT:</span>
              <span className="font-medium">1 NFT</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setCurrentView('portfolio')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
          >
            View Portfolio
          </button>
          <button
            onClick={() => setCurrentView('explore')}
            className={`w-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} font-medium py-3 px-6 rounded-lg transition-colors`}
          >
            Explore More Baskets
          </button>
          <button
            className={`w-full flex items-center justify-center gap-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} py-2 transition-colors`}
          >
            <Share2 className="w-4 h-4" />
            Share on X
          </button>
        </div>
      </div>
    </div>
  );

  const PortfolioPage = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('landing')}
                className="flex items-center gap-2 hover:text-purple-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
              <h1 className="text-2xl font-bold">My Portfolio</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('explore')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Portfolio Summary */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg mb-8`}>
          <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Value</p>
              <p className="text-2xl font-bold">${investAmount || '0'}</p>
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Return</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-2xl font-bold text-green-400">+12.5%</span>
              </div>
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Active Baskets</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </div>

        {/* My Baskets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{selectedBasket?.image}</div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedBasket?.name}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>NFT #{Math.floor(Math.random() * 1000) + 1}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${investAmount}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-sm text-green-400">+12.5%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>bToken Balance:</span>
                <span className="font-medium">{(parseFloat(investAmount || '0') * 0.95).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Current Value:</span>
                <span className="font-medium">${(parseFloat(investAmount || '0') * 1.125).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                Rebalance
              </button>
              <button className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} py-2 px-4 rounded-lg transition-colors`}>
                Redeem
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CreateBasketPage = () => {
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
                              setTokenWeights({...tokenWeights, [token.ticker]: '20'});
                            } else {
                              setSelectedTokens(selectedTokens.filter(t => t !== token.ticker));
                              const newWeights = {...tokenWeights};
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
                            onChange={(e) => setTokenWeights({...tokenWeights, [token.ticker]: e.target.value})}
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

  const WalletModal = () => (
    showWalletModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-sm w-full mx-4`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Connect Wallet</h3>
            <button
              onClick={() => setShowWalletModal(false)}
              className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
            >
              ✕
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
    )
  );

  // Main render
  return (
    <div className="font-sans">
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'explore' && <ExplorePage />}
      {currentView === 'detail' && <BasketDetailPage />}
      {currentView === 'confirm' && <ConfirmTransaction />}
      {currentView === 'success' && <SuccessPage />}
      {currentView === 'portfolio' && <PortfolioPage />}
      {currentView === 'create' && <CreateBasketPage />}
      <WalletModal />
    </div>
  );
};

export default App;