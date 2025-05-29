import {onRequest} from 'firebase-functions/v2/https';
import express from 'express';
import cors from 'cors';
import shopify, {sessionStorage} from '../shopify.server';

const app = express();

app.use(cors({origin: true}));

app.use(async (req, res, next) => {
  const origin = req.headers['origin'] || req.headers['referer'];
  const shop = req.query.shop as string ||
    req.headers['x-shopify-shop-domain'] as string ||
    (origin ? new URL(origin).hostname : undefined);

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

app.post('/api/public/', async (req, res) => {
  const session = res.locals.shopify.session;
  const client = new shopify.api.clients.Graphql({session});

  const {email, orderId} = req.body;

  const response = await client.request(
    `#graphql
    query MyQuery {
      orders(first: 1, query: "name:${orderId} AND email:${email}") {
        nodes {
          createdAt
          homedelivery: metafield(key: "homedelivery", namespace: "custom") {
            value
          }
          clickandcollect: metafield(key: "clickandcollect", namespace: "custom") {
            value
          }
          shippingAddress {
            address1
            address2
            name
            phone
            city
            country
            zip
          }
          lineItems(first: 250) {
            edges {
              node {
                name
                quantity
                image {
                  url
                }
                originalUnitPriceSet {
                  presentmentMoney {
                    amount
                    currencyCode
                  }
                }
                discountedUnitPriceSet {
                  presentmentMoney {
                    amount
                    currencyCode
                  }
                }
                discountedTotalSet {
                  presentmentMoney {
                    amount
                    currencyCode
                  }
                }
                customAttributes {
                  key
                  value
                }
              }
            }
          }
          paymentGatewayNames
          totalPriceSet {
            presentmentMoney {
              amount
              currencyCode
            }
          }
        }
      }
    }`
  );

  const [order] = response.data.orders.nodes;

  if (!order) {
    res.status(404).json({error: 'Order not found'});
    return;
  }

  res.status(200).json({
    homedelivery: JSON.parse(order?.homedelivery?.value || 'null'),
    clickandcollect: JSON.parse(order?.clickandcollect?.value || 'null'),
  });
});

export default onRequest(app);
