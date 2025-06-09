FROM node:22-alpine3.22
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["sh", "-c", "npm run db:deploy && npm run start:dev"]
