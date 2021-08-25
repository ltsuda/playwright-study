[![Playwright-CI](https://github.com/ltsuda/playwright-study/actions/workflows/main.yml/badge.svg)](https://github.com/ltsuda/playwright-study/actions/workflows/main.yml)

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

#### Cloning repository

```text
git clone https://github.com/ltsuda/playwright-study.git
```

#### Installing dependencies
```node
npm install -D
# this will install all necessary development packages to run the tests. See package.json to see all packages installed
```

#### Running the tests
In this repository there are multiple test scripts with different configurations. Please, see the `package.json/scripts` to see all options and to see the Playwright' projects, see file `playwright.config.js`

**To run on Windows, use Playwright's CLI syntax directly**
For example:
```node
# to run all tests on chromium with 1280x720 viewport
npx playwright test --project 'chromium-hd'

# to run all test with specific tag
npx playwright test --grep <tag>
```

**The following scrips was tested on Ubuntu 20.04/WSL**

All test scripts will generate the result' files using the Allure Test Report. Too generate the report, use the following scripts:
```node
npm run allure:generate
```
This will generate ./allure-reports, then run:
```node
npm run allure:open
...
Server started at <http://127.0.1.1:39923/>. Press <Ctrl+C> to exit
```
This will start a webserver with the tests report, just ctrl+click or open the URL that is showing on your terminal


Run the following script to run only the tests using the Chromium browser with 1280x720 viewport
```node
npm run test
```

To run the Visual test cases, run:
```node
npm run test:visual
```
This uses the golden images present at `tests/visual.spec.js-snapshots` directory and compares them with the pages during the test run

To run E2E sample tests, run:
```node
npm run test:e2e
```


## Directory structure
```text
.
├── .github/workflows
├── README.md
├── package-lock.json
├── package.json
├── playwright.config.js
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
 - [.github/workflows](https://github.com/ltsuda/playwright-study/tree/main/.github/workflows): directory with github workflows that runs at every push to main or every pull request open.
 - [playwright.config.js](https://github.com/ltsuda/playwright-study/blob/main/playwright.config.js): playwright's configuration file to setup things like which reporter library to use, how many test workers to be used, creation of test's project with specific settings. There are four test projects configured, two of them using chromium with 1280x720 and 1920x1080 viewports and two others with chrome and the same view ports. The Firefox and Webkit are commented out as they're making most of the tests to fail, so it needs some throubleshooting before enabling them. See [Playwright Configuration](https://playwright.dev/docs/test-configuration) to know more about the configurations available.
 - [saucedemo/pages](https://github.com/ltsuda/playwright-study/tree/main/saucedemo/pages): directory with all page objects and controllers files. The components file holds each page/component' selectors and functions that returns its [Locator](https://playwright.dev/docs/api/class-locator) or [ElementHandle](https://playwright.dev/docs/api/class-elementhandle). The controller file is the one responsible for interacting with the page' elements or manipulate page's data.
 - [saucedemo/pageFixtures.js](https://github.com/ltsuda/playwright-study/blob/main/saucedemo/pages/pageFixtures.js): file with shared functions [Fixtures](https://playwright.dev/docs/test-fixtures) that extends playwright's `test` to instantiate all page's controller so each test case loads only the controller it needs.
 - [saucedemo/utils](https://github.com/ltsuda/playwright-study/tree/main/saucedemo/utils): diretory with a file containing all constants used in the tests like all the path URLs, error messages, etc. And the other file with some utilities functions like the one that sets the page's cookie to start some tests already authenticated.
 - [tests](https://github.com/ltsuda/playwright-study/tree/main/tests): directory with all test specs files, including the e2e and visual ones.
 - [tests/visual.spec.js-snapshots](https://github.com/ltsuda/playwright-study/tree/main/tests/visual.spec.js-snapshots): directory with the golden images for the visual test cases using the chromium-hd project.
