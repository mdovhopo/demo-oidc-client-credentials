const base = 'http://localhost:3000';
const endpoint = '/oauth2/token';

const client_id = 'foo';
const client_secret = 'bar';

const auth = `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString(
  'base64'
)}`;
const result = await fetch(base + endpoint, {
  headers: {
    Authorization: auth,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  method: 'POST',
  body: new URLSearchParams({
    grant_type: 'client_credentials',
    audience: 'https://hiiretail.com',
  }).toString(),
});

if (result.ok) {
  const json = await result.json();
  const access_token = json.access_token;
  console.log('json', json);
  console.log(access_token);
  console.log('headers', result.headers);
  console.log('fetched token, decoded:');
  const [header, payload] = access_token.split('.');
  console.log(JSON.parse(Buffer.from(header, 'base64').toString()));
  console.log(JSON.parse(Buffer.from(payload, 'base64').toString()));
} else {
  console.log('failed to fetch token');
  console.log(result.status);
  console.log(await result.text());
}
