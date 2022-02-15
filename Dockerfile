FROM mcr.microsoft.com/playwright:v1.19.0-focal

WORKDIR /tester

COPY package*.json ./

RUN npm ci
RUN npx playwright install chrome

COPY webapp ./webapp

RUN npm run beforetest:ci

COPY . .

CMD [ "npm", "run", "test:docker" ]
