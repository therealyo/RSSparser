
# base image
FROM node:16-alpine
RUN apk add --update nodejs

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build
CMD ["npm", "run", "start"]