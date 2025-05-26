
import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Users,
    ArrowLeft,
    Search,
    Wallet,
    
} from 'lucide-react';

 const ExplorePage = ({ darkMode, 
    setCurrentView,
    setShowWalletModal,
     walletConnected,
     setSearchTerm,
     searchTerm, 
     setSelectedBasket ,
    selectedCategory,
    filteredBaskets,
}) => {
 return(   <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
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
    </div>)
};

export default ExplorePage;