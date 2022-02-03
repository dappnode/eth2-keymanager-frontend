# ETH2 Key Manager Frontend

This is a simple react app to manage your ETH2 validator keystores. It allows to:

- view your current active keys being used for signing
- import new keystores and existing slashing protection data
- remove active keys and download the associated slashing protection data

![Demo](images/list.png?raw=true "List of active keys")

[See more screenshots](images)

## Prerequisites

This tool requires nodejs 16 or better and yarn as well as react-scripts and typescript. Installation of nodejs and npm differs by OS, for Ubuntu 20.04: 

`sudo apt update && sudo apt install -y curl` and then `curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -` and finally `sudo apt install -y nodejs`.

Once nodejs and npm have been installed, install yarn: `sudo corepack enable` and test it's there with `yarn --version`
> If this fails, install yarn via npm instead: `sudo npm install --global yarn`

Install react-scripts and typescript: `yarn add react-scripts typescript`

## Running

Requires a running signer instance like a ETH2 validator client or a [web3signer](https://github.com/ConsenSys/web3signer) instance.

With the signer running at a given URL, in the project directory, run:

`yarn start`

Then open [http://localhost:3000?signer_url=<SIGNER_URL>&auth_token=<AUTH_TOKEN>](http://localhost:3000) to view it in the browser.

- `signer_url` - The url of the signer to send API requests to
- `auth_token` - Optional auth token to pass in API requests

