const config = require('./config.js');
const chrome = require('./chrome.js');

const fetchIssueData = () =>
    new Promise((resolve, reject) => {
        chrome
            .getIssueKey()
            .then(key => {
                fetch(
                    `${config.API_URL}rest/api/latest/issue/${key}?fields=summary`
                )
                    .then(res => resolve(res))
                    .catch(err => reject('fetch', err));
            })
            .catch(error => reject('chrome', error));
    });

module.exports = { fetchIssueData };
