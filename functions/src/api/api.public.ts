import {onRequest} from 'firebase-functions/v2/https';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({origin: true}));

app.get('/api/public/', async (req, res) => {
  res.send('Hello world!');
});

export default onRequest(app);
