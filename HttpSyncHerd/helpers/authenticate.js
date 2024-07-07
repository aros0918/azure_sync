const rp = require('request-promise');
const cookiejar = rp.jar();
const { clientSecret, oidcClientId, oidcScope, redirectUri, redirectUriStaging } = require('./../config')
const { TestClientId, TestClientSecret, TestScope } = require('./../config');
const { ClientId, ClientSecret, Scope } = require('./../config');

const Execute = (code) => {
    return new Promise((resolve, reject) => {
        const postdata = {
            grant_type: "client_credentials",
            client_id: ClientId,
            client_secret: ClientSecret,
            scope: Scope
        }
        const options = {
            method: 'POST',
            uri: 'https://login.agroid.dk/connect/token',
            jar: cookiejar,
            form: postdata
        };
        rp(options)
            .then(function (parsedBody) {
                console.log("Phase Completed!")
                resolve(parsedBody);
            })
            .catch(function (err) {
                reject(err);
            });
    })
}

/**
 * create access token
 */
const createAuthToken = async () => {
    try {
        console.log("Initiating authentication process. Keep Calm !!")
        const authTokens = await Execute();
        return JSON.parse(authTokens);
    } catch (error) {
        return error;
    }
}
module.exports = { createAuthToken }