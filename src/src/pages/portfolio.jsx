import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    ArrowLeft,

} from 'lucide-react';


export const PortfolioPage = ({ darkMode, setCurrentView, investAmount, selectedBasket }) => {
    return (<div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
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
                           AI Rebalance
                        </button>
                        <button className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} py-2 px-4 rounded-lg transition-colors`}>
                            Redeem
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
};

export default PortfolioPage;