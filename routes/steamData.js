var express = require('express');
var router = express.Router();
var request = require('request');

var steam_store_url = 'https://store.steampowered.com';

var steam_featured_json;
var steam_featured_categories_json;
var steam_appdetails_id;

router.get('/', function (req, res, next) {
  res.send('HTTP 200 OK');
});
// Steam Store API //
// Get Featured
router.get('/featured',async function (req, res, next) {
  await request(`${steam_store_url}/api/featured`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    steam_featured_json = body;
  });

  res.json(steam_featured_json);
});

// Get Featured Categories
router.get('/featured/categories', async function (req, res, next) {
  await request(`${steam_store_url}/api/featuredcategories`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    steam_featured_categories_json = body;
  });

  res.json(steam_featured_categories_json);
});

// Get appdetails ID
router.get('/appdetails/:id', async function (req, res, next) {
  await request(`${steam_store_url}/api/appdetails/?appids=${req.params.id}`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    steam_appdetails_id = body;
  });

  res.json(steam_appdetails_id);
});

//// END STEAM STORE API ////

//// START STEAM WEB API ////
var steam_web_url = 'https://api.steampowered.com';
var steam_web_api_key = '<STEAM API KEY>';

var getNewsApp;
var getGlobalAchievement;
var getPlayerSummaries;
var getFriendList;
var getPlayerAchievements;
var GetUserStatsForGame;

// Get News App Id
router.get('/GetNewsForApp/:id', async function (req, res, next) {
  await request(`${steam_web_url}/ISteamNews/GetNewsForApp/v0002/?appid=${req.params.id}&format=json`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    getNewsApp = body;
  });

  return res.json(getNewsApp);
});

// GetGlobalAchievementPercentagesForApp
router.get('/GetGlobalAchievementPercentagesForApp/:id', async function (req, res, next) {
  await request(`${steam_web_url}/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${req.params.id}&format=json`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    getGlobalAchievement = body;
  });

  res.json(getGlobalAchievement);
});

// GetPlayerSummaries
router.get('/GetPlayerSummaries/:id',async function (req, res, next) {
  await request(`${steam_web_url}/ISteamUser/GetPlayerSummaries/v0002/?key=${steam_web_api_key}&steamids=${req.params.id}&format=json`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    getPlayerSummaries = body;
  });

  res.json(getPlayerSummaries);
});

// GetFriendList
router.get('/GetFriendList/:id', async function (req, res, next) {
  try {
    await request(`${steam_web_url}/ISteamUser/GetFriendList/v0001/?key=${steam_web_api_key}&format=json&steamid=${req.params.id}&relationship=friend`, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      getFriendList = body;
    });

    res.json(getFriendList);
  } catch (err) {
    res.json('Error');
  }

});

// Get PlayerAchievements
router.get('/GetPlayerAchievements/:steamId/app/:appId',async function (req, res, next) {
  try {
    await request(`${steam_web_url}/ISteamUserStats/GetPlayerAchievements/v0001/
    ?key=${steam_web_api_key}
    &format=json
    &steamid=${req.params.steamId}
    &appid=${req.params.appId}`, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      getPlayerAchievements = body;
    });

    res.json(getPlayerAchievements);
  } catch (err) {
    res.send('Error');
  }

});

// GetUserStatsForGame
router.get('/GetUserStatsForGame/:id',async function (req, res, next) {
  try {
    await request(`${steam_web_url}/ISteamUserStats/GetUserStatsForGame/v0002/
    ?key=${steam_web_api_key}
    &steamid=${req.params.id}
    &appid=55230`, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      GetUserStatsForGame = body;
    });

    res.json(GetUserStatsForGame);
  } catch (err) {
    res.send('Error');
  }

});

module.exports = router;
