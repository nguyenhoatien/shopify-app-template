import {onRequest} from 'firebase-functions/v2/https';
import express from 'express';
import shopify from '../shopify.server';

const app = express();

app.use(shopify.validateAuthenticatedSession());

app.get('/api/app/', (_, res) => {
  res.send('Hello world!');
});

app.post('/api/app/product/generate/', async (req, res) => {
  const {color} = req.body;
  const session = res.locals.shopify.session;
  const client = new shopify.api.clients.Graphql({session});

  const response = await client.request(
    `#graphql
      mutation populateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        product: {
          title: `${color} Snowboard`,
        },
      },
    }
  );
  const product = response.data.productCreate.product;
  const variantId = product.variants.edges[0].node.id;
  const variantResponse = await client.request(
    `#graphql
      mutation updateVariant(
        $productId: ID!,
        $variants: [ProductVariantsBulkInput!]!
      ) {
        productVariantsBulkUpdate(productId: $productId, variants: $variants) {
          productVariants {
            id
            price
            barcode
            createdAt
          }
        }
      }`,
    {
      variables: {
        productId: product.id,
        variants: [{id: variantId, price: '100.00'}],
      },
    },
  );

  res.json({
    product,
    variant: variantResponse.data.productVariantsBulkUpdate.productVariants,
  });
});

export default onRequest(app);
