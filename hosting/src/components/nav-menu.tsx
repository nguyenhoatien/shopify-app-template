import { NavMenu } from '@shopify/app-bridge-react';
import { useAppNavigate } from '../hooks/app-navigate';

export function AppNavMenu({ tabs = [] }: { tabs: { content: string, url: string }[] }) {
  const navigate = useAppNavigate();

  const url = new URL(location.href);
  if (!url.searchParams.get('shop')) {
    return null;
  }

  const tabMarkup = tabs.map((tab, index) => (
    <a href={tab.url} rel={index === 0 ? 'home' : ''} onClick={(e) => { e.preventDefault(); navigate(tab.url); }}>{tab.content}</a>
  ));

  return (
    <NavMenu>
      {tabMarkup}
    </NavMenu>
  );
}