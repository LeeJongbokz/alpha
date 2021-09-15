import express from "express";

import {getHome} from './apis/home';
import {getUserBalance} from './apis/user';

const router = express.Router();

router.get('/', getHome);

router.get('/api/user/balance', getUserBalance);

export default router;