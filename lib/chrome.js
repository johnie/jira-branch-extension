const config = require('./config');
const utils = require('./utils');

const getIssueKey = () =>
    new Promise((resolve, reject) => {
        if (chrome.tabs && chrome.tabs.query) {
            chrome.tabs.query({ active: true }, function(tabs) {
                const [tab] = tabs;
                const issue = utils.getIssueFromUrl(tab.url);
                resolve(issue);
            });
        } else if (config.IS_DEV) {
            resolve('PRGG-888');
        } else {
            reject(false);
        }
    });

module.exports = {
    getIssueKey
};
