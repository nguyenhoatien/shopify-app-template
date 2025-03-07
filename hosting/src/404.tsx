import {
  Card,
  Page,
  BlockStack,
  EmptyState,
} from '@shopify/polaris';
import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Page>
      <BlockStack gap={'500'}>
        <Card>
          <EmptyState
            heading="404 - Page Not Found"
            action={{ content: 'Back to Homepage', onAction: () => navigate('/') }}
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <p>Sorry, we couldn't find the page you requested.</p>
          </EmptyState>
        </Card>
      </BlockStack>
    </Page>
  );
}
