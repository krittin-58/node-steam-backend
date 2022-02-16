var axios = require('axios');

const STEAM_STORE_API_URL = 'https://store.steampowered.com';
// const STEAM_WEB_API_URL = 'https://api.steampowered.com';
// const STEAM_API_KEY = '<STEAM API KEY>';

axios.defaults.baseURL = STEAM_STORE_API_URL;

// const instance = axios.create({
//     baseURL: STEAM_STORE_API_URL,
//     headers: {

//     }
//   });

const getProduct = async () => {
    try {
      const response = await axios.get(`${STEAM_STORE_API_URL}/api/featured`);
      // do something about response
    } catch (error) {
      console.log('Request canceled', error.message);
      axios.isCancel(error)
    }
  }

module.exports = {
    getProduct
}
