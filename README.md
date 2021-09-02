[![Playwright-CI](https://github.com/ltsuda/playwright-study/actions/workflows/main.yml/badge.svg)](https://github.com/ltsuda/playwright-study/actions/workflows/main.yml)
[![](https://img.shields.io/badge/README-Portuguese%7CBR-blue)](https://github.com/ltsuda/playwright-study/blob/main/README-ptbr.md)

# [Playwright Study](https://playwright.dev/)

Repository with the purpose of learning a new E2E testing framework using Microsoft's 🎭 Playwright with Javascript

## System Under Test

<a href="https://www.saucedemo.com/">
<img src="https://www.saucedemo.com/static/media/Login_Bot_graphic.20658452.png" width=120>
</a>

The website used in this repository is e-commerce sample from [SauceLabs Demo](https://www.saucedemo.com/)




## Installation and execution

### Requirements
 - [git](https://git-scm.com/downloads)
 - [node 14+](https://nodejs.org/en/)
   - or use [nvm](https://github.com/nvm-sh/nvm) to manage multiple node versions
 - Java 8+ (Optional) for [allure-commandline](https://github.com/allure-framework/allure-npm#:~:text=Allure%20Commandline%20is%20a%20tool%20to%20generate%20Allure,you%20can%20get%20it%20installed%20directly%20from%20NPM.) to be able to generate and serve the reports
 - Docker (Optional) for running tests on container

#### Cloning repository

```text
git clone https://github.com/ltsuda/playwright-study.git
```

#### Installing dependencies
```bash
npm install -D
# this will install all necessary development packages to run the tests. See package.json to see all packages installed
```

#### Running the tests
In this repository there are multiple test scripts with different configurations. Please, see the `package.json/scripts` to see all options and to see the Playwright' projects, see file `playwright.config.js`

**To run on Windows, use Playwright's CLI syntax directly**
For example:
```bash
# to run all tests on chromium with 1280x720 viewport
npx playwright test --project 'chromium-hd'

# to run all test with specific tag
npx playwright test --grep <tag>
```

**The following scripts was tested on Ubuntu 20.04/WSL**

All test scripts will generate the result' files using the Allure Test Report. Too generate the report, use the following scripts:
```bash
npm run allure:generate
```
This will generate ./allure-reports, then run:
```bash
npm run allure:open
...
Server started at <http://127.0.1.1:39923/>. Press <Ctrl+C> to exit
```
This will start a webserver with the tests report, just ctrl+click or open the URL that is showing on your terminal


Run the following script to run only the tests using the Chromium browser with 1280x720 viewport
```bash
npm run test
```

To run the Visual test cases, run:
```bash
npm run test:visual
```
This uses the golden images present at `tests/visual.spec.js-snapshots` directory and compares them with the pages during the test run

To run E2E sample tests, run:
```bash
npm run test:e2e
```

**Building docker image to run the tests**

There are 3 docker image files but it's better to just use the `Docker.local` and leave the other ones to run on CI as it doesn't save the result files.

The `Docker.local` image runs the tests with the allure-playwright reporter and starts the allure web server on port 7777 serving the tests reports.
To build the image and run all tests projects, except visual tests, run the following commands:

```bash
> docker build -f Dockerfile.local . -t test:local
# wait ...

# To run the default node script, use the following command
# The container will continue running with the allure webserver open, navigate to http://localhost to see the test reports and press CTRL+C to stop the webserver and remove the container
# optionally, if you want the test results in case some test fails, bind a volume to host with "-v /fullpath:/tester/test-results/" on the docker command
> docker run --rm --ipc=host -p 80:7777 test:local

playwright-study@1.0.0 test:docker:local /tester
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

playwright-study@1.0.0 posttest:docker:local /tester
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

# or, for example, if you want to change the test reporter
# in this case, the allure report will not be generated and the allure server will not run
> docker run --rm --ipc=host test:local npx playwright test --grep-invert '@visual' --project 'chromium-hd' --reporter=list
```

## Directory structure
```text
.
├── .github/workflows
├── README.md
├── package-lock.json
├── package.json
├── playwright.config.js
├── Dockerfile
├── Dockerfile.local
├── Dockerfile.visual
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
└── tests
    ├── *.spec.js
    └── visual.spec.js-snapshots
        └── *.png
```
 - [.github/workflows](https://github.com/ltsuda/playwright-study/tree/main/.github/workflows): directory with github workflows that runs at every `push` to main or every `pull request` open.
   - main.yaml: run all test projects on Ubuntu, except the ones with tag @visual, generates the allure report and post to github-pages
   - docker.yaml: build images `Dockerfile` and `Docker.visual`, run respective scripts for both images and push to Dockerhub if everything is OK. This workflow runs on every `pull request` but only pushes the images if code is pushed to the `main` branch.
 - [Dockerfile](https://github.com/ltsuda/playwright-study/blob/main/Dockerfile): docker image file to run tests on container in Github Actions.
 - [Dockerfile.local](https://github.com/ltsuda/playwright-study/blob/main/Dockerfile.local): docker image file to run locally in case of node it's not installed.
 - [Dockerfile.visual](https://github.com/ltsuda/playwright-study/blob/main/Dockerfile.visual):  docker image file to run visual tests on container in Github Actions.
 - [playwright.config.js](https://github.com/ltsuda/playwright-study/blob/main/playwright.config.js): playwright's configuration file to setup things like which reporter library to use, how many test workers to be used, creation of test's project with specific settings. There are five test projects configured, two of them using chromium with 1280x720 and 1920x1080 viewports and three others with Chrome/Firefox/Webkit and 1280x720 resolution.
 - [saucedemo/pages](https://github.com/ltsuda/playwright-study/tree/main/saucedemo/pages): directory with all page objects and controllers files. The components file holds each page/component' selectors and functions that returns its [Locator](https://playwright.dev/docs/api/class-locator). The controller file is the one responsible for interacting with the page' elements or manipulate page's data.
 - [saucedemo/pageFixtures.js](https://github.com/ltsuda/playwright-study/blob/main/saucedemo/pages/pageFixtures.js): file with shared functions [Fixtures](https://playwright.dev/docs/test-fixtures) that extends playwright's `test` to instantiate all page's controller so each test case loads only the controller it needs.
 - [saucedemo/utils](https://github.com/ltsuda/playwright-study/tree/main/saucedemo/utils): directory with a file containing all constants used in the tests like all the path URLs, error messages, etc. And the other file with some utilities functions like the one that sets the page's cookie to start some tests already authenticated.
 - [tests](https://github.com/ltsuda/playwright-study/tree/main/tests): directory with all test specs files, including the e2e and visual ones.
 - [tests/visual.spec.js-snapshots](https://github.com/ltsuda/playwright-study/tree/main/tests/visual.spec.js-snapshots): directory with the golden images for the visual test cases using the chromium-hd project.
