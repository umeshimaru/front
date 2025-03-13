FROM node:23-alpine

WORKDIR /app

COPY . .

RUN npm install --omit=dev
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]

