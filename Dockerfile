FROM node:25-slim as base

WORKDIR /home/node/app
COPY ./app/package.json .
RUN npm install

#COPY ./app .

EXPOSE 80
EXPOSE 443
CMD [ "npm", "start" ]
