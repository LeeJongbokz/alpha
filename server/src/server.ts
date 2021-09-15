import express from "express";

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import routes from './routes';
import dotenv from "dotenv";

import {initializeUpbit} from './upbit';

const app = express();

dotenv.config();

const PORT = 3000;

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/', routes);


const handleListening = () => {
    console.log('Listening to localhost:/3000');
}

const runServer = async() => {

    await initializeUpbit()
    app.listen(PORT, handleListening);
}

runServer()
