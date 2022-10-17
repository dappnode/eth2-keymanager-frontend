FROM node:16-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install
COPY . .
ENV REACT_APP_NETWORK=prater REACT_APP_WEB3SIGNER_API_URL=http://web3signer.web3signer-prater.dappnode:9000/
RUN yarn build

FROM nginx:1.21.6-alpine
COPY --from=build /app/build/ /usr/share/nginx/html/
EXPOSE 80