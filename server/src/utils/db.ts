import mysql from 'mysql';
import rp from 'request-promise';
import dotenv from "dotenv";

dotenv.config();

const config = process.env;

export const connection = mysql.createConnection({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
})

connection.connect(function(err){
    if(err){
        console.error('error connection:' + err.stack);
        return; 
    }

    console.log('connected as id ' + connection.threadId);
});

const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100&convert=USD',
  qs: {
    'start': '1',
    'limit': '100',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': '0ab7ee0a-c41f-46c3-84aa-9bbb84a55e67'
  },
  json: true,
  gzip: true
};

const interval = setInterval(() => {
  console.log('10초마다 실행');

  rp(requestOptions).then(response => {
  
    for(let i=0; i<100; i++){
      const selectQuery = 'SELECT * from coin where name=?';
  
      connection.query(selectQuery, [response.data[i].name], function(error, results, fields){
        
        if(error) throw error;

        if(results[0]){
  
          const updateQuery = 'UPDATE coin SET priceUSD=?, priceKRW=?, percent_change_24h=? where coinmarketcapID=?';
          const updateParams = [response.data[i].quote.USD.price, Math.round(response.data[i].quote.USD.price*1181.5), response.data[i].quote.USD.percent_change_24h, response.data[i].id];
           
          connection.query(updateQuery, updateParams, function(error, results, fields){
             if(error) throw error;
        
          });
  
        }else{
          
         const insertQuery = 'INSERT INTO coin (coinmarketcapID, name, symbol, priceUSD, priceKRW, percent_change_24h) VALUES (?, ?, ?, ?, ?, ?)';
         const insertParams = [response.data[i].id, response.data[i].name, response.data[i].symbol, response.data[i].quote.USD.price, Math.round(response.data[i].quote.USD.price*1181.5), response.data[i].quote.USD.percent_change_24h];
         
         connection.query(insertQuery, insertParams, function(error, results, fields){
            if(error) throw error;
          
         });
      
        }
      });
    }
  
  }).catch((err) => {
    console.log('API call error:', err.message);
  });

}, 10000);



connection.query('SELECT * from Coin', (error, rows, fields) => {
  if(error) throw error;


  for(let i=0; i< rows.length; i++){

    if(rows[i].logoURL === null){
      
      const logoRequestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
        qs: {
          'id': rows[i].coinmarketcapID
        },
        headers: {
          'X-CMC_PRO_API_KEY': '0ab7ee0a-c41f-46c3-84aa-9bbb84a55e67'
        },
        json: true,
        gzip: true
      };
      
      rp(logoRequestOptions).then(response => {
  
        const updateQuery = 'UPDATE coin SET logoURL=? where coinmarketcapID=?';
        const updateParams = [response.data[rows[i].coinmarketcapID].logo, rows[i].coinmarketcapID];
         
        connection.query(updateQuery, updateParams, function(error, results, fields){
           if(error) throw error;
      
        });
      
      }).catch((err) => {
        console.log('API call error:', err.message);
      });
      
    }
  }
});

