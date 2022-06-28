FROM mcr.microsoft.com/playwright:v1.23.0-jammy

WORKDIR /tester

COPY package*.json ./

RUN npm ci
RUN npx playwright install chrome

COPY . .

CMD [ "npm", "run", "test:docker" ]
