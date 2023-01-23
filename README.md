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

- NETWORK= prater | gnosis | mainnet
- WEB3SIGNER_API_URL
- [ WEB3SIGNER_AUTH_TOKEN ]
- [ CONSENSUS_CLIENT ]
- [ EXECUTION_CLIENT ]

However, you can override this values with the URL params mentioned above.

For example, if you are connected to a DAppNode and you want to run the KeyManager for prater, you can run the UI by having this 3 files:

.env:

```
NETWORK=prater
WEB3SIGNER_API_URL=http://web3signer.web3signer-prater.dappnode:9000/
CONSENSUS_CLIENT=$_DAPPNODE_GLOBAL_CONSENSUS_CLIENT_PRATER
EXECUTION_CLIENT=$_DAPPNODE_GLOBAL_EXECUTION_CLIENT_PRATER
```

Dockerfile:

```
FROM ghcr.io/dappnode/keymanager-ui:0.1.1 as build

FROM nginx:1.21.6-alpine

# Static build
COPY --from=build /app/build /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
```

env.sh:

```
#!/bin/bash

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment
echo "window.env = {" >> ./env-config.js

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  #If varvalue starts with $, then it is a reference to another env variable. Set varvalue to the value of that env variable
  if [[ $varvalue == \$* ]]; then
    varvalue="${varvalue:1}"
    varvalue=${!varvalue}
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> ./env-config.js
done < .env

echo "}" >> ./env-config.js
```

As it is possible to add the params through the URL, you can create an image for it with just 1 file:

Dockerfile:

```
FROM ghcr.io/dappnode/keymanager-ui:0.1.1 as build

FROM nginx:1.21.6-alpine
COPY --from=build /app/build/ /usr/share/nginx/html/
EXPOSE 80
```
