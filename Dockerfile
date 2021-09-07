FROM mcr.microsoft.com/playwright:focal

RUN apt-get install openjdk-8-jdk -y

WORKDIR /tester

COPY package*.json ./

RUN npm ci
RUN npx playwright install chrome

COPY . .

CMD [ "npm", "run", "test:docker" ]
