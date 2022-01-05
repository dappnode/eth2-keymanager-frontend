# ETH2 Key Manager Frontend

This is a simple react app to manage your ETH2 validator keystores. It allows to:

- view your current active keys being used for signing
- import new keystores and existing slashing protection data
- remove active keys and download the associated slashing protection data

## Running

In the project directory, run:

`yarn start`

Then open [http://localhost:3000?signer_url=<SIGNER_URL>&auth_token=<AUTH_TOKEN>](http://localhost:3000) to view it in the browser.

`signer_url` - The url of the signer to send API requests to
`auth_token` - Optional auth token to pass in API requests

