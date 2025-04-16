import {onRequest} from 'firebase-functions/v2/https';
import express from 'express';

const app = express();

app.get('/api/public/', async (req, res) => {
  res.send('Hello world!');
});

export default onRequest(app);
