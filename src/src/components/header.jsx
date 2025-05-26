import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Wallet, ChevronDown, Copy, ExternalLink } from 'lucide-react';
import { useWallet } from '../hook/wallet';

const Header = ({
    darkMode,
    setCurrentView,
    setShowWalletModal,
    setWalletConnected,
    walletConnected,
    title = "Basket Explorer"
}) => {
    const {
        connectWallet,
        disconnectWallet,
        connected,
        connecting,
        walletAddress,
        formatAddress,
    } = useWallet();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    return (
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

                    <h1 className="text-2xl font-bold">{title}</h1>

                    {/* Wallet Section */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => walletConnected ? setIsDropdownOpen(!isDropdownOpen) : setShowWalletModal(true)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${walletConnected ? 'bg-green-600' : 'bg-purple-600'
                                } text-white hover:opacity-90 transition-opacity`}
                        >
                            <Wallet className="w-4 h-4" />
                            {walletConnected ? formatAddress(walletAddress) : 'Connect Wallet'}
                            {walletConnected && <ChevronDown className="w-4 h-4" />}
                        </button>

                        {/* Dropdown Menu */}
                        {walletConnected && isDropdownOpen && (
                            <div className={`absolute right-0 mt-2 w-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                                } border rounded-lg shadow-xl z-20`}>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                            Wallet Address
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => copyToClipboard(walletAddress)}
                                                className={`p-1 rounded hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'
                                                    } transition-colors`}
                                                title="Copy address"
                                            >
                                                <Copy className="w-3 h-3" />
                                            </button>
                                            <button
                                                onClick={() => window.open(`https://etherscan.io/address/${walletAddress}`, '_blank')}
                                                className={`p-1 rounded hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'
                                                    } transition-colors`}
                                                title="View on Etherscan"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className={`p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'
                                        } mb-4`}>
                                        <code className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                            } break-all`}>
                                            {walletAddress}
                                        </code>
                                    </div>

                                    <div className="space-y-2">
                                        <button
                                            onClick={() => {
                                                setShowWalletModal();
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
                                        >
                                            Switch Wallet
                                        </button>
                                        <button
                                            onClick={() => {
                                                disconnectWallet();
                                                setWalletConnected(false);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-red-600 hover:text-white transition-colors text-red-500"
                                        >
                                            Disconnect
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;