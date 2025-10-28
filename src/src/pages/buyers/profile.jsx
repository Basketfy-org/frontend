import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    ArrowRight,
    Check,
    Wallet,
    History,
    LogOut,
    Copy,
    ExternalLink,
    TrendingUp,
    DollarSign,
    Clock,
    Download,
    Upload,
    CreditCard,
    Smartphone,
    Building,
    AlertCircle,
    ShoppingBasket,
    Sparkles,
    BarChart3,
    Users,
    Award
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../store/store';

const ProfilePage = ({ darkMode }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // For navigating back
    const userData = {
        name: "Deborah U. Ayo",
        email: "deeAyo@email.com",
        username: "@dee",
        avatar: "https://i.ibb.co/wZnfRRmg/8-V8-A2257-1702594060.webp",
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        balance: 1250.45,
        totalInvested: 5400.00,
        totalReturns: 892.30,
        basketsOwned: 5,
        joinDate: "March 2024",
        transactions: [
            { id: 1, type: 'deposit', amount: 500, currency: 'USDC', date: '2024-10-20', status: 'completed', basket: 'DeFi Blue Chip' },
            { id: 2, type: 'investment', amount: 300, currency: 'USDC', date: '2024-10-19', status: 'completed', basket: 'AI Infrastructure' },
            { id: 3, type: 'withdrawal', amount: 150, currency: 'NGN', date: '2024-10-18', status: 'completed', basket: '-' },
            { id: 4, type: 'deposit', amount: 1000, currency: 'USDC', date: '2024-10-15', status: 'completed', basket: 'Stable Naira Protector' },
            { id: 5, type: 'investment', amount: 450, currency: 'USDC', date: '2024-10-14', status: 'pending', basket: 'African Growth' }
        ]
    };
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const savedState = sessionStorage.getItem('oauth_state');

        if (code && state === savedState) {
            // Step 2: send code to backend
            // exchangeCodeForUser(code);
        }
    }, []);

async function exchangeCodeForUser(code) {
  try {
    const response = await fetch('https://your-api.com/api/v1/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    // data => your user info + session token
    localStorage.setItem('token', data.token);
  } catch (err) {
    console.error('Google sign-in failed', err);
  }
}

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Basketfy
                        </h1>
                        {/* <nav className="hidden md:flex items-center gap-4">
                            <button onClick={() => navigate('/profile')} className={`px-4 py-2 rounded-lg ${currentView === 'profile' ? 'bg-purple-600 text-white' : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                                Profile
                            </button>
                            <button onClick={() => setCurrentView('fund')} className={`px-4 py-2 rounded-lg ${currentView === 'fund' ? 'bg-purple-600 text-white' : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                                Fund Wallet
                            </button>
                            <button onClick={() => setCurrentView('history')} className={`px-4 py-2 rounded-lg ${currentView === 'history' ? 'bg-purple-600 text-white' : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                                History
                            </button>
                        </nav> */}
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() =>
                                dispatch(toggleDarkMode())
                            }
                            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl p-8 mb-8`}>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <img
                            src={userData.avatar}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-purple-500"
                        />
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-2">{userData.name}</h2>
                            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{userData.username}</p>
                            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'} mb-4`}>Member since {userData.joinDate}</p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                    <Wallet className="w-4 h-4 text-purple-400" />
                                    <span className="font-mono text-sm">{userData.walletAddress.slice(0, 6)}...{userData.walletAddress.slice(-4)}</span>
                                    <button className="hover:text-purple-400">
                                        <Copy className="w-3 h-3" />
                                    </button>
                                </div>
                                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors text-white">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
                        <Wallet className="w-8 h-8 text-purple-400 mb-2" />
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Wallet Balance</p>
                        <p className="text-3xl font-bold">${userData.balance.toFixed(2)}</p>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
                        <DollarSign className="w-8 h-8 text-blue-400 mb-2" />
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Invested</p>
                        <p className="text-3xl font-bold">${userData.totalInvested.toFixed(2)}</p>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
                        <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Returns</p>
                        <p className="text-3xl font-bold text-green-400">+${userData.totalReturns.toFixed(2)}</p>
                        <p className="text-sm text-green-400 mt-1">+16.5%</p>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
                        <ShoppingBasket className="w-8 h-8 text-orange-400 mb-2" />
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Active Baskets</p>
                        <p className="text-3xl font-bold">{userData.basketsOwned}</p>
                    </div>
                </div>

                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-8`}>
                    <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button
                            onClick={() => setCurrentView('fund')}
                            className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-4 rounded-xl transition-colors flex flex-col items-center gap-2`}
                        >
                            <Upload className="w-6 h-6 text-purple-400" />
                            <span className="font-medium">Deposit</span>
                        </button>
                        <button className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-4 rounded-xl transition-colors flex flex-col items-center gap-2`}>
                            <Download className="w-6 h-6 text-blue-400" />
                            <span className="font-medium">Withdraw</span>
                        </button>
                        <button
                            onClick={() => navigate('/market')}
                            className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-4 rounded-xl transition-colors flex flex-col items-center gap-2`}>
                            <ShoppingBasket className="w-6 h-6 text-green-400" />
                            <span className="font-medium">Buy Basket</span>

                        </button>
                        <button
                            onClick={() => setCurrentView('history')}
                            className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-4 rounded-xl transition-colors flex flex-col items-center gap-2`}
                        >
                            <History className="w-6 h-6 text-orange-400" />
                            <span className="font-medium">History</span>
                        </button>
                    </div>
                </div>

                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
                    <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {userData.transactions.slice(0, 3).map((tx) => (
                            <div key={tx.id} className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'deposit' ? 'bg-green-500/20' :
                                            tx.type === 'investment' ? 'bg-purple-500/20' : 'bg-blue-500/20'
                                        }`}>
                                        {tx.type === 'deposit' && <Upload className="w-5 h-5 text-green-400" />}
                                        {tx.type === 'investment' && <ShoppingBasket className="w-5 h-5 text-purple-400" />}
                                        {tx.type === 'withdrawal' && <Download className="w-5 h-5 text-blue-400" />}
                                    </div>
                                    <div>
                                        <p className="font-medium capitalize">{tx.type}</p>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx.basket}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{tx.amount} {tx.currency}</p>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfilePage;