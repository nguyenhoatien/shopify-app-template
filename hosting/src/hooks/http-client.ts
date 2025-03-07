import createApp from '@shopify/app-bridge';
import { authenticatedFetch } from '@shopify/app-bridge/utilities';

export const useFetch = () => {
  const url = new URL(location.href);
  const host = url.searchParams.get('host');

  if (!host) {
    throw new Error('No host provided');
  }

  const app = createApp({
    apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
    host,
  });

  return authenticatedFetch(app);
};
