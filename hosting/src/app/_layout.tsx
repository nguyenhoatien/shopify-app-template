import { Outlet } from 'react-router';
import Index from '..';

export default function AppLayout() {
  const url = new URL(location.href);

  if (url.searchParams.get('shop')) {
    return (<Outlet />);
  }

  return (<Index />);
}
