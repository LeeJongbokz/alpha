const request = require('request')
const uuidv4 = require("uuid/v4")
const sign = require('jsonwebtoken').sign
require('dotenv').config();
 
const access_key = "22dfb469be878e9fb2234d150313d498"
const secret_key = "5850e225081c4e0ec5c57a5d7be66c89"
const server_url = "https://api.bithumb.com" 

const payload = {
    access_key: access_key,
    nonce: uuidv4(),
}
 
const token = sign(payload, secret_key)
 
const options = {
    method: "GET",
    url: server_url + "/info/balance",
    headers: {Authorization: `Bearer ${token}`},
}
 
request(options, (error, response, body) => {
    if (error) throw new Error(error)
    console.log(body);
})
