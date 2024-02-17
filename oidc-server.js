import Provider from './node-oidc-provider/lib/index.js';

/**
 * @type {import("oidc-provider").Configuration}
 */
const configuration = {
  grant_types: ['client_credentials'],
  formats: {
    customizers: {
      jwt: (ctx, token, parts) => {
        console.log(parts);
        parts.payload.nbf = parts.payload.iat;
      },
    },
  },
  extraTokenClaims: (ctx, token) => {
    return {
      foo: 'bar',
    };
  },
  features: {
    clientCredentials: { enabled: true },

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
        };
      },
    },
  },
  routes: {
    token: '/oauth2/token',
    jwks: '/.well-known/jwks.json',
    authorization: '/oauth2/auth',
    userinfo: '/userinfo',
    revocation: '/oauth2/revoke',
    end_session: '/oauth2/logout',
  },
  clients: [
    {
      client_id: 'foo',
      client_secret: 'bar',
      redirect_uris: [],
      response_types: [],
      grant_types: ['client_credentials'],
      audience: ['https://hiiretail.com'],
      token_endpoint_auth_method: 'client_secret_basic',
    },
  ],
};

const oidc = new Provider('http://localhost:3000', configuration);

oidc.proxy = true;

const server = oidc.listen(3000, () => {
  console.log(
    'oidc-provider listening on port 3000, check http://localhost:3000/.well-known/openid-configuration'
  );
});
