import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { AppProvider as PolarisAppProvider } from '@shopify/polaris';
import { NavMenu } from '@shopify/app-bridge-react';
import '@shopify/polaris/build/esm/styles.css';

import Index from './index';
import NotFound from './404';
import AppLayout from './app/_layout';
import App from './app/index';
import AdditionalPage from './app/additional';
import AppLink from './components/app-link';

const url = new URL(location.href);

// https://reactrouter.com/start/library/routing
createRoot(document.getElementById('root')!).render(
  <PolarisAppProvider i18n={{}}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />

        <Route path="app" element={<AppLayout />}>
          <Route index element={<App />} />
          <Route path="additional" element={<AdditionalPage />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>

      {url.searchParams.get('shop') ? (
        <NavMenu>
          <AppLink to="/app" rel="home">Home</AppLink>
          <AppLink to="/app/additional">Additional page</AppLink>
        </NavMenu>
      ) : null}
    </BrowserRouter>
  </PolarisAppProvider>,
);
