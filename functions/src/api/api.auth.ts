import {onRequest} from 'firebase-functions/v2/https';
import express from 'express';
import shopify from '../shopify.server';
import {db} from '../firebase.server';

const app = express();
// Fix: Firebase Hosting strips cookies (https://firebase.google.com/docs/hosting/manage-cache#using_cookies)
export const cookieStorage = {
  collection: db.collection('shopify-cookies'),
  async storeCookie(shop: string, cookie: string[]) {
    await this.collection.doc(shop).set({cookie});
    return true;
  },
  async loadCookie(shop: string) {
    const doc = await this.collection.doc(shop).get();
    if (!doc.exists) return undefined;
    return (doc.data() as { cookie: string[] }).cookie;
  },
  async deleteCookie(shop: string) {
    await this.collection.doc(shop).delete();
    return true;
  },
};

app.get(shopify.config.auth.path,
  async (req, res, next) => {
    await shopify.auth.begin()(req, res, next);
  },
  async (req, res, next) => {
    const shop = req.query.shop as string;
    const cookie = res.getHeader('Set-Cookie') as string[];
    await cookieStorage.storeCookie(shop, cookie);
    next();
  }
);

app.get(
  shopify.config.auth.callbackPath,
  async (req, res, next) => {
    const shop = req.query.shop;
    const cookie = await cookieStorage.loadCookie(shop as string);
    if (cookie) {
      req.headers.cookie = [
        req.headers.cookie,
        ...cookie.map((item) => item.split(';')[0]),
      ].join('; ');
    }
    next();
  },
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot(),
);

export default onRequest(app);
