const IS_DEV = process.env.ENVIRONMENT === 'development';

const API_URL = IS_DEV
    ? 'http://localhost:3000/'
    : 'https://jira.mrgreen.zone/';

module.exports = {
    IS_DEV,
    API_URL
};
