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

You can change the signerUrl or the network by adding URL params:
`http://localhost:3000/?signerUrl=<url>&network=<network>`

Note that in development mode:
network, consensus client and execution client are hardcoded, so the UI might not be showing their real values in the DAppNode.
