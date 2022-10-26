# Eth2 keymanager UI

### Develop

1. Run a standalone frontend with a real signer and db with

```
docker-compose build && docker-compose up
```

2. Run only the keymanager frontend while connected to the DAppNode and using the dappnode package web3signer of any network

```
cd ui
yarn
yarn start
```

go to `http://localhost:3000/`

By default, the selected network is mainnet, but you can change it through the URL params, as well as other params:

    - network
    - signerUrl
    - signerAuthToken
    - consensusClient
    - executionClient

You can change the signerUrl or the network by adding URL params:
`http://localhost:3000/?network=<network>&signerUrl=<url>&signerAuthToken=<signerAuthToken>...`

If you are connected to a DAppNode (example for prater):
`http://localhost:3000/?signerUrl=http://web3signer.web3signer-prater.dappnode:9000&network=prater`

### Using the UI image

The image corresponding to this UI has already been built and pushed to GitHub Container Registry (https://github.com/dappnode/eth2-keymanager-frontend/pkgs/container/keymanager-ui)

In order to run a container for the UI, there are 5 env variables to be set (only 2 mandatory):

- REACT_APP_NETWORK= prater | gnosis | mainnet
- REACT_APP_WEB3SIGNER_API_URL
- [ REACT_APP_WEB3SIGNER_AUTH_TOKEN ]
- [ REACT_APP_CONSENSUS_CLIENT ]
- [ REACT_APP_EXECUTION_CLIENT ]

However, you can override this values with the URL params mentioned above.

For example, if you are connected to a DAppNode and you want to run the KeyManager for prater, you can run the UI by having this 2 files:

Dockerfile:

```
FROM ghcr.io/dappnode/keymanager-ui as build

ENV REACT_APP_NETWORK=prater
ENV REACT_APP_WEB3SIGNER_API_URL=http://web3signer.web3signer-prater.dappnode:9000/

COPY entrypoint.sh /usr/bin/entrypoint.sh
ENTRYPOINT /usr/bin/entrypoint.sh
EXPOSE 80
```

entrypoint.sh:

```
#!/bin/sh

export REACT_APP_CONSENSUS_CLIENT=$_DAPPNODE_GLOBAL_CONSENSUS_CLIENT_PRATER
export REACT_APP_EXECUTION_CLIENT=$_DAPPNODE_GLOBAL_EXECUTION_CLIENT_PRATER

npx react-inject-env set

npm install http-server@14.1.1

npx http-server /app/build/ -p 80

exec ./docker-entrypoint.sh
```

As not all those env variables are necessary, you can run the UI in a simpler way, with just 1 file and a lighter nginx server:

Dockerfile:

```
FROM ghcr.io/dappnode/keymanager-ui as build

ENV REACT_APP_NETWORK=prater
ENV REACT_APP_WEB3SIGNER_API_URL=http://web3signer.web3signer-prater.dappnode:9000/

RUN npx react-inject-env set

FROM nginx:1.21.6-alpine
COPY --from=build /app/build/ /usr/share/nginx/html/
EXPOSE 80
```
