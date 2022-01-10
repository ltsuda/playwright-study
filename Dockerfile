FROM mcr.microsoft.com/playwright:v1.17.2-focal

WORKDIR /tester

COPY package*.json ./

RUN apt-get update && \
apt-get autoclean -y && \
apt-get purge -y && \
apt-get clean -y

RUN npm ci
RUN npx playwright install chrome

COPY webapp ./webapp

RUN npm run beforetest:ci

COPY . .

CMD [ "npm", "run", "test:docker" ]
