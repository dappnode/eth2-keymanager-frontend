FROM node:16-alpine as build

WORKDIR /app

COPY package.json yarn.lock* ./

RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.21.6-alpine
COPY --from=build /app/build/ /usr/share/nginx/html/
EXPOSE 80