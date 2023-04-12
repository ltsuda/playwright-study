[![Playwright-CI](https://github.com/ltsuda/playwright-study/actions/workflows/main.yml/badge.svg)](https://github.com/ltsuda/playwright-study/actions/workflows/main.yml)
[![](https://img.shields.io/badge/README-Portuguese%7CBR-blue)](https://github.com/ltsuda/playwright-study/blob/main/README-ptbr.md)

# IMPORTANT

* For the old project using Playwright Test with JavaScript and old Saucelabs design, go to [old-design](https://github.com/ltsuda/playwright-study/tree/old-design) branch
* For the old project using Playwright Test with JavaScript and newest Saucelabs design, go to [new-design-js](https://github.com/ltsuda/playwright-study/tree/new-design-js) branch

NOTE:
* The `main` branch will use Playwright Test with TypeScript and all test code will be created from scratch, using new approach and take advantage of the latest features from Playwright


# [Playwright Study](https://playwright.dev/)

Repository with the purpose of learning a new E2E testing framework using Microsoft's 🎭 Playwright with TypeScript

## System Under Test

The website used in this repository is e-commerce sample from [SauceLabs Demo](https://www.saucedemo.com/) but running locally, using [Sample-app-web](https://github.com/ltsuda/sample-app-web) that is a fork from the original code

## Installation and execution

### Requirements

-   [git](https://git-scm.com/downloads)
-   [node 16-18](https://nodejs.org/en/)
    -   or use [nvm](https://github.com/nvm-sh/nvm) to manage multiple node versions
-   Docker (Optional) for running tests on container

#### Cloning repository

```text
git clone https://github.com/ltsuda/playwright-study.git
```

#### Installing dependencies

```bash
# this will install all necessary development packages to run the tests. See package.json to see all packages installed
npm ci
# to install playwright's browsers
npx playwright install && npx playwright install-deps
# this will install all dependencies for the Webapp submodule
```

#### Running the tests

In this repository there are multiple test scripts with different configurations. Please, see the `package.json/scripts` to see all options and to see the Playwright' projects, see file `playwright.config.ts`

**To run on Windows, use Playwright's CLI syntax directly**
For example:

```bash
# to run all tests on chromium with 1280x720 viewport
npx playwright test --project 'chromium-hd'

# to run all test with specific tag
npx playwright test --grep <tag>
```

**The following scripts was tested on Ubuntu 22.04/WSL**

All test scripts will generate the tests results using the HTML Reporter. To show the report, use the following scripts:

```bash
npx playwright show-report
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

This uses the golden images present at `tests/visual.spec.ts-snapshots` directory and compares them with the pages during the test run

To run E2E sample tests, run:

```bash
npm run test:e2e
```

**Building docker image to run the tests**

The `Docker` image runs the tests with the HTML reporter and starts the web server on port 9323 serving the tests reports.

First, let's create a docker network so both, the webapp and the testing container can communicate using their hostname.

```bash
docker network create net-webapp
91f7fddcddb0ca7ffc690ac8b7a54465b66b7b270ec275bc2b8a87ccef3b6842
```

Now, build the webapp docker image using the `Dockerfile.webapp` file. Then, start up the container.

```bash
docker build -f Dockerfile.webapp -t webapp .
# wait ...

# the container name MUST be "web" as the testing container uses that to access the webapp
docker run --network=net-webapp --name=web -p 3000:3000 --rm -d webapp
# wait...
```

If you want to make sure the webapp is running, open a browser with http://localhost:3000.

To build the image using the `Dockerfile` and run all tests projects, except visual tests, run the following commands:

```bash
docker build -f Dockerfile -t test:docker .
# wait ...

# To run the default node script, use the following command
# The container will continue running with the webserver open, navigate to http://localhost to see the test reports and press CTRL+C to stop the webserver and remove the container
# optionally, if you want the test results in case some test fails, bind a volume to host with "-v /fullpath:/tester" on the docker command
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


> playwright-study@1.0.0 posttest:docker
> npx playwright show-report


Serving HTML report at http://127.0.0.1:9323. Press Ctrl+C to quit.

# or, for example, if you want to change the test reporter
# in this case, the HTML report will not be generated and the web server will not run
docker run --network=net-webapp --name=testing -p 80:9323 --ipc=host --rm test:docker npx playwright test --grep-invert '@visual' --project 'chromium-hd' --reporter=list
```

## Directory structure

```text
.
<TBD>
```

-   [.github/workflows](https://github.com/ltsuda/playwright-study/tree/main/.github/workflows): directory with github workflows that runs at every `push` to main or every `pull request` open.
    -   main.yaml: run all test projects on Ubuntu, except the ones with tag @visual, generates the HTML report and posts to github-pages
    -   docker.yaml: build image `Dockerfile`, run respective scripts for both e2e and visual tags. This workflow runs on every `pull request` or push to the `main` branch.
-   [Dockerfile](https://github.com/ltsuda/playwright-study/blob/main/Dockerfile): docker image file with playwright to run locally in case of node it's not installed.
-   [Dockerfile.webapp](https://github.com/ltsuda/playwright-study/blob/main/Dockerfile.webapp): docker image file with the Webapp application.
-   [playwright.config.ts](https://github.com/ltsuda/playwright-study/blob/main/playwright.config.ts): playwright's configuration file to setup things like which reporter library to use, how many test workers to be used, creation of test's project with specific settings. There are five test projects configured, two of them using chromium with 1280x720 and 1920x1080 viewports and two others with Firefox/Webkit and 1280x720 resolution.
-   [tests](https://github.com/ltsuda/playwright-study/tree/main/tests): directory with all test specs files, including the e2e and visual ones.
-   [tests/visual.spec.ts-snapshots](https://github.com/ltsuda/playwright-study/tree/main/tests/visual.spec.ts-snapshots): directory with the golden images for the visual test cases using the chromium-hd project.
-   [sample-app-web](https://github.com/ltsuda/playwright-study/tree/main/sample-app-web): directory with the saucelabs demo built code that it's used to startup the webserver to run the tests, instead of using the public website https://www.saucedemo.com/
