const OKX_BASE_URL =import.meta.env.VITE_OKX_API_URL;
import CryptoJS from 'crypto-js';
import { apiRequest } from "./api";

const allTokensEndpoint = '/market/supported/chain?chainIndex=501';

const generateHeaders = (endpoint) => {
    const timestamp = new Date().toISOString();
    const secret = import.meta.env.VITE_OKX_API_SECRET;
    // You also need to generate OK-ACCESS-SIGN here using HMAC-SHA256
    const prehashString = timestamp + 'GET' + endpoint;
    const sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(prehashString, secret));

    return {
        'Content-Type': 'application/json',
        'OK-ACCESS-SIGN': sign,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-KEY': import.meta.env.VITE_OKX_API_KEY,
        'OK-ACCESS-PASSPHRASE': import.meta.env.VITE_OKX_API_PASSPHRASE,
    };
};

import { RestClient } from 'okx-api';

const client = new RestClient({

  apiKey:  import.meta.env.VITE_OKX_API_KEY,
  apiSecret:import.meta.env.VITE_OKX_API_SECRET,
  apiPass: import.meta.env.VITE_OKX_API_PASSPHRASE,
});

client.getSupportCoin()
console.log(client.getSupportCoin())
// Specific methods if needed

export const getSupportedTokens = () => {
   console.log(client.getSupportCoin())
   return  apiRequest(OKX_BASE_URL, 'GET',generateHeaders(allTokensEndpoint), '/aggregator/all-tokens?chainIndex=501')
};

