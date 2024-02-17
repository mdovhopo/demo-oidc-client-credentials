# OIDC Server demo

Minimal demo with node-oidc-provider lib. Demo supports only client credentials flow.

## How to run

1. Use node 20
```bash
nvm use 20
```

2. Install dependencies
```bash
cd node-oidc-provider
npm install
```

3. Runs server
```bash
npx nodemon oidc-server.js
```
This command will run server in watch mode, fetch & print access token for client.

4. (Optional) update database seed file `database-seed.json` if you want to add more clients.