import axios from "axios";

export const getBTC = async () => {
    const btc = await axios('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
    return btc.data.bitcoin.usd;
};