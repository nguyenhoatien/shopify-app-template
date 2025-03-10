import {shopifyApp} from '@shopify/shopify-app-express';
import {Session, SessionParams} from '@shopify/shopify-api';
import {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SCOPES,
  SHOPIFY_APP_URL,
} from '../shopify.app.json';
import {db} from './firebase.server';

export const sessionStorage = {
  collection: db.collection('shopify-sessions'),
  async storeSession(session: Session) {
    await this.collection.doc(session.id).set(session.toObject());
    return true;
  },
  async loadSession(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return undefined;
    return new Session(doc.data() as SessionParams);
  },
  async deleteSession(id: string) {
    await this.collection.doc(id).delete();
    return true;
  },
  async deleteSessions(ids: string[]) {
    await Promise.all(ids.map((id) => this.collection.doc(id).delete()));
    return true;
  },
  async findSessionsByShop(shop: string) {
    const docs = await this.collection.where('shop', '==', shop).get();
    return docs.docs.map((doc) => new Session(doc.data() as SessionParams));
  },
};

const shopify = shopifyApp({
  sessionStorage,
  api: {
    apiKey: SHOPIFY_API_KEY,
    apiSecretKey: SHOPIFY_API_SECRET || '',
    scopes: SCOPES?.split(','),
    hostName: SHOPIFY_APP_URL || '',
  },
  auth: {
    path: '/api/auth/',
    callbackPath: '/api/auth/callback/',
  },
  webhooks: {
    path: '/api/webhooks/',
  },
});

export default shopify;
