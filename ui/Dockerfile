FROM node:14-alpine3.14 as build
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.21.6-alpine
ENV NETWORK=prater WEB3SIGNER_API_URL=http://web3signer.web3signer-prater.dappnode:9000
COPY --from=build /app/build/ /usr/share/nginx/html/
EXPOSE 80