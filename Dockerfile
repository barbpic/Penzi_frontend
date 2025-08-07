FROM node:23-alpine

WORKDIR /user/src/App


COPY package.json ./
COPY package-lock.json ./


RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]