#!/bin/bash

KEYSTORES_DIR=/opt/web3signer/keyfiles

mkdir -p "${KEYSTORES_DIR}"
# Wait for db
sleep 5

/opt/web3signer/bin/web3signer \
  --key-store-path=${KEYSTORES_DIR} \
  --http-listen-port=9000 \
  --http-listen-host=0.0.0.0 \
  --http-host-allowlist=* \
  --http-cors-origins=* \
  --metrics-enabled=true \
  --metrics-host 0.0.0.0 \
  --metrics-port 9091 \
  --metrics-host-allowlist=* \
  --idle-connection-timeout-seconds=90 \
  eth2 \
  --network=${NETWORK} \
  --slashing-protection-db-url=jdbc:postgresql://postgres.web3signer-${NETWORK}.dappnode:5432/web3signer \
  --slashing-protection-db-username=postgres \
  --slashing-protection-db-password=password \
  --key-manager-api-enabled=true
