require('dotenv').config()

module.exports = {
    clientSecret: process.env.clientSecret || "ysCJVSxGFi6m8G6KEGXdWe6NXbf6EXpoYNvDaYfXFOtcjumVYp",
    oidcClientId: process.env.oidcClientId || "dcfodata-microfeeder-prod",
    redirectUri: process.env.redirectUri || "https://prod-dcf-odata.dlbr.dk/DCFOData/",
    redirectUriStaging: process.env.redirectUriStaging || "https://accepttest-dcf-odata.dlbr.dk/DCFOData/",
    oidcScope: process.env.oidcScope || "dcfodata",
    userName: 'microfeeder',
    password: 'SHZ9X9$P',
    hostName: 'mssql8.wannafind.dk',
    sampleDbName: 'microfeeder_com',
    // userName: process.env.userName || 'sa',
    // password: process.env.password || 'password',
    // hostName: process.env.hostName || 'localhost',
    // sampleDbName: process.env.sampleDbName || 'SampleDB',

    // Credentials for new API
    TestClientId: "urn:accepttestexternal-cattle_dcfodata_microfeeder_ccg",
    TestClientSecret: "9ZNcwQHSdg6GtZEz1Qf$cYrRgST8bk&btO8%1BSc#lD3S5PDz$",
    TestScope: "accepttestexternal.cattle_dcfodata.api",
    ClientId: "urn:prod-cattle_dcfodata_microfeeder_ccg",
    ClientSecret: "@KC0I9Xt7PRgtjiMIhXjQu1^^w$kLs7FvVFhxUJ&scy4eLhUCP",
    Scope: "prod.cattle_dcfodata.api",
    herd: [{
    herdNumber: 29035,
    id: 1
    }]
}