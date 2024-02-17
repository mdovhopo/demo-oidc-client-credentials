import Provider from './node-oidc-provider/lib/index.js';
import { Adapter } from './adapter.js';
import bcrypt from 'bcryptjs';

/**
 * @type {import("oidc-provider").Configuration}
 */
const configuration = {
  // database adapter. for demo purpose - only in-memory
  // but in real prod we can use any db.
  adapter: (name) => new Adapter(name),
  // allow only client_credentials grant
  grant_types: ['client_credentials'],
  // we cab customize token payload before issuing it
  formats: {
    customizers: {
      jwt: (ctx, token, parts) => {
        // console.log(parts);
        parts.payload.nbf = parts.payload.iat;
      },
    },
  },
  // we can add extra static claims to the token
  extraTokenClaims: (ctx, token) => {
    return {
      foo: 'bar',
    };
  },
  features: {
    // required for client_credentials grant
    clientCredentials: { enabled: true },

    // required to set correct token format (jwt)
    // always sets aud=https://hiiretail.com
    resourceIndicators: {
      enabled: true,
      defaultResource: () => {
        return 'https://hiiretail.com';
      },
      getResourceServerInfo: () => {
        /**
         * @type {import("oidc-provider").ResourceServerInfo}
         */
        return {
          scope: '',
          accessTokenFormat: 'jwt',
          accessTokenTTL: 3600,
          // there is a way to specify custom siging key
          jwt: {
            sign: {
              alg: 'RS256',
            },
          },
        };
      },
    },
  },
  // we can customize endpoints for each route if we want to
  routes: {
    token: '/oauth2/token',
    jwks: '/.well-known/jwks.json',
    authorization: '/oauth2/auth',
    userinfo: '/userinfo',
    revocation: '/oauth2/revoke',
    end_session: '/oauth2/logout',
  },
  clients: [],
};

const oidc = new Provider('http://localhost:3000', configuration);

// Example of using bcrypt to not store plain text client secret
oidc.Client.prototype.compareClientSecret = async function (input) {
  // example in db seed is bcrypt with 10 rounds
  return bcrypt.compareSync(input, this.clientSecret);
};

// when running behind tls offload, we need to set this to true
oidc.proxy = true;

const server = oidc.listen(3000, () => {
  console.log(
    'oidc-provider listening on port 3000, check http://localhost:3000/.well-known/openid-configuration'
  );
});

// oidc is event emitter
// https://github.com/panva/node-oidc-provider/blob/v8.x/docs/events.md

oidc.on('client_credentials.issued', (token) => {
  console.log('client_credentials.issued', token);
  // we can publish pubsub events here
});

// just run small script to fetch token for client
await import('./get-oauth2-token.js');
