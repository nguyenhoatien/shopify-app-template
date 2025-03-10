import {onRequest} from 'firebase-functions/v2/https';
import express from 'express';
import shopify, {sessionStorage} from '../shopify.server';

const app = express();

app.use(async (req, res, next) => {
  const shop = req.query.shop as string ||
    new URL(req.headers['origin'] || req.headers['referer'] || '').hostname;

  if (shop) {
    const sessions = await sessionStorage.findSessionsByShop(shop);

    if (sessions.length > 0) {
      res.locals.shopify = {
        session: sessions[0],
      };

      return next();
    }
  }
  res.status(403).send('Unauthorized');
});

// run in the console tab at the storefront where the app is installed
// note: my-awesome-app-155 need to be replaced with your app's id,
// you can find it in shopify.app.toml > app_proxy > subpath
// fetch('/apps/my-awesome-app-155/')
//   .then(response => response.json())
//   .then(data => console.log(data));
app.get('/api/storefront/', async (req, res) => {
  const session = res.locals.shopify.session;
  const client = new shopify.api.clients.Graphql({session});

  const response = await client.request(
    `#graphql
    query ShopName {
      shop {
        name
      }
    }`
  );

  res.status(200).json({
    message: `Hello, ${response.data.shop.name}!`,
  });
});

export default onRequest(app);
