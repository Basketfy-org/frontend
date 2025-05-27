// hooks/useWallet.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import   {Connection}  from '@solana/web3.js';
  import { Program,AnchorProvider,} from '@coral-xyz/anchor';
import idl from '../components/contract/basketfy.json';
import * as anchor from '@coral-xyz/anchor';
const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
import {
  Keypair,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,

} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';


// Wallet Context
const WalletContext = createContext({});

// Wallet Provider Component
export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [walletType, setWalletType] = useState('');
  const [connection, setConnection] = useState(null);
  const [anchorProvider, setAnchorProvider] = useState(null);

  // Initialize Solana connection
  useEffect(() => {
    initializeSolanaConnection();
    checkExistingConnection();
  }, []);

  const initializeSolanaConnection = () => {
    try {
      // You can switch between devnet, testnet, mainnet-beta
       const rpcUrl = 'https://api.devnet.solana.com';
        //process.env.REACT_APP_SOLANA_RPC_URL ||;
      
      // Note: In a real app, you'd import from @solana/web3.js
      
       const conn = new Connection(rpcUrl, 'confirmed');
       setConnection(conn);
      
      console.log('Solana connection initialized:', rpcUrl);
    } catch (error) {
      console.error('Failed to initialize Solana connection:', error);
    }
  };

  const checkExistingConnection = async () => {
    const savedAddress = sessionStorage.getItem('walletAddress');
    const savedWalletType = sessionStorage.getItem('walletType');
    
    if (savedAddress && savedWalletType) {
      try {
        await connectWallet(savedWalletType, true);
      } catch (error) {
        console.log('Failed to restore wallet connection:', error);
        sessionStorage.removeItem('walletAddress');
        sessionStorage.removeItem('walletType');
      }
    }
  };

  const connectWallet = async (type, skipPrompt = false) => {
    setConnecting(true);
    
    try {
      let walletAdapter;
      let response;

      switch (type) {
        case 'phantom':
          if (!window.solana?.isPhantom) {
            throw new Error('Phantom wallet not found. Please install Phantom.');
          }
          walletAdapter = window.solana;
          response = skipPrompt 
            ? await walletAdapter.connect({ onlyIfTrusted: true })
            : await walletAdapter.connect();
          break;

        case 'solflare':
          if (!window.solflare?.isSolflare) {
            throw new Error('Solflare wallet not found. Please install Solflare.');
          }
          walletAdapter = window.solflare;
          response = skipPrompt 
            ? await walletAdapter.connect({ onlyIfTrusted: true })
            : await walletAdapter.connect();
          break;

        case 'backpack':
          if (!window.backpack) {
            throw new Error('Backpack wallet not found. Please install Backpack.');
          }
          walletAdapter = window.backpack;
          response = skipPrompt 
            ? await walletAdapter.connect({ onlyIfTrusted: true })
            : await walletAdapter.connect();
          break;

        case 'coinbase':
          if (!window.coinbaseSolana) {
            throw new Error('Coinbase Wallet not found. Please install Coinbase Wallet.');
          }
          walletAdapter = window.coinbaseSolana;
          response = skipPrompt 
            ? await walletAdapter.connect({ onlyIfTrusted: true })
            : await walletAdapter.connect();
          break;

        default:
          throw new Error('Unsupported wallet type');
      }

      if (response?.publicKey) {
        const address = response.publicKey.toString();
        
        setWallet(walletAdapter);
        setWalletAddress(address);
        setConnected(true);
        setWalletType(type);
        
        // Store in session
        sessionStorage.setItem('walletAddress', address);
        sessionStorage.setItem('walletType', type);
        
        // Setup Anchor provider for program interactions
        setupAnchorProvider(walletAdapter);
        
        // Setup event listeners
        setupWalletEventListeners(walletAdapter);
        
        return { success: true, address };
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      return { success: false, error: error.message };
    } finally {
      setConnecting(false);
    }
  };

  const setupAnchorProvider = (walletAdapter) => {
    try {
    

      const provider = new AnchorProvider(connection, walletAdapter, {
        commitment: 'confirmed',
        preflightCommitment: 'confirmed',
      });
      setAnchorProvider(provider);
      
      console.log('Anchor provider setup for wallet:', walletAdapter);
    } catch (error) {
      console.error('Failed to setup Anchor provider:', error);
    }
  };

  const setupWalletEventListeners = (walletAdapter) => {
    walletAdapter.on('connect', (publicKey) => {
      console.log('Wallet connected:', publicKey.toString());
    });

    walletAdapter.on('disconnect', () => {
      console.log('Wallet disconnected');
      handleDisconnect();
    });

    walletAdapter.on('accountChanged', (publicKey) => {
      if (publicKey) {
        const newAddress = publicKey.toString();
        setWalletAddress(newAddress);
        sessionStorage.setItem('walletAddress', newAddress);
        console.log('Account changed:', newAddress);
      } else {
        handleDisconnect();
      }
    });
  };

  const disconnectWallet = async () => {
    try {
      if (wallet) {
        await wallet.disconnect();
      }
      handleDisconnect();
    } catch (error) {
      console.error('Disconnect error:', error);
      handleDisconnect(); // Force disconnect even if error
    }
  };

  const handleDisconnect = () => {
    setWallet(null);
    setWalletAddress('');
    setConnected(false);
    setWalletType('');
    setAnchorProvider(null);
    sessionStorage.removeItem('walletAddress');
    sessionStorage.removeItem('walletType');
  };

  const signTransaction = async (transaction) => {
    if (!wallet || !connected) {
      throw new Error('Wallet not connected');
    }

    try {
      const signedTransaction = await wallet.signTransaction(transaction);
      return signedTransaction;
    } catch (error) {
      console.error('Transaction signing error:', error);
      throw error;
    }
  };

  const signAllTransactions = async (transactions) => {
    if (!wallet || !connected) {
      throw new Error('Wallet not connected');
    }

    try {
      const signedTransactions = await wallet.signAllTransactions(transactions);
      return signedTransactions;
    } catch (error) {
      console.error('Multiple transaction signing error:', error);
      throw error;
    }
  };

  const signMessage = async (message) => {
    if (!wallet || !connected) {
      throw new Error('Wallet not connected');
    }

    try {
      const signature = await wallet.signMessage(new TextEncoder().encode(message));
      return signature;
    } catch (error) {
      console.error('Message signing error:', error);
      throw error;
    }
  };

  const sendTransaction = async (transaction, options = {}) => {
    if (!wallet || !connected || !connection) {
      throw new Error('Wallet or connection not available');
    }

    try {
      
      const signature = await connection.sendTransaction(transaction, [wallet], options);
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');
       console.log('Sending transaction:', transaction);
      return { signature, confirmation };
      
     
    
    } catch (error) {
      console.error('Transaction send error:', error);
      throw error;
    }
  };

  const getBalance = async () => {
    if (!connection || !walletAddress) {
      return 0;
    }

    try {
 
      
      const publicKey = new PublicKey(walletAddress);
      const balance = await connection.getBalance(publicKey);
      return balance / 1000000000; // Convert lamports to SOL
      
    
    } catch (error) {
      console.error('Balance fetch error:', error);
      return 0;
    }
  };

  const executeAnchorProgram = async (program, method, args = [], accounts = {}) => {
    if (!anchorProvider) {
      throw new Error('Anchor provider not initialized');
    }

    try {
      // In a real app with Anchor:
      // const tx = await program.methods[method](...args)
      //   .accounts(accounts)
      //   .rpc();
      // return tx;
      
      console.log('Executing Anchor program:', { method, args, accounts });
      return 'mock_transaction_signature';
    } catch (error) {
      console.error('Anchor program execution error:', error);
      throw error;
    }
  };





const findFactoryPDA = (programId) =>
  PublicKey.findProgramAddressSync([Buffer.from("factory")], programId);

const findConfigPDA = (factory, basketCount) =>
  PublicKey.findProgramAddressSync(
    [
      Buffer.from("config"),
      factory.toBuffer(),
      Buffer.from(Uint8Array.from(new anchor.BN(basketCount).toArray("le", 8)))
    ],
    new PublicKey(idl.metadata.address)
  );

const findMintAuthorityPDA = (config) =>
  PublicKey.findProgramAddressSync(
    [Buffer.from("mint-authority"), config.toBuffer()],
    new PublicKey(idl.metadata.address)
  );

const findMetadataPDA = (mint) =>
  PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer()
    ],
    METADATA_PROGRAM_ID
  );

const createBasket = async (
  name,
  symbol,
  uri,
  decimals,
  tokenMints,
  weights
) => {
  if (!name || !symbol || !uri || !decimals || !tokenMints || !weights) {
    throw new Error("All parameters are required to create a basket");
  }
  if (tokenMints.length !== weights.length) {
    throw new Error("Token mints and weights must have the same length");
  }
  if (tokenMints.length < 2 || tokenMints.length > 10) {
    throw new Error("Token mints must be between 2 and 10");
  }
  if (weights.reduce((a, b) => a + b, 0) !== 100) {
    throw new Error("Weights must sum to 100");
  }
  // covert weight to anchor.BN

  const weightsBN = weights.map(weight => new anchor.BN(weight));
  if (!Array.isArray(weightsBN) || weightsBN.length !== tokenMints.length) {
    throw new Error("Weights must be an array with the same length as token mints");
  }
  //convert tokenMints to PublicKey
  const tokenMintsPublicKey = tokenMints.map(mint => new PublicKey(mint));
  if (!Array.isArray(tokenMintsPublicKey) || tokenMintsPublicKey.length !== tokenMints.length) {
    throw new Error("Token mints must be an array with the same length as weights");
  }

  if (!anchorProvider || !wallet || !connection) throw new Error("Wallet not ready");

  const payer = wallet.publicKey;
  const program = new Program(idl, new PublicKey(idl.metadata.address), anchorProvider);

  const mintKeypair = Keypair.generate();

  const [factoryPDA] = findFactoryPDA(program.programId);
  const factoryAccount = await program.account.factoryState.fetch(factoryPDA);
  const basketCount = factoryAccount.basketCount.toNumber();

  const [configPDA] = findConfigPDA(factoryPDA, basketCount);
  const [mintAuthorityPDA] = findMintAuthorityPDA(configPDA);
  const [metadataPDA] = findMetadataPDA(mintKeypair.publicKey);

  const tx = await program.methods
    .createBasket(name, symbol, uri, decimals, tokenMintsPublicKey, weightsBN)
    .accounts({
      payer,
      config: configPDA,
      mintAuthority: mintAuthorityPDA,
      metadataAccount: metadataPDA,
      mintAccount: mintKeypair.publicKey,
      tokenMetadataProgram: METADATA_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .signers([mintKeypair])
    .rpc();

  console.log("Basket created successfully:", tx);
  return {
    transactionSignature: tx,
    mintAddress: mintKeypair.publicKey.toBase58(),
    config: configPDA.toBase58()
  };
};


  const value = {
    // State
    wallet,
    walletAddress,
    connected,
    connecting,
    walletType,
    connection,
    anchorProvider,
    
    // Actions
    connectWallet,
    disconnectWallet,
    signTransaction,
    signAllTransactions,
    signMessage,
    sendTransaction,
    getBalance,
    executeAnchorProgram,
    createBasket,
    
    // Utilities
    formatAddress: (address) => address ? `${address.slice(0, 4)}...${address.slice(-4)}` : '',
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use wallet context
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};