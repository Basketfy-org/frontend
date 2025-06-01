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
import PortfolioPage from './src/pages/portfolio/overview';
import CreateBasketPage from './src/pages/basket/create';
import SuccessPage from './src/pages/success';
import { getBaskets } from './src/api/basketApi';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CreateSuccessPage from './src/pages/basket/create_success';
import HowItWorks from './src/components/how_it_works';
import logger from './src/uutils/logger';
import UserBasketPage from './src/pages/portfolio/user_basket_detail';




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
  { label: "Total Value Locked", value: "$0.00M", icon: <DollarSign className="w-5 h-5" /> },
  { label: "Active Baskets", value: "47", icon: <Target className="w-5 h-5" /> },
  { label: "Total Holders", value: "0.02K", icon: <Users className="w-5 h-5" /> },
  { label: "Avg 7D Performance", value: "+5.8%", icon: <TrendingUp className="w-5 h-5" /> }
];

const App = () => {


  const [baskets, setBaskets] = useState([]);
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);


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

        // Set a timeout to ensure loading is false after 400ms
        const timeoutId = setTimeout(() => {
          setLoading(false);
        }, 400);

        const response = await getBaskets("100");

        // Clear timeout since we got a response
        clearTimeout(timeoutId);

        if (response && response.data) {

          logger(`Fetched Baskets:, ${JSON.stringify(response.data)}`);
          setBaskets(response.data);
        } else {

          logger(`Failed to fetch baskets:, ${JSON.stringify(response)}`);
        }
      } catch (error) {

        logger(`Error fetching baskets:, ${error.message}`);
      } finally {
        // Ensure loading is false
        setLoading(false);
      }
    };

    fetchBaskets();
  }, []);


  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }


  return (
    <Router> {/* Wrap your entire app with Router */}
      <>
        <Routes> {/* Define your routes here */}
          <Route path="/" element={
            <LandingPage
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              mockBaskets={mockBaskets} // Consider using `baskets` state after fetching
              stats={stats}
              features={features}
              setShowWalletModal={setShowWalletModal}
              showWalletModal={showWalletModal}
            />
          } />
          <Route path="/explore" element={
            <ExplorePage
              darkMode={darkMode}
              setBaskets={setBaskets}
              setLoading={setLoading}
              loading={loading}
              setShowWalletModal={setShowWalletModal}
              showWalletModal={showWalletModal}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              setSelectedCategory={setSelectedCategory}
              setSelectedBasket={setSelectedBasket}
              selectedCategory={selectedCategory}
              filteredBaskets={filteredBaskets}

            />
          } />
          {/* Use URL parameters for detail pages, e.g., /baskets/:id or /baskets/:symbol */}
          <Route path="/basket/:id" element={
            <BasketDetailPage
              darkMode={darkMode}
              selectedBasket={selectedBasket} // Ensure this is set when navigating to detail
              setShowWalletModal={setShowWalletModal}

            />
          } />
          <Route path="/confirm" element={
            <ConfirmTransaction
              darkMode={darkMode}
            />
          } />
          <Route path="/buy-success" element={
            <SuccessPage
              darkMode={darkMode}
            />
          } />
          {/* Route for CreateBasketPage */}
          <Route path="/create" element={
            <CreateBasketPage
              darkMode={darkMode}
              setShowWalletModal={setShowWalletModal}
            />
          } />
          {/* Route for CreateSuccessPage, will receive state via navigate */}
          <Route path="/create-success" element={
            <CreateSuccessPage
              darkMode={darkMode}
            />
          } />
          <Route path="/my-baskets" element={
            <PortfolioPage
              darkMode={darkMode}
              filteredBaskets={filteredBaskets}
            />
          } />
          <Route path="/user-basket-portfolio" element={
            <UserBasketPage
              darkMode={darkMode}

            />
          } />
          <Route path="/how-it-works" element={
            <HowItWorks
              darkMode={darkMode}
            />
          } />
        </Routes>

        {/* WalletModal should remain outside of Routes if it's a global modal */}
        <WalletModal
          showWalletModal={showWalletModal}
          darkMode={darkMode}
          setShowWalletModal={setShowWalletModal}
        />
      </>
    </Router>
  );
};

export default App;
