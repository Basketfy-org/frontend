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
import './App.css';
import LandingPage from './src/pages/landing_page';
import WalletModal from './src/modal/wallet_modal';
import ExplorePage from './src/pages/explore';
import BasketDetailPage from './src/pages/basket/details';
import ConfirmTransaction from './src/pages/transactions/confirm_tx';
import PortfolioPage from './src/pages/portfolio';
import CreateBasketPage from './src/pages/basket/create';
import SuccessPage from './src/pages/success';
import { getBaskets } from './src/api/basketApi';





// Mock data
const mockBaskets = [
  {
    id: 1,
    name: "AI Projects Basket",
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

const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "One-Click Diversification",
    description: "Buy themed exposure with a single transaction instead of managing multiple tokens individually"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Smart Contract Security",
    description: "Built on Solana with audited contracts managing basket creation, minting, and redemption"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Dynamic Rebalancing",
    description: "Automatic portfolio rebalancing based on market cap and oracle data feeds"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "OKX DEX Integration",
    description: "Seamless swaps and liquidity through OKX DEX API for optimal price execution"
  }
];

const stats = [
  { label: "Total Value Locked", value: "$12.4M", icon: <DollarSign className="w-5 h-5" /> },
  { label: "Active Baskets", value: "47", icon: <Target className="w-5 h-5" /> },
  { label: "Total Holders", value: "8.2K", icon: <Users className="w-5 h-5" /> },
  { label: "Avg 7D Performance", value: "+5.8%", icon: <TrendingUp className="w-5 h-5" /> }
];

const App = () => {


  const [currentView, setCurrentView] = useState('landing');
  const [baskets, setBaskets] = useState([]);
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [investAmount, setInvestAmount] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [transactionStep, setTransactionStep] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [darkMode, setDarkMode] = useState(true);
   const [loading, setLoading] = useState(false);


 const filteredBaskets = baskets.filter(basket => {
    const matchesSearch = basket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      basket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || basket.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

 
 useEffect(() => {
    const fetchBaskets = async () => {
 
      try {
        setLoading(true);
        const response = await getBaskets("100");
        if (response && response.data) {
          console.log("Fetched Baskets:", response.data);
          setBaskets(response.data);
        } else {
          console.error("Failed to fetch baskets:", response);
        }
      } catch (error) {
        console.error("Error fetching baskets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBaskets();
  }, []); // Removed filteredBaskets, searchTerm, selectedCategory from dependencies

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Main render
  return (
    <>
      {currentView === 'landing' && (
        <LandingPage
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setCurrentView={setCurrentView}
          setSelectedBasket={setSelectedBasket}
          mockBaskets={mockBaskets}
          stats={stats}
          features={features}
        />
      )}
      {currentView === 'explore' && <ExplorePage
        darkMode={darkMode}
        setWalletConnected={setWalletConnected}
        setShowWalletModal={setShowWalletModal}
        setCurrentView={setCurrentView}
        showWalletModal={showWalletModal}
        walletConnected={walletConnected}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        setSelectedCategory={setSelectedCategory}
        setSelectedBasket={setSelectedBasket}
        selectedCategory={selectedCategory}
        filteredBaskets={filteredBaskets}
      />}
      {currentView === 'detail' && <BasketDetailPage
        darkMode={darkMode}
        setCurrentView={setCurrentView}
        selectedBasket={selectedBasket}
        setShowWalletModal={setShowWalletModal}
        walletConnected={walletConnected}
        setInvestAmount={setInvestAmount}
        investAmount={investAmount}
      />}
      {currentView === 'confirm' && <ConfirmTransaction
        darkMode={darkMode}
        transactionStep={transactionStep}
        setTransactionStep={setTransactionStep}
        setSelectedBasket={setSelectedBasket}
        setCurrentView={setCurrentView}
        investAmount={investAmount} />}
      {currentView === 'success' && <SuccessPage
        darkMode={darkMode}
        setCurrentView={setCurrentView}
        setSelectedBasket={setSelectedBasket}
        investAmount={investAmount} />}
      {currentView === 'portfolio' && <PortfolioPage
        darkMode={darkMode}
        setCurrentView={setCurrentView}
        investAmount={investAmount}
        selectedBasket={selectedBasket}
      />}
      {currentView === 'create' && <CreateBasketPage
        darkMode={darkMode}
        setCurrentView={setCurrentView}
        setWalletConnected={setWalletConnected}
        walletConnected={walletConnected}
        setShowWalletModal={setShowWalletModal}
      />}
      {<WalletModal
        showWalletModal={showWalletModal}
        darkMode={darkMode}
        setWalletConnected={setWalletConnected}
        setShowWalletModal={setShowWalletModal}
      />}
    </>
  );
};

export default App;