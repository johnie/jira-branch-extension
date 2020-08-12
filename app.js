const config = require('./lib/config.js');
const utils = require('./lib/utils.js');
const api = require('./lib/api.js');

const branchType = ['Feature', 'Bugfix', 'Hotfix', 'Release', 'None'];

const branchTypeData = branchType.map(name => {
    const val = name.toLowerCase();
    return {
        name,
        value: val !== 'none' ? `${val}/` : ''
    };
});

const radioHtml = ({ name, value }) => `
<option value="${value}">${name}</option>
`;

const branchTypeHtml = branchTypeData.map(data => radioHtml(data)).join('');

const issueDataMapper = data => {
    return {
        issue: data.key,
        title: data.fields.summary
    };
};

document.addEventListener('DOMContentLoaded', function() {
    const SELECT_BRANCH_TYPE = document.querySelector('#branchType');
    const ISSUE_TITLE_INPUT = document.querySelector('#issueTitle');
    const COPY = document.querySelector('#copy');
    const PREVIEW = document.querySelector('#preview');
    SELECT_BRANCH_TYPE.innerHTML = branchTypeHtml;
    let titleS;
    let issuuuuu;

    api.fetchIssueData()
        .then(res => res.json())
        .then(data => {
            const res = issueDataMapper(data);
            const title = utils.slugify(res.title);
            const issue = res.issue;
            issuuuuu = issue;
            const branchName = `${issue}-${title}`;
            titleS = branchName;
            ISSUE_TITLE_INPUT.value = branchName;
            const finalName = `${SELECT_BRANCH_TYPE.value}${branchName}`;
            PREVIEW.innerHTML = finalName;
            COPY.addEventListener('click', function() {
                utils.copyToClipboard(finalName);
            });
        });

    const form = document.querySelector('form');
    SELECT_BRANCH_TYPE.addEventListener('change', function(e) {
        PREVIEW.innerHTML = utils.setFullBranchName({
            type: e.target.value,
            issue: issuuuuu,
            title: titleS
        });
    });
});
