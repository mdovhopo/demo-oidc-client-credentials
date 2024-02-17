const base = "https://auth.retailsvc.dev";
const endpoint = "/oauth2/register/test";

const result = await fetch(base + endpoint, {
    headers: {
        // Authorization: auth,
        "Content-Type": "application/json",
    },
    method: "GET",
    // body: JSON.stringify({}),
});

if (result.ok) {
    const { access_token } = await result.json();
    console.log("headers", result.headers);
    console.log("fetched token, decoded:");
    const [header, payload] = access_token.split(".");
    console.log(JSON.parse(Buffer.from(header, "base64").toString()));
    console.log(JSON.parse(Buffer.from(payload, "base64").toString()));
} else {
    console.log("failed to fetch token");
    console.log(result.status);
    console.log(await result.text());
}
