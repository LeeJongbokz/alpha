import express from "express";

import "./utils/db.ts";

import morgan from 'morgan';
import routes from './routes';
import dotenv from "dotenv";

const webSocket = require('./socket');

const app = express();

dotenv.config();

const PORT = 3000;

app.use(morgan('dev'));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

app.use('/', routes);

const handleListening = () => {
    console.log('Listening to localhost:3000');
}

const server = app.listen(PORT, handleListening);

webSocket(server);