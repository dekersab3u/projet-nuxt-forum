# Dockerfile

FROM node:20

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
