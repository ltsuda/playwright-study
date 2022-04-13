FROM mcr.microsoft.com/playwright:v1.21.0-focal

WORKDIR /tester

COPY package*.json ./

RUN npm ci
RUN npx playwright install chrome

COPY . .

CMD [ "npm", "run", "test:docker" ]
