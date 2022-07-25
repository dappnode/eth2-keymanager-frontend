# ETH2 Key Manager Frontend

This is a simple react app to manage your ETH2 validator keystores. It allows to:

- view your current active keys being used for signing
- import new keystores and existing slashing protection data
- remove active keys and download the associated slashing protection data

![Demo](images/list.png?raw=true "List of active keys")

[See more screenshots](images)

## Prerequisites

Install `yarn` on your system. See installation instructions [here](https://classic.yarnpkg.com/lang/en/docs/install/).

Once `yarn` is installed, from the project directory, run:

`yarn install`

## Running

Requires a running signer instance like a ETH2 validator client or a [web3signer](https://github.com/ConsenSys/web3signer) instance.

With the signer running at a given URL, in the project directory, run:

`yarn start`

Then open [http://localhost:3000?signer_url=<SIGNER_URL>&auth_token=<AUTH_TOKEN>](http://localhost:3000) to view it in the browser.

- `signer_url` - The url of the signer to send API requests to
- `auth_token` - Optional auth token to pass in API requests
- `host` - Optional host header to be used in web3signer requests

## Developing

1. Install the dependencies: `yarn`
2. Build with `yarn run build`
3. Run the website with `yarn start`
4. Go to http://localhost:3000
