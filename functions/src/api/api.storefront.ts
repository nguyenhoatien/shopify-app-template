import {onRequest} from 'firebase-functions/v2/https';
import express from 'express';

const app = express();

app.get('/api/storefront/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api/storefront/test/', (req, res) => {
  res.send('Hello from test!');
});

export default onRequest(app);
