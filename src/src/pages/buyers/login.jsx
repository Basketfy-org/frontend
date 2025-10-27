
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
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

const LoginPage = ({ darkMode }) => {
    const navigate = useNavigate(); // For navigating back
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    });
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black' : 'bg-gradient-to-br from-white via-purple-50 to-gray-100'} flex items-center justify-center p-6`}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-6xl w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="text-center lg:text-left space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 backdrop-blur-md">
                            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                            <span className="text-sm font-semibold text-purple-300">Welcome Back to Basketfy</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black leading-tight">
                            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                Your Crypto
                            </span>
                            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Journey Continues
                            </span>
                        </h1>

                        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md`}>
                            Sign in to manage your diversified crypto baskets, track performance, and grow your wealth with AI-powered rebalancing.
                        </p>

                        <div className="grid grid-cols-3 gap-4 pt-6">
                            <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm p-4 rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <ShoppingBasket className="w-6 h-6 text-purple-400 mb-2" />
                                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-grey-600'}`}>150+</div>
                                <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Active Baskets</div>
                            </div>
                            <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm p-4 rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <Users className="w-6 h-6 text-blue-400 mb-2" />
                                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-grey-600'}`}>10K+</div>
                                <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Investors</div>
                            </div>
                            <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm p-4 rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <BarChart3 className="w-6 h-6 text-green-400 mb-2" />
                                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-grey-600'}`}>$5M+</div>
                                <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>TVL</div>
                            </div>
                        </div>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white/80'} backdrop-blur-xl rounded-2xl p-8 shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white/70' : 'text-grey-600'}`}>Sign In</h2>

                        <div className="space-y-4">
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-grey-600'}`}>Email Address</label>
                                <div className="relative">
                                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="ayoseunsolomon@gmail.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-grey-600'}`}>Password</label>
                                <div className="relative">
                                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-12 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        {showPassword ?
                                            <EyeOff className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} /> :
                                            <Eye className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                        }
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded" />
                                    <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-grey-600'}`}>Remember me</span>
                                </label>
                                <button className="text-sm text-purple-400 hover:text-purple-300">
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                onClick={() => navigate('/profile')}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                            >
                                Sign In
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className={`w-full border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className={`px-4 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'}`}>
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium`}>
                                    <Wallet className="w-5 h-5" />
                                    MetaMask
                                </button>
                                <button className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium`}>
                                    <Wallet className="w-5 h-5" />
                                    WalletConnect
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Don't have an account?{' '}
                                <button
                                    onClick={() => navigate('/register')}
                                    className="text-purple-400 hover:text-purple-300 font-semibold"
                                >
                                    Sign up
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;