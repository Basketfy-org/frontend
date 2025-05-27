import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Users,
    Twitter,
    Github,
    MessageCircle,
    Mail,
    ExternalLink,
    DollarSign,
    BarChart3,
    Coins,
    ArrowRight,

} from 'lucide-react';
import { getSupportedTokens } from '../api/okxApi';




export const LandingPage = ({
    darkMode, setDarkMode,
    setCurrentView, setSelectedBasket,
    mockBaskets, stats,
    features }) => {


    return (<div className={`max-w-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black' : 'bg-gradient-to-br from-white via-purple-50 to-gray-100'} ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
        {/* Header */}
        <header className="flex justify-between items-center p-6 relative z-10">
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
                    The DeFi-Native ETF Platform
                </h1>
                <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-3xl mx-auto leading-relaxed`}>
                    Create, manage, and trade baskets of tokens representing themes like AI, DeFi blue chips, and Solana ecosystem.
                    Simplified diversified investing powered by smart contracts and OKX DEX integration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <button
                        onClick={async() => {
                           await getSupportedTokens()
                            setCurrentView('explore')}}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                    >
                        Explore Baskets
                    </button>
                    <button className={`${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} font-semibold flex items-center gap-2 transition-colors`}>
                        Learn How It Works <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {stats.map((stat, index) => (
                        <div key={index} className={`${darkMode ? 'bg-gray-800/30' : 'bg-white/50'} backdrop-blur-sm p-4 rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                                {stat.icon}
                            </div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* How It Works */}
        <section className="px-6 pb-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-4 text-center">How Basketfy Works</h2>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} text-center mb-16 max-w-3xl mx-auto`}>
                    Instead of researching and managing individual tokens, gain diversified exposure with a single transaction.
                </p>

                {/* Target Audiences */}
                <div className={`${darkMode ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30' : 'bg-gradient-to-r from-purple-50 to-blue-50'} rounded-2xl p-8 mb-16 border ${darkMode ? 'border-purple-800/50' : 'border-purple-200'}`}>
                    <h3 className="text-2xl font-semibold mb-6 text-center">Perfect For Every Type of Investor</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl mb-3">🌱</div>
                            <h4 className="font-semibold mb-2">New Retail Users</h4>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Don't understand tokenomics or governance? No problem. Get exposure without the complexity.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-3">🏢</div>
                            <h4 className="font-semibold mb-2">Institutions</h4>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Seeking thematic exposure like "Top 5 Solana Projects" with professional-grade execution.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-3">😴</div>
                            <h4 className="font-semibold mb-2">Passive Investors</h4>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Want to "set and forget"? Automated rebalancing keeps your portfolio optimized.
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-600'} font-medium`}>
                            👉 This reduces friction in onboarding and increases TVL across DeFi
                        </p>
                    </div>
                </div>

                {/* Process Flow */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${darkMode ? 'bg-purple-900/50' : 'bg-purple-100'} flex items-center justify-center relative`}>
                            <Coins className="w-8 h-8 text-purple-400" />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center font-bold">1</div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Choose Your Theme</h3>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                            Select from curated baskets like "AI Tokens", "DeFi Blue Chips", or "Solana Ecosystem", or create your own custom composition
                        </p>
                    </div>
                    <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${darkMode ? 'bg-purple-900/50' : 'bg-purple-100'} flex items-center justify-center relative`}>
                            <DollarSign className="w-8 h-8 text-purple-400" />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center font-bold">2</div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Single Transaction</h3>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                            Deposit USDC and our smart contracts automatically swap into the exact token proportions via OKX DEX, then mint your bToken
                        </p>
                    </div>
                    <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${darkMode ? 'bg-purple-900/50' : 'bg-purple-100'} flex items-center justify-center relative`}>
                            <BarChart3 className="w-8 h-8 text-purple-400" />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Enjoy Diversification</h3>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                            Hold, trade, or redeem your bToken anytime. Automatic rebalancing keeps your exposure optimized without any action required
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Features */}
        <section className="px-6 pb-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-16 text-center">Why Choose Basketfy</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className={`${darkMode ? 'bg-gray-800/30' : 'bg-white/50'} backdrop-blur-sm p-8 rounded-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className="text-purple-400 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Featured Baskets */}
        <section className="px-6 pb-24">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-12 text-center">Featured Baskets</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4`}>
                                {basket.composition}
                            </div>
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
            </div>
        </section>

        {/* CTA Section */}
        <section className={`${darkMode ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50' : 'bg-gradient-to-r from-purple-100 to-pink-100'} mx-6 rounded-3xl p-12 mb-20`}>
            <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">Ready to Build Your First Basket?</h2>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                    Join thousands of users creating and trading themed crypto baskets on Solana
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                        Create Your Basket
                    </button>
                    <button className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-50 text-gray-900'} font-semibold py-4 px-8 rounded-xl transition-all duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        Browse Marketplace
                    </button>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-50/50'} backdrop-blur-sm border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} px-6 py-16`}>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                            Basketfy
                        </div>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>
                            The DeFi-native ETF platform. Create, manage, and trade baskets of tokens with smart contracts on Solana.
                        </p>
                        <div className="flex gap-4">
                            <button className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                                <Github className="w-5 h-5" />
                            </button>
                            <button className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                                <MessageCircle className="w-5 h-5" />
                            </button>
                            <button className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                                <Mail className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Create Basket</button></li>
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Browse Baskets</button></li>
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Portfolio</button></li>
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Analytics</button></li>
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors flex items-center gap-1`}>
                                API <ExternalLink className="w-3 h-3" />
                            </button></li>
                        </ul>
                    </div>

                    {/* Learn */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Learn</h3>
                        <ul className="space-y-3">
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>How It Works</button></li>
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Documentation</button></li>
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Tutorials</button></li>
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Blog</button></li>
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>White Paper</button></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>About</button></li>
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Careers</button></li>
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Press</button></li>
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Contact</button></li>
                            <li><button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Legal</button></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} pt-8`}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                            © 2024 Basketfy. All rights reserved. Built on Solana.
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                            <button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                                Privacy Policy
                            </button>
                            <button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                                Terms of Service
                            </button>
                            <div className="flex items-center gap-2">
                                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Powered by</span>
                                <span className="text-purple-400 font-semibold">OKX DEX</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>)
};

export default LandingPage;