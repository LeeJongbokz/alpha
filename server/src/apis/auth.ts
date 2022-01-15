import {
    encryptCredential,
    validateCredential
} from '../utils/auth';

import { connection } from '../utils/db';
import { rejects } from 'assert';

// 중복 이메일을 확인
const emailExists = (email) => {
    return new Promise((resolve) => {
      connection.query(
        'SELECT * FROM User WHERE email=?',
        [email],
        (error, result) => {
          if(error) rejects(error);
  
          if (result && result[0]) {
            resolve(true);
          }
          resolve(false);
        });
    });
};


// 새 유저 생성
const makeUser = (email, hashedPassword) => {
    return new Promise((resolve) => {
      connection.query(
        'INSERT INTO User (email, password) VALUES (?, ?)',
        [email, hashedPassword],
        (error, result) => {
          if(error) rejects(error);
  
          if (result.affectedRows) {
            resolve(true);
          }
  
          resolve(false);
        });
    });
};


// email에 해당하는 유저 검색
const searchUser = (email) => {
    return new Promise((resolve) => {
      connection.query(
        'SELECT * FROM User WHERE email=?',
        [email],
        (error, result) => {
          if(error) rejects(error);
  
          resolve(result[0]);
        });
    });
};
  



export const signUp = async(req, res) => {

    const newUser = req.body;
    
    const duplicateEmailResult = await emailExists(newUser.email);

    // 중복 이메일이 존재한다면 
    if(duplicateEmailResult){
        return res.status(400).send({
            success: false,
            error: 'takenEmail',
            message: 'Email is already taken'
        })
    }

    
    const hashedPassword = await encryptCredential(newUser.password);
    
    const insertResult = await makeUser(newUser.email, hashedPassword);

    // 새 유저가 생성되었다면 
    if(insertResult){
        return res.status(200).send({
            success: true
        })
    }

}



export const login = async(req, res) => {

    const {email, password} = req.body;

    const user: any = await searchUser(email);

    // email에 해당하는 유저가 존재하지 않는다면 
    if(user.length === 0){
        return res.status(400).send({
            success: false,
            error: 'noExistsEmail',
            message: 'Email does not exist'
        })
    }
   
    const isPasswordValid = await validateCredential(password, user.password);

    // 패스워드가 유효하다면 
    if(isPasswordValid){
        return res.status(200).send({
            success: true
        })
    }
}