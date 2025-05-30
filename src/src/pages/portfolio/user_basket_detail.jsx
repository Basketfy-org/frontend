import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    ArrowLeft
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logger from '../../uutils/logger';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Brush
} from 'recharts';

export const UserBasketPage = ({ darkMode }) => {
    const [basketDetails, setBasketDetails] = useState(null);
    const [chartPeriod, setChartPeriod] = useState("7D");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.basketDetails) {
            setBasketDetails(location.state.basketDetails);
        } else {
            logger("No basket details found in navigation state. Redirecting to portfolio.");
            navigate('/portfolio');
        }
    }, [location.state, navigate]);

    const generateMockChartData = (days) => {
        if (!basketDetails) return [];
        return Array.from({ length: days }, (_, index) => {
            const day = `Day ${index + 1}`;
            const entry = { day };
            basketDetails.tokens.forEach(token => {
                const fluctuation = (Math.random() - 0.5) * 10;
                const basePrice = token.price || 100;
                entry[token.ticker] = parseFloat((basePrice + fluctuation).toFixed(2));
            });
            return entry;
        });
    };

    const chartData = chartPeriod === "7D" ? generateMockChartData(7) : generateMockChartData(30);

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(`/portfolio`)}
                                className="flex items-center gap-2 hover:text-purple-400 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to Portfolio
                            </button>
                            <h1 className="text-2xl font-bold">{basketDetails?.name}</h1>
                        </div>
                        <button
                            onClick={() => navigate(`/explore`)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Explore More
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Portfolio Summary */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg mb-8`}>
                    <h2 className="text-xl font-semibold mb-4">{basketDetails?.name} - Portfolio Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Value</p>
                            <p className="text-2xl font-bold">${basketDetails?.tokens.reduce((sum, t) => sum + (t.price || 0), 0).toFixed(2)}</p>
                        </div>
                        <div>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Return</p>
                            <div className="flex justify-center items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-green-400" />
                                <span className="text-2xl font-bold text-green-400">+{basketDetails?.performance7d || 0}%</span>
                            </div>
                        </div>
                        <div>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Tokens</p>
                            <p className="text-2xl font-bold">{basketDetails?.tokens.length}</p>
                        </div>
                    </div>
                </div>

                {/* Graph Section */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg mb-8`}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Performance</h2>
                        <div className="space-x-2">
                            <button
                                onClick={() => setChartPeriod("7D")}
                                className={`px-3 py-1 rounded-md font-medium transition-colors ${chartPeriod === "7D"
                                    ? "bg-purple-600 text-white"
                                    : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'}`
                                    }`}
                            >
                                7D
                            </button>
                            <button
                                onClick={() => setChartPeriod("30D")}
                                className={`px-3 py-1 rounded-md font-medium transition-colors ${chartPeriod === "30D"
                                    ? "bg-purple-600 text-white"
                                    : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'}`
                                    }`}
                            >
                                30D
                            </button>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <XAxis dataKey="day" stroke={darkMode ? '#ccc' : '#333'} />
                            <YAxis stroke={darkMode ? '#ccc' : '#333'} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: darkMode ? '#1f2937' : '#fff',
                                    borderColor: darkMode ? '#374151' : '#e5e7eb',
                                    color: darkMode ? '#fff' : '#000'
                                }}
                            />
                            <Legend />
                            {basketDetails?.tokens.map((token, index) => (
                                <Line
                                    key={token.ticker}
                                    type="monotone"
                                    dataKey={token.ticker}
                                    stroke={`hsl(${(index * 60) % 360}, 70%, 60%)`}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            ))}
                            <Brush dataKey="day" height={20} stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>

                  
                </div>

                {/* Token Composition */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                    <h2 className="text-xl font-semibold mb-6">Token Composition</h2>
                    <div className="space-y-4">
                        {basketDetails?.tokens.map((token, index) => (
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
                      {/* AI Rebalance + Redeem Buttons */}
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
    );
};

export default UserBasketPage;
