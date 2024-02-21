FROM node:alpine
WORKDIR /app

RUN apk update && apk upgrade && apk add --no-cache bash

COPY . .
RUN npm install
RUN npm run build
#Start next js server
CMD [ "npm", "run", "start" ]

EXPOSE 3000