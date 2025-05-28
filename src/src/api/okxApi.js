const OKX_BASE_URL = import.meta.env.VITE_OKX_API_URL;
import CryptoJS from 'crypto-js';
import { apiRequest } from "./api";

const generateHeaders = (endpoint, method = 'GET', body = '') => {
    const timestamp = new Date().toISOString();
    const secret = import.meta.env.VITE_OKX_API_SECRET;

    const prehashString = timestamp + method.toUpperCase() + endpoint + (body || '');
    const sign = CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(prehashString, secret)
    );

    return {
        'Content-Type': 'application/json',
        'OK-ACCESS-SIGN': sign,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-KEY': import.meta.env.VITE_OKX_API_KEY,
        'OK-ACCESS-PASSPHRASE': import.meta.env.VITE_OKX_API_PASSPHRASE,
    };
};

export const getSupportedTokens = async () => {
sendPostRequest(postRequestPath, postParams);
    console.log("Fetching supported tokens from OKX API");
    const method = 'GET';
    const endpoint = '/market/supported/chain?chainIndex=501';
    const headers = generateHeaders(endpoint, method);

    return await apiRequest(OKX_BASE_URL, method, headers, endpoint);
};


/**
 * @fileOverview Service for interacting with the OKX API (v5).
 * This service encapsulates calls to the OKX DEX API for fetching market data, token prices, etc.
 * OKX API v5 Documentation: https://www.okx.com/docs-v5/en/
 */

import crypto from 'crypto';

// If you're using .env in Vite, ensure environment variables are prefixed with VITE_
const OKX_API_BASE_URL = 'https://www.okx.com';

// Helper function to generate authentication headers for OKX API v5
const getOkxAuthHeaders = (method, requestPath, body) => {
  const timestamp = new Date().toISOString();
  const apiKey = import.meta.env.VITE_OKX_API_KEY;
  const secretKey = import.meta.env.VITE_OKX_API_SECRET;
  const passphrase = import.meta.env.VITE_OKX_API_PASSPHRASE;

  if (!apiKey || !secretKey || !passphrase) {
    console.error('VITE_OKX_API_KEY, VITE_OKX_SECRET_KEY, or VITE_OKX_PASSPHRASE is not configured in .env');
    return null;
  }

  let bodyString = '';
  if (body) {
    bodyString = typeof body === 'object' ? JSON.stringify(body) : body;
  }

  const signaturePayload = timestamp + method.toUpperCase() + requestPath + bodyString;

  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(signaturePayload)
    .digest('base64');

  return {
    'OK-ACCESS-KEY': apiKey,
    'OK-ACCESS-SIGN': signature,
    'OK-ACCESS-TIMESTAMP': timestamp,
    'OK-ACCESS-PASSPHRASE': passphrase,
    'Content-Type': 'application/json',
  };
};

/**
 * Fetches a summary of current market conditions from OKX DEX.
 * It fetches ticker data for major pairs like BTC-USDT, ETH-USDT, and OKT-USDT.
 */
export async function fetchOkxMarketSummary() {
  const pairsToFetch = ['BTC-USDT', 'ETH-USDT', 'OKT-USDT'];
  const summaryParts = [];

  try {
    for (const pair of pairsToFetch) {
      const requestPath = `/api/v5/market/ticker?instId=${pair}`;
      const authHeaders = getOkxAuthHeaders('GET', requestPath);

      if (!authHeaders) {
        return "OKX API credentials not configured. Cannot fetch market data.";
      }

      const response = await fetch(`${OKX_API_BASE_URL}${requestPath}`, {
        method: 'GET',
        headers: authHeaders,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`OKX API Error for ${pair} (${requestPath}): ${response.status}`, errorData);
        summaryParts.push(`${pair}: Error fetching data (${errorData.msg || response.statusText})`);
        continue;
      }

      const result = await response.json();
      if (result.data && result.data.length > 0) {
        const ticker = result.data[0];
        const price = parseFloat(ticker.last).toFixed(2);
        const openPrice = parseFloat(ticker.open24h);
        const change = openPrice !== 0 ? ((parseFloat(ticker.last) - openPrice) / openPrice) * 100 : 0;
        summaryParts.push(`${ticker.instId} last price: ${price} USDT (24h Change: ${change.toFixed(2)}%, 24h Vol: ${parseFloat(ticker.volCcy24h).toLocaleString()} USDT)`);
      } else {
        summaryParts.push(`${pair}: No data found.`);
      }
    }

    if (summaryParts.length === 0) {
      return "Failed to fetch any market data from OKX.";
    }

    return `OKX DEX Real Data Snapshot: ${summaryParts.join('; ')}. Market conditions are dynamic.`;
  } catch (error) {
    console.error('Error fetching OKX market summary:', error);
    if (error.cause && error.cause.code === 'UND_ERR_CONNECT_TIMEOUT') {
      return 'Failed to connect to OKX API for market summary (Connection Timeout). Using fallback: Market is dynamic.';
    }
    return `Failed to connect to OKX API for market summary. Error: ${error.message || 'Unknown error'}. Using fallback: Market is dynamic.`;
  }
}

/**
 * Fetches the current USD price for a given token symbol from OKX.
 * Assumes the token is traded against USDT.
 */
export async function fetchTokenPriceFromOKX(tokenSymbol) {
  const normalizedSymbol = tokenSymbol.toUpperCase();
  if (normalizedSymbol === 'USDT' || normalizedSymbol === 'USDC') return 1.00;

  const instId = `${normalizedSymbol}-USDT`;
  const requestPath = `/api/v5/market/ticker?instId=${instId}`;
  const authHeaders = getOkxAuthHeaders('GET', requestPath);

  if (!authHeaders) {
    console.error("OKX API credentials not configured. Cannot fetch token price.");
    return null;
  }

  try {
    const response = await fetch(`${OKX_API_BASE_URL}${requestPath}`, {
      method: 'GET',
      headers: authHeaders,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`OKX Price API Error for ${instId} (${requestPath}): ${response.status}`, errorData);
      return null;
    }

    const result = await response.json();
    if (result.data && result.data.length > 0 && result.data[0].last) {
      return parseFloat(result.data[0].last);
    }

    console.warn(`No price data found for ${instId} on OKX.`);
    return null;
  } catch (error) {
    console.error(`Error fetching price for ${tokenSymbol} from OKX:`, error);
    return null;
  }
}
