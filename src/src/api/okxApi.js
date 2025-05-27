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
    console.log("Fetching supported tokens from OKX API");
    const method = 'GET';
    const endpoint = '/market/supported/chain?chainIndex=501';
    const headers = generateHeaders(endpoint, method);

    return await apiRequest(OKX_BASE_URL, method, headers, endpoint);
};
