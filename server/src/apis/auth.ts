import {
    encryptCredential,
    validateCredential
} from '../utils/auth';

import { connection } from '../utils/db.js';


export const signUp = async(req, res) => {

    const newUser = req.body;
    
    const selectQuery = 'SELECT * FROM User WHERE email=?';

    connection.query(selectQuery, [newUser.email], function(err, rows, fields){
    });
    
    const insertQuery = 'INSERT INTO User (email, password) VALUES (?, ?)';

    const hashedPassword = await encryptCredential(newUser.password);

    connection.query(insertQuery, [newUser.email, hashedPassword], function(err, rows, fields){
        return res.status(200).send({
            success: true
        })
    });

}



export const login = async(req, res) => {

    const {email, password} = req.body;
    
    const selectQuery = 'SELECT * FROM User WHERE email=?';

    // const isPasswordValid = await validateCredential(password, user[0].password);

    connection.query(selectQuery, [email], function(err, rows, fields){
        return res.status(200).send({
            success: true
        })
    });
    
}