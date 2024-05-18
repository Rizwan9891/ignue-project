import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import { mongoUrl } from './_config/db.config.js'
const PORT = 3000

mongoose.set('strictQuery', false);
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((connected) => {
    console.log('Mongodb connected successfully.');
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer(app)

import authRoute from './_routes/auth.route.js';
authRoute(app);

app.get("/", (req, res) => {
    res.status(200).json(`Backend version 1.0.0 working `);
});
server.listen(PORT, () => {
    console.log(`Backend server listening at ${PORT}`);
});