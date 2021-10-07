[![Playwright-CI](https://github.com/ltsuda/playwright-study/actions/workflows/main.yml/badge.svg)](https://github.com/ltsuda/playwright-study/actions/workflows/main.yml) [![README Portuguese](https://img.shields.io/badge/README-Portuguese-blue)](https://github.com/ltsuda/playwright-study/blob/main/README-ptbr.md)

# [Playwright Study](https://playwright.dev/)

Repositório com objetivo de aprender um novo framework de testes E2E utilizando Microsoft 🎭 Playwright com Javascript

## Sistema em Teste

<a href="https://www.saucedemo.com/">
<img src="https://www.saucedemo.com/static/media/Login_Bot_graphic.20658452.png" width=120>
</a>

O website utilizado nesse repositório é um e-commerce de demonstração da [SauceLabs Demo](https://www.saucedemo.com/) mas sendo executado localmente utilizando [Sample-app-web](https://github.com/ltsuda/sample-app-web) que é uma cópia do código fonte original


## Instalação e Execução

### Requerimentos
 - [git](https://git-scm.com/downloads)
 - [node 14+](https://nodejs.org/en/)
   - ou use [nvm](https://github.com/nvm-sh/nvm) para gerenciar múltiplas versões do NodeJS
 - Java 8+ (Opcional) para o [allure-commandline](https://github.com/allure-framework/allure-npm#:~:text=Allure%20Commandline%20is%20a%20tool%20to%20generate%20Allure,you%20can%20get%20it%20installed%20directly%20from%20NPM.) para gerar os relatório de resultados e rodar o servidor web Allure-Reports
 - Docker (Opcional) para executar os testes em container

#### Clonando o repositório e submódulos

```text
git clone https://github.com/ltsuda/playwright-study.git --recursive
```

#### Instalando dependências
```bash
npm install
npx playwright install
npx playwright install chrome
npm run beforetest
```

#### Executando os testes
Nesse repositório há múltiplos scripts de testes com diferentes configurações. Veja `package.json/scripts` para saber todas as opções e para os projetos do Playwright, veja o arquivo `playwright.config.js`

**Para executar utilizando o sistema Windows, utilize os comandos do Playwright CLI diretamente**

Por exemplo:
```bash
# para executar todos os testes no chromium com resolução 1280x720
npx playwright test --project 'chromium-hd'

# para executar todos os testes com uma tag específica
npx playwright test --grep <tag>
```

**Os scripts abaixo foram testados no sistema Ubuntu 20.04/WSL**

Todos os scripts geram os arquivos de resultados utilizando o framework Allure Test Report. Para gerar o relatório, utilize os scripts abaixo:
```bash
npm run allure:generate
```
Será gerado o diretório ./allure-reports, então execute:
```bash
npm run allure:open
...
Server started at <http://127.0.1.1:39923/>. Press <Ctrl+C> to exit
```
Este comando irá iniciar um servidor web com o relatório dos testes, segure CTRL e clique no endereço ou abra o endereço diretamente em um navegador

Execute o script abaixo para executar somente os testes utilizando o browser Chromium com resolução 1280x720
```bash
npm run test
```

Para executar os teste de UI (Interface de Usuário), execute:
```bash
npm run test:visual
```
Esse teste utiliza as imagens de referência presentes no diretório `tests/visual.spec.js-snapshots` e compara com cada página durante a execuçao dos testes

Para executar somente os testes E2E, execute:
```bash
npm run test:e2e
```

**Criando imagem docker para execução dos testes**

A imagem `Docker` executa os testes, gerando tambem o relatório de testes e iniciando o servidor web  na porta 7777 para a visualização do mesmo

Para criar a imagem e executar todos os testes, exceto o teste de UI, execute os seguintes comandos:
```bash
> docker build -f Dockerfile . -t test:docker
# aguarde o download e criação ...

# Para executar o script padrão, utilize o comando abaixo
# O container permanecerá em execução com o servidor web do Allure, navegue para o endereço http://localhost para visualizar o relatório dos testes e pressione CTRL+C para desligar o servidor e remover o container
# opcionalmente é possível obter os arquivos de resultados no caso de falhas em alguns testes, basta montar um volume local interligado ao container utilizando o parametro "-v /fullpath:/tester/test-results/"
> docker run --rm --ipc=host -p 80:7777 test:docker

playwright-study@1.0.0 test:docker /tester
ALLURE_RESULTS_DIR=test-results npx playwright test --grep-invert '@visual' --reporter=dot,allure-playwright

················································································
················································································
················································································
··················································
  Slow test: [firefox-hd] › inventory.spec.js (31s)
  Slow test: [firefox-hd] › cart.spec.js (28s)
  Slow test: [chromium-fhd] › inventory.spec.js (28s)
  Slow test: [webkit-hd] › inventory.spec.js (27s)
  Slow test: [webkit-hd] › cart.spec.js (25s)

  290 passed (2m)

playwright-study@1.0.0 posttest:docker /tester
npm run allure:generate && npm run allure:open


playwright-study@1.0.0 allure:generate /tester
npx allure generate ./test-results --clean -o ./allure-reports

Report successfully generated to ./allure-reports

playwright-study@1.0.0 allure:open /tester
npx allure open ./allure-reports -p 7777

Starting web server...
2021-08-26 17:04:55.761:INFO::main: Logging initialized @193ms to org.eclipse.jetty.util.log.StdErrLog
Can not open browser because this capability is not supported on your platform. You can use the link below to open the report manually.
Server started at <http://172.17.0.2:7777/>. Press <Ctrl+C> to exit

# ou, por exemplo, se quiser utilizar outro sistema de reporte de resultado, execute diretamente o comando do Playwright CLI
# neste caso abaixo, não será gerado o relatório do Allure Report, somente será mostrado o resultado dos testes em forma de lista
> docker run --rm --ipc=host test:docker npx playwright test --grep-invert '@visual' --project 'chromium-hd' --reporter=list
```

## Estrutura de diretórios
```text
.
├── .github/workflows
├── README.md
├── package-lock.json
├── package.json
├── playwright.config.js
├── Dockerfile
├── saucedemo
│   ├── pages
│   │   ├── cart
│   │   │   ├── components.js
│   │   │   └── controller.js
│   │   ├── checkout
│   │   ├── completed
│   │   ├── footer
│   │   ├── inventory
│   │   ├── inventoryItem
│   │   ├── login
│   │   ├── navigationBar
│   │   ├── overview
│   │   ├── titleHeader
│   │   └── pageFixtures.js
│   │
│   └── utils
│       ├── consts.js
│       └── utils.js
├── tests
│   ├── *.spec.js
│   └── visual.spec.js-snapshots
│      └── *.png
└── webapp
```
 - [.github/workflows](https://github.com/ltsuda/playwright-study/tree/main/.github/workflows): diretório com arquivos de fluxo de trabalho que são executados em todo evento `push` para a branch `main` ou em todo evento de `pull request` aberto.
   - main.yaml: executa todos os projetos de testes no Ubuntu, exceto os com tag @visual, gerando o relatório de resultados para o github-pages.
   - docker.yaml: cria as imagens `Dockerfile` e `Docker.visual`, executa os respectivos scripts de teste para ambas as imagens e às envia para o Dockerhub se tudo ocorrer corretamente. Este fluxo de trabalho é executado em todo evento `pull request` mas somente envia as imagens para o Dockerhub se o código é mergeado para a branch `main`.
 - [Dockerfile](https://github.com/ltsuda/playwright-study/blob/main/Dockerfile): arquivo de imagem docker para executar localmente no caso em que o NodeJS não esteja instalado no sistema.
 - [playwright.config.js](https://github.com/ltsuda/playwright-study/blob/main/playwright.config.js): arquivo de configuração do Playwright para configurar coisas como a biblioteca de reporte de resultado, quantos `workers` a serem utilizados, criação dos projetos de teste com configurações específicas. Existem cinco projetos de testes, dois deles utilizando Chromium com resolução 1280x720 e 1920x1080 e os outros três utilizando o Chrome/Firefox/Webkit na resolução 1280x720. Veja [Configuração do Playwright](https://playwright.dev/docs/test-configuration) para aprender mais sobre as configurações disponíveis.
 - [saucedemo/pages](https://github.com/ltsuda/playwright-study/tree/main/saucedemo/pages): diretório com todos `Page Object` e `Controllers`. Os arquivos `components` possuem os seletores e funções que retornam seus [Locator](https://playwright.dev/docs/api/class-locator). Os arquivos de `controllers` são os responsáveis pela interação com os elementos das páginas ou manipulações de dados da página.
 - [saucedemo/pageFixtures.js](https://github.com/ltsuda/playwright-study/blob/main/saucedemo/pages/pageFixtures.js): arquivo com funções compartilhadas [Fixtures](https://playwright.dev/docs/test-fixtures) que extendem `test` do Playwright para instanciar todos os controller das páginas para que cada teste carregue somente os controllers necessários.
 - [saucedemo/utils](https://github.com/ltsuda/playwright-study/tree/main/saucedemo/utils): diretório com um arquivo que contém todas as constantes utilizadas nos testes como os caminhos das páginas (URL), mensagens de erro, etc. E outro com funções auxiliares como a que configura os cookies da página para iniciar os testes já autenticados.
 - [tests](https://github.com/ltsuda/playwright-study/tree/main/tests): diretório com todos os arquivos de teste, incluindo os testes E2E e visuais.
 - [tests/visual.spec.js-snapshots](https://github.com/ltsuda/playwright-study/tree/main/tests/visual.spec.js-snapshots): diretório com os arquivos de imagem padrões para os testes visuais onde são comparadas durante a execução dos testes.
 - [webapp](https://github.com/ltsuda/playwright-study/tree/main/webapp): diretório com o código fonte do website saucelabs demo que é utilizado para inicializar o servidor web para execução dos testes, ao invés de utilizar o website público https://www.saucedemo.com/