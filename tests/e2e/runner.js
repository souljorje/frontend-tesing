/* eslint-disable */
const createTestCafe = require('testcafe');
const glob = require('glob-promise');
const BrowserStack = require('browserstack');
const chalk = require('chalk');
require('dotenv').config();

/* / Each sub array defines a batch of browserstack workers.
 Our current plan allows for a max of 5 workers at a time,
 so to avoid crashing browserstack we group our browsers
 into 2 batches that run will run consecutively. / */

const SUPPORTED_BROWSERS = [
  [
    "browserstack:iPhone SE@11.2"
  ],
];

const browserStackCredentials = {
  username: process.env.BROWSERSTACK_USERNAME,
  password: process.env.BROWSERSTACK_PASSWORD,
};

async function getFiles(globPattern) {
  return await glob(globPattern)
    .then(files => files)
    .catch(e => console.error(e));
}

async function getRunningBrowserstackSessions() {
  const client = BrowserStack.createClient(browserStackCredentials);
  const workerStatus = await new Promise(function (resolve, reject) {
    client.getApiStatus((error, workers) => {
      if (error) reject(error);
      else resolve(workers);
    });
  });
  return workerStatus;
}

async function createTestCafeInstance(browsers, testFiles) {
  let testcafe;
  await createTestCafe()
    .then((tc) => {
      testcafe = tc;
      return tc
        .createRunner()
        .startApp('yarn dev')
        .src(testFiles)
        .browsers(browsers)
        .run();
    })
    .then((failedCount) => {
      console.log(`Tests failed: ${failedCount}`);
      testcafe.close();
    })
    .catch(err => console.error(err));
}

async function startTests(browsers, createTestCafeInstance) {
  // The testcafe node api does not accept glob patterns, so grab relevant test files using node-glob
  const files = await getFiles('./tests/e2e/*.test.js');
  console.log(files)
  // Check that there are no tests already running
  const sessionInfo = await getRunningBrowserstackSessions();
  if (sessionInfo.running_sessions !== 0) {
    console.error(
      chalk.red(
        'There are not enough available Browserstack workers to run these tests. \nPlease cancel any running sessions from the Browserstack Automate dashboard and try again. \n',
      ),
    );
  } else {
    // Create a new testcafe instance for each batch of browsers
    for (let i = 0; i < browsers.length; i++) {
      await createTestCafeInstance(browsers[i], files);
    }
  }
}

startTests(SUPPORTED_BROWSERS, createTestCafeInstance);
