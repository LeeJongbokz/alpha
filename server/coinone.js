var CoinoneAPI = require('coinone-api');

var coinoneAPI = new CoinoneAPI('58b657ad-7221-4160-a6da-4287762a5b88','802262bf-2547-4fd8-a0e1-43dbd4cfe278');

 
coinoneAPI.balance().then(function(response){
    console.log(response.data)
  })
   