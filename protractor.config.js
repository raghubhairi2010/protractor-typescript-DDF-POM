// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const protractor = require('protractor');
const PrettyReporter = require('protractor-pretty-html-reporter').Reporter;
var FileUtil = require('./e2e/protractor/util/FileUtil');
var path = require('path');
const prettyReporter = new PrettyReporter({
    // required, there is no default
    path: path.join(__dirname, 'results'),
    screenshotOnPassed: true
});

exports.config = {
    // This will destroy and creates the new browser object for each test.
    restartBrowserBetweenTests: true,
    capabilities: {
        'browserName': 'chrome'
    },
    suites: {
        regressionSuite: './dist/out-tsc/e2e/protractor/regression-suite/registration*.js'
    },
    /*
    * It will connect to locally installed browser. First preference will be chrome and next is
    * firefox. In order to use this configuration either of these browsers must be installed in 
    * script running machine.
    */
     directConnect: true,
    //seleniumServerJar: './node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.12.0.jar',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 1200000
    },
    onPrepare() {
        /* jasmine.getEnv().addReporter(new SpecReporter(
            {
                spec: { displayStackTrace: true }
            }
        )); */
        jasmine.getEnv().addReporter(prettyReporter);
        protractor.browser.manage().window().maximize();
        protractor.browser.manage().timeouts().implicitlyWait(10000);
    },
    onComplete() {
        var fileUtil = new FileUtil();
        fileUtil.moveFolder("C:/Workspaces/ProtractorAutomationFramework/results", "C:/Execution_Reports");
    },

    /* if using isSharded option see below */
    beforeLaunch() {
        prettyReporter.startReporter();
    }
}