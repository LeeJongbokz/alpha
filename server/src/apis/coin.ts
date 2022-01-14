
import { connection } from '../utils/db.js';

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

