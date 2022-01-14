import express from "express";
import {getHome} from './apis/home';
import {getUserBalance} from './apis/user';
import {signUp, login} from './apis/auth';
import {getCoinLists} from './apis/coin';

const router = express.Router();

router.get('/', getHome);

// auth
router.post('/auth/signup', signUp);
router.post('/auth/login', login);

// coin
router.get('/api/coinLists', getCoinLists);

router.get('/api/user/balance', getUserBalance);

export default router;