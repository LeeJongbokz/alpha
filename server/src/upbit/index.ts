const request = require('request')
const uuidv4 = require("uuid/v4")
const sign = require('jsonwebtoken').sign
require('dotenv').config();
 
const access_key = "DXqPygWmv3azVL0kP6Nz6wI3rpxS5RC5xsgltfKl"
const secret_key = "klxiFWVkChdT1xgr7i8izAeoY9AvlCD5fWPpripM"
const server_url = "https://api.upbit.com" 

const payload = {
    access_key: access_key,
    nonce: uuidv4(),
}
 
const token = sign(payload, secret_key)
 
const options = {
    method: "GET",
    url: server_url + "/v1/accounts",
    headers: {Authorization: `Bearer ${token}`},
}

export const initializeUpbit = async() => {

    try {
        await request(options, (error, response, body) => {
            if (error) throw new Error(error)
            console.log(body);
            global.KRWbalance = JSON.parse(body)[0].balance;
        })
    }catch(error){
        return error;
    }
}
