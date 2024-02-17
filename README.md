# OIDC Server demo

Minimal demo of oauth2 server. Demo supports only client credentials flow.

Demo uses https://github.com/panva/node-oidc-provider - Cerified OpenID Connect server - https://openid.net/certification .

## How to run

1. Use node 20
```bash
nvm use 20
```

2. Install dependencies
```bash
# do not forget to pull submodule before install
cd node-oidc-provider
npm install
```

3. Runs server
```bash
npx nodemon oidc-server.js
```
This command will run server in watch mode, fetch & print access token for client.

4. (Optional) update database seed file `database-seed.json` if you want to add more clients.

## Examples

Example token from ORY Hydra:
```jwt
eyJhbGciOiJSUzI1NiIsImtpZCI6InB1YmxpYzplMTNiZDg5Zi1kNjIzLTRmY2ItOTVjNS04NmQ5NDAxODBlZjYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiaHR0cHM6Ly9oaWlyZXRhaWwuY29tIl0sImNsaWVudF9pZCI6IlluVnphVzVsYzNOZmRXNXBkRjlwWkRvZ1pHVnRiMTlpZFdsa0NtbHpiMTlqWXpvZ1pHVnRieTFqYjNWdWRISjVDbk5tZHpvZ1lXSmpRREV1TTBCRFNWSTNibEYzZEZNd2NrRTJkREJUTm1WcVpBcDBhV1E2SUVOSlVqZHVVWGQwVXpCeVFUWjBNRk0yWldwa0NuZHZjbXR6ZEdGMGFXOXVYMmxrT2lBME1qUXlOREkwTWdvIiwiZXhwIjoxNjM3NjI0OTg4LCJleHQiOnt9LCJpYXQiOjE2Mzc2MjEzODgsImlzcyI6Imh0dHBzOi8vYXV0aC5yZXRhaWxzdmMuY29tLyIsImp0aSI6IjUyOTZlMTVhLThiYWItNDljMy05OWYxLTYxNGM1ZDRjMTlkZSIsIm5iZiI6MTYzNzYyMTM4OCwic2NwIjpbXSwic3ViIjoiWW5WemFXNWxjM05mZFc1cGRGOXBaRG9nWkdWdGIxOWlkV2xrQ21semIxOWpZem9nWkdWdGJ5MWpiM1Z1ZEhKNUNuTm1kem9nWVdKalFERXVNMEJEU1ZJM2JsRjNkRk13Y2tFMmREQlRObVZxWkFwMGFXUTZJRU5KVWpkdVVYZDBVekJ5UVRaME1GTTJaV3BrQ25kdmNtdHpkR0YwYVc5dVgybGtPaUEwTWpReU5ESTBNZ28ifQ.HYrz7bpZZ1G4pOfuDqv9dgWIJ5MghPFEqIpvhFROuaiUbGFezsNj4kE9rU3kDVDfOF2PH5QGgWUPRDzxrYfwIRh8N6iLhD0Tn4rIGU19cpqNWLlTiKp5-iRz8dP7maIUhGk6Y9EhvC-eRcD43mgxz_642hfLxfeG5MeOc5YgZLre-vmAHWFcAWkrcZersMVGAVKsOKk5xBlBzAyDPBeiCCHLK4NNhHBViy2LNb1doell2KJ29qK3NsUZCaJjMcM12v6pj3yIm_Ra_yH6JhqPxv6Duov7Q9jKk-3gYZO_ptLD-WFtG7nbUrxGXOgy8-L8hdktR34_HvEysvMy7eUCESyo8jR6gd9jzi10pA1oeP-mJCWYxiHBckuzSd4-axZHN31_QNc6ZHFxNlIBoGqG0fScdaiY_Uo87KsgkLlNqPg7vM_bxRfDn-ETEO2eoDKt3RroX1pK8zQOkg58YhQjtZYdy-znJAOMnW95zm9NaZesyXHEsBvO8kEtSUFwbVZYY7HnQ4tUK1L_2cYCpEZ7a7-o2fv52J3jDcvyVrKZQHXw-Jq0lC0Te1Qcr6m_yIElef30jSv73_ainlP_TIwgiwRHOsU7HlFjqq3OjrmRl5yX4fBZqiuCZheybX95dPtRm5uSHO5n27hXKbmlzC_ivcpn0pM0Jk_t3We-n-mNaF8",
```
Header
```json
{
  "alg": "RS256",
  "kid": "public:e13bd89f-d623-4fcb-95c5-86d940180ef6",
  "typ": "JWT"
}
```

Body
```json
{
  "aud": [
    "https://hiiretail.com"
  ],
  "client_id": "foo",
  "exp": 1637624988,
  "ext": {},
  "iat": 1637621388,
  "iss": "https://auth.retailsvc.com/",
  "jti": "5296e15a-8bab-49c3-99f1-614c5d4c19de",
  "nbf": 1637621388,
  "scp": [],
  "sub": "foo"
}
```

Example token from this server:
```jwt
eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCIsImtpZCI6ImtleXN0b3JlLUNIQU5HRS1NRSJ9.eyJmb28iOiJiYXIiLCJqdGkiOiJSN2xRWHlVNU1Nd2Z4QllCaFFBdXUiLCJzdWIiOiJmb28iLCJpYXQiOjE3MDgxODkwNjQsImV4cCI6MTcwODE5MjY2NCwiY2xpZW50X2lkIjoiZm9vIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiYXVkIjoiaHR0cHM6Ly9oaWlyZXRhaWwuY29tIiwibmJmIjoxNzA4MTg5MDY0fQ.tFuVo7vfJ-jDSxKLapDHMCtDHd4PTTmKwFA7AZYSDTiLbgVPjBvMsGaKDvVGyj3tNkV2v1WQ-S7IebOvNW2TSr6fMZ8O0Dk7an-oyALgD7g1pM_cKejqAcBhH4bxtQLq00cPILyo25yp0pVTChxflcK6ZC5IZHHeuMyxpPViLk5pD0lHH-wOyUQiz1lufhfC5Lviw63bpTyYPeSgv4Kc07aHwVTmAKMD-ijRZwC7XDe4mezn6qIt9Hi8LCLEm8kWCkzNEpd8Ta7q6LXteANxC-_DNgSbcIGYfb8DfVO2NSDp5MgSBjFhcNwgXw5P_zhd80-OQnWMK_O8UrCR15k_Hw
```

Header
```json
{
  "alg": "RS256",
  "typ": "at+jwt", // hardcoded. as per jwt spec, optional param, and apps should not use it
  "kid": "keystore-CHANGE-ME" // will be equal to the one from hydra in prod
}
```

```json
{
  "foo": "bar",  // in this server we can add custom claims, that can eliminate a need for decoding client id
  "jti": "R7lQXyU5MMwfxBYBhQAuu", // notice that jti is not uuid is this implementation, but it is ok
  "sub": "foo",
  "iat": 1708189064,
  "exp": 1708192664,
  "client_id": "foo",
  "iss": "http://localhost:3000",
  "aud": "https://hiiretail.com", // aud is single string, which is valid according to jwt spec.
  "nbf": 1708189064 // nbf is added via token customiser
}
```