
FROM node:20.12.2-alpine3.18


WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ../../frontend/package*.json ./


RUN npm install

COPY ../../frontend/ ./

RUN npm install
RUN npm run build

CMD ["npx", "react-scripts", "start"]
