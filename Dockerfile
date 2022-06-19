FROM node

WORKDIR /disk-sharing

COPY package*.json /disk-sharing

RUN npm install

COPY . .

EXPOSE 3033

CMD ["node", "disksharing.js"]