# Eth2 keymanager UI

### Develop

1. Run a standalone frontend with a real signer and db with

```
docker-compose build && docker-compose up
```

2. Run only the keymanager frontend while connected to the dappnode and using the dappnode package web3signer of any network

```
cd ui
yarn
yarn start
```

go to `http://localhost:3000/?baseUrl=http://web3signer.web3signer-gnosis.dappnode:9000&network=gnosis`
