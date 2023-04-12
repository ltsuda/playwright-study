[![Playwright-CI](https://github.com/ltsuda/playwright-study/actions/workflows/main.yml/badge.svg)](https://github.com/ltsuda/playwright-study/actions/workflows/main.yml) [![README Portuguese](https://img.shields.io/badge/README-Portuguese-blue)](https://github.com/ltsuda/playwright-study/blob/main/README-ptbr.md)

# [Playwright Study](https://playwright.dev/)

Repositório com objetivo de aprender um novo framework de testes E2E utilizando Microsoft 🎭 Playwright com TypeScript

## Sistema em Teste

O website utilizado nesse repositório é um e-commerce de demonstração da [SauceLabs Demo](https://www.saucedemo.com/) mas sendo executado localmente utilizando [Sample-app-web](https://github.com/ltsuda/sample-app-web) que é uma cópia do código fonte original

## Instalação e Execução

### Requerimentos

-   [git](https://git-scm.com/downloads)
-   [node 16-18](https://nodejs.org/en/)
    -   ou use [nvm](https://github.com/nvm-sh/nvm) para gerenciar múltiplas versões do NodeJS
-   Docker (Opcional) para executar os testes em container

#### Clonando o repositório

```text
git clone https://github.com/ltsuda/playwright-study.git
```

#### Instalando dependências

```bash
npm ci
npx playwright install && npx playwright install-deps
```

#### Executando os testes

Nesse repositório há múltiplos scripts de testes com diferentes configurações. Veja `package.json/scripts` para saber todas as opções e para os projetos do Playwright, veja o arquivo `playwright.config.ts`

**Para executar utilizando o sistema Windows, utilize os comandos do Playwright CLI diretamente**

Por exemplo:

```bash
# para executar todos os testes no chromium com resolução 1280x720
npx playwright test --project 'chromium-hd'

# para executar todos os testes com uma tag específica
npx playwright test --grep <tag>
```

**Os scripts abaixo foram testados no sistema Ubuntu 20.04/WSL**

Todos os scripts geram os arquivos de resultados utilizando o report em formato HTML. Para gerar o relatório, utilize os scripts abaixo:

```bash
npx playwright show-report
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

Esse teste utiliza as imagens de referência presentes no diretório `tests/visual.spec.ts-snapshots` e compara com cada página durante a execuçao dos testes

Para executar somente os testes E2E, execute:

```bash
npm run test:e2e
```

**Criando imagem docker para execução dos testes**

A imagem `Docker` executa os testes, gerando tambem o relatório de testes e iniciando o servidor web na porta 9323 para a visualização do mesmo

Primeiro, vamos criar uma rede docker para o container webapp e testing se comunicarem usando seus hostnames

```bash
docker network create net-webapp
91f7fddcddb0ca7ffc690ac8b7a54465b66b7b270ec275bc2b8a87ccef3b6842
```

Agora, crie a imagem do webapp utilizando o arquivo `Dockerfile.webapp`. Em seguida, inicie o container.

```bash
docker build -f Dockerfile.webapp -t webapp .
# wait ...

# o nome do container deve ser obrigatóriamente "web" porque o container de testes utiliza esse nome para acessar a aplcação web
docker run --network=net-webapp --name=web -p 3000:3000 --rm -d webapp
# wait...
```

Se quiser verificar que o site está rodando, abra o navegador com a página http://localhost:3000.

Para criar a imagem utilizando o arquivo `Dockerfile` e executar todos os testes, exceto o teste de UI, execute os seguintes comandos:

```bash
 docker build -f Dockerfile . -t test:docker
# aguarde o download e criação ...

# Para executar o script padrão, utilize o comando abaixo
# O container permanecerá em execução com o servidor web aberto, navegue para o endereço http://localhost para visualizar o relatório dos testes e pressione CTRL+C para desligar o servidor e remover o container
# opcionalmente é possível obter os arquivos de resultados no caso de falhas em alguns testes, basta montar um volume local interligado ao container utilizando o parametro "-v /fullpath:/tester"
docker run --network=net-webapp --name=testing -p 80:9323 --rm test:docker

> playwright-study@1.0.0 test:docker
> npx playwright test --grep-invert '@visual' --reporter=dot,html -c playwright.config-docker.ts ||:

Running 348 tests using 8 workers
················································································
·······························°·°··············································
············°°·······················································°·°········
···············································°·°······························
························°·°·
  10 skipped
  338 passed (1.6m)

To open last HTML report run:

  npx playwright show-report


> playwright-study@1.0.0 posttest:docker
> npx playwright show-report


Serving HTML report at http://127.0.0.1:9323. Press Ctrl+C to quit.

# or, for example, if you want to change the test reporter
# in this case, the HTML report will not be generated and the web server will not run
> docker run --rm --ipc=host test:docker npx playwright test --grep-invert '@visual' --project 'chromium-hd' --reporter=list
```

## Estrutura de diretórios

```text
.
<TBD>
```

-   [.github/workflows](https://github.com/ltsuda/playwright-study/tree/main/.github/workflows): diretório com arquivos de fluxo de trabalho que são executados em todo evento `push` para a branch `main` ou em todo evento de `pull request` aberto.
    -   main.yaml: executa todos os projetos de testes no Ubuntu, exceto os com tag @visual, gerando o relatório de resultados para o github-pages.
    -   docker.yaml: cria a imagem `Dockerfile`, executa os respectivos scripts das tags e2e e visual. Este fluxo de trabalho é executado em todo evento `pull request` e se o código é mergeado para a branch `main`.
-   [Dockerfile](https://github.com/ltsuda/playwright-study/blob/main/Dockerfile): arquivo de imagem docker com playwright para executar localmente no caso em que o NodeJS não esteja instalado no sistema.
-   [Dockerfile.webapp](https://github.com/ltsuda/playwright-study/blob/main/Dockerfile.webapp): arquivo de imagem docker com a aplicação web.
-   [playwright.config.ts](https://github.com/ltsuda/playwright-study/blob/main/playwright.config.ts): arquivo de configuração do Playwright para configurar coisas como a biblioteca de reporte de resultado, quantos `workers` a serem utilizados, criação dos projetos de teste com configurações específicas. Existem cinco projetos de testes, dois deles utilizando Chromium com resolução 1280x720 e 1920x1080 e os outros dois utilizando o Firefox/Webkit na resolução 1280x720. Veja [Configuração do Playwright](https://playwright.dev/docs/test-configuration) para aprender mais sobre as configurações disponíveis.
-   [tests](https://github.com/ltsuda/playwright-study/tree/main/tests): diretório com todos os arquivos de teste, incluindo os testes E2E e visuais.
-   [tests/visual.spec.ts-snapshots](https://github.com/ltsuda/playwright-study/tree/main/tests/visual.spec.ts-snapshots): diretório com os arquivos de imagem padrões para os testes visuais onde são comparadas durante a execução dos testes.
-   [sample-app-web](https://github.com/ltsuda/playwright-study/tree/main/sample-app-web): diretório com o código buildado do website saucelabs demo que é utilizado para inicializar o servidor web para execução dos testes, ao invés de utilizar o website público https://www.saucedemo.com/
