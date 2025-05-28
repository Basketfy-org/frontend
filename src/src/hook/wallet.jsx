// hooks/useWallet.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL, SYSVAR_RENT_PUBKEY, SystemProgram, Keypair } from '@solana/web3.js';
import { AnchorProvider } from '@coral-xyz/anchor';
import idl from '../components/contract/basketfy.json';
import * as anchor from '@coral-xyz/anchor';
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID, } from '@solana/spl-token';

// Wallet Context
const WalletContext = createContext({});

// Constants
const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

// Wallet Provider Component
export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [walletType, setWalletType] = useState('');
  const [connection, setConnection] = useState(null);
  const [anchorProvider, setAnchorProvider] = useState(null);
  const [program, setProgram] = useState(null);

  // Initialize Solana connection
  useEffect(() => {
    initializeSolanaConnection();
    checkExistingConnection();
  }, []);

  // Initialize program when anchor provider is set
  useEffect(() => {
    if (anchorProvider) {
      initializeProgram();
    }
  }, [anchorProvider]);

  const initializeSolanaConnection = () => {
    try {
      // You can switch between devnet, testnet, mainnet-beta
      const rpcUrl = 'https://api.devnet.solana.com';
      //process.env.REACT_APP_SOLANA_RPC_URL ||;

      const conn = new Connection(rpcUrl, 'confirmed');
      setConnection(conn);

      console.log('Solana connection initialized:', rpcUrl);
    } catch (error) {
      console.error('Failed to initialize Solana connection:', error);
    }
  };

  const initializeProgram = () => {
    try {
      if (!anchorProvider) return;

      const programInstance = new anchor.Program(idl, anchorProvider);
      setProgram(programInstance);

      console.log('Program initialized:', programInstance.programId.toString());
    } catch (error) {
      console.error('Failed to initialize program:', error);
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
      if (!connection) {
        console.error('Connection not available for Anchor provider setup');
        return;
      }

      const provider = new AnchorProvider(connection, walletAdapter, {
        commitment: 'confirmed',
        preflightCommitment: 'confirmed',
      });
      anchor.setProvider(provider);
      setAnchorProvider(provider);

      console.log('Anchor provider setup for wallet:', walletAdapter.publicKey?.toString());
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
    setProgram(null);
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
      console.log('Transaction sent:', signature);
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

  // Helper functions for basket creation
  const findFactoryPDA = (programId) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("factory")],
      programId
    );
  };

  const findConfigPDA = (factory, basketCount) => {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("config"),
        factory.toBuffer(),
        basketCount.toArrayLike(Buffer, "le", 8)
      ],
      program.programId
    );
  };

  const findMintAuthorityPDA = (config) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("mint-authority"), config.toBuffer()],
      program.programId
    );
  };

  const findMetadataPDA = (mint) => {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer()
      ],
      METADATA_PROGRAM_ID
    );
  };

  // Main basket creation function
  const createBasket = async (name, symbol, uri, decimals, tokenMints, weights) => {
    if (!wallet || !connected || !program || !anchorProvider) {
      throw new Error('Wallet not connected or program not initialized');
    }

    try {


      // Validate inputs
      if (tokenMints.length === 0 || weights.length === 0) {
        throw new Error('Token mints and weights are required');
      }

      if (tokenMints.length !== weights.length) {
        throw new Error('Token mints and weights arrays must have the same length');
      }

      const payer = new PublicKey(walletAddress);
      const mintKeypair = Keypair.generate();

      // Find PDAs
      const [factoryPDA] = findFactoryPDA(program.programId);
      const factoryAccount = await program.account.factoryState.fetch(factoryPDA);
      const basketCount = factoryAccount.basketCount;

      const [configPDA] = findConfigPDA(factoryPDA, basketCount);
      const [mintAuthorityPDA] = findMintAuthorityPDA(configPDA);
      const [metadataPDA] = findMetadataPDA(mintKeypair.publicKey);

      console.log('Creating basket with:', {
        name,
        symbol,
        uri,
        decimals,
        tokenMints: tokenMints,
        weights: weights,
        factoryPDA: factoryPDA.toString(),
        configPDA: configPDA.toString(),
        mintKeypair: mintKeypair.publicKey.toString()
      });
      // Convert token mint strings to PublicKey objects
      const tokenMintPublicKeys = tokenMints.map(mint => {
        try {
          return new PublicKey(mint);
        } catch (error) {
          throw new Error(`Invalid token mint address: ${mint}`);
        }
      });

      // Convert weights to anchor.BN (BigNumber) objects
      const weightsBN = weights.map(weight => new anchor.BN(weight * 100));
      // Create the transaction
      const tx = await program.methods
        .createBasket(
          name,
          symbol,
          uri,
          decimals,
          tokenMintPublicKeys,
          weightsBN
        )
        .accounts({
          payer: payer,
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
        success: true,
        transactionSignature: tx,
        configPDA: configPDA.toString(),
        mintAddress: mintKeypair.publicKey.toString(),
        basketDetails: {
          name,
          symbol,
          uri,
          decimals,
          tokenMints,
          weights,
          basketReferenceId: basketCount.toString(),
        }
      };

    } catch (error) {
      console.error("Error creating basket:", error);
      throw {
        success: false,
        error: error.message || 'Failed to create basket'
      };
    }
  };


  const buyBasket = async (amount, basketMint,basketId) => {
    if (!wallet || !connected || !program || !anchorProvider) {
      throw new Error('Wallet not connected or program not initialized');
    }
    console.log('Buying basket with amount:', amount, 'and basketMint:', basketMint);
    try {
      const payer = new PublicKey(walletAddress);
      basketMint = new PublicKey(basketMint);

         // Get the token account of the sender
        const userTokenAccount = await getAssociatedTokenAddress(
            basketMint,
            payer
        );

        // Check if token account exists, if not create it
        try {
            await program.provider.connection.getTokenAccountBalance(userTokenAccount);
        } catch (error) {
            console.log("Creating associated token account for sender...");
            const createATAIx = createAssociatedTokenAccountInstruction(
               payer,
                userTokenAccount,
                payer,
                basketMint
            );
            const tx = new anchor.web3.Transaction().add(createATAIx);
            await program.provider.sendAndConfirm(tx,[]);
        }


      // Find PDAs
      const [factoryPDA] = findFactoryPDA(program.programId);
      const [configPDA] = findConfigPDA(factoryPDA, new anchor.BN(basketId));
      const [mintAuthorityPDA] = findMintAuthorityPDA(configPDA);

console.log('Found PDAs:' )
      console.log('Creating basket mint with:', {
        userTokenAccount: userTokenAccount.toString(),
        factoryPDA: factoryPDA.toString(),
        configPDA: configPDA.toString(),
        basketMint: basketMint.toString()
      });


      // Create the transaction
      const tx = await program.methods
        .mintBasketToken(
         new anchor.BN(amount * LAMPORTS_PER_SOL) // Convert amount to lamports
        )
        .accounts({
          config: configPDA,
          mintAuthority: mintAuthorityPDA,
          mint: basketMint,
          recipientTokenAccount: userTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
       
        .rpc();

      console.log("Basket mint created successfully:", tx);

      return {
        success: true,
        transactionSignature: tx,
        configPDA: configPDA.toString(),
        mintAddress: basketMint.publicKey.toString(),
        message: `Successfully bought ${amount} of the basket`
      };

    } catch (error) {
      console.error("Error buying basket:", error);
      return {
        success: false,
        transactionSignature: "",
        configPDA: "",
        mintAddress: "",
        error: error.message || 'Failed to buy basket'
      };
    }
  };

  // Get factory information
  const getFactoryInfo = async () => {
    if (!program) {
      throw new Error('Program not initialized');
    }

    try {
      const [factoryPDA] = findFactoryPDA(program.programId);
      const factoryAccount = await program.account.factoryState.fetch(factoryPDA);

      return {
        factoryPDA: factoryPDA.toString(),
        basketCount: factoryAccount.basketCount.toString(),
        authority: factoryAccount.authority.toString()
      };
    } catch (error) {
      console.error("Error fetching factory info:", error);
      throw error;
    }
  };

  // Get basket configuration
  const getBasketConfig = async (configPDA) => {
    if (!program) {
      throw new Error('Program not initialized');
    }

    try {
      const configPublicKey = new PublicKey(configPDA);
      const configAccount = await program.account.basketConfig.fetch(configPublicKey);

      return {
        name: configAccount.name,
        symbol: configAccount.symbol,
        decimals: configAccount.decimals,
        mintAccount: configAccount.mintAccount.toString(),
        authority: configAccount.authority.toString(),
        tokenMints: configAccount.tokenMints.map(mint => mint.toString()),
        weights: configAccount.weights.map(weight => weight.toString()),
        totalSupply: configAccount.totalSupply.toString()
      };
    } catch (error) {
      console.error("Error fetching basket config:", error);
      throw error;
    }
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
    program,

    // Actions
    connectWallet,
    disconnectWallet,
    signTransaction,
    signAllTransactions,
    signMessage,
    sendTransaction,
    getBalance,
    setAnchorProvider,


    // Basket operations
    createBasket,
    getFactoryInfo,
    getBasketConfig,
    buyBasket,

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