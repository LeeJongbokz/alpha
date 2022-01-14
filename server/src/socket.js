const WebSocket = require('ws');

import { connection } from './utils/db.js';

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        const ip = req.headers['x-forwared-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속', ip);
        ws.on('message', (message) => {
            console.log(message);
        });
        ws.on('error', (error) => {
            console.error(error);
        });
        ws.on('close', () => {
            console.log('클라이언트 접속 해제', ip);
            clearInterval(ws.interval);
        });
        const interval = setInterval(() => {
            if(ws.readyState === ws.OPEN){

                const selectQuery = 'SELECT * from coin';

                connection.query(selectQuery, function(error, results, fields){
                    if(error) throw error;
                    console.log(results[0].logoURL);
                    ws.send(JSON.stringify(results));
                });


                // ws.send(coinData);
            }
        }, 10000);
        ws.interval = interval;
    });
};


export const getCoinLists = async(req, res) => {

  const selectQuery = 'SELECT * from coin';
  connection.query(selectQuery, function(error, results, fields){
    if(error) throw error;
    
    const coins = results;

    return res.status(200).send({
      coins,
    })

  });

}

