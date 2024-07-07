const { createAuthToken } = require('./helpers/authenticate');
const { validateHerdObject, insertHerdAnimals } = require('./helpers/animals')
const { db } = require('./helpers/db')
module.exports = async function (context, req) {
    try {
        if (!req.body || !req.body.herdDetails) {
            context.res = {
                status: 400,
                body: { error: "Please pass 'herdDetails' in the request body, Eg: herdDetails: [{ herdNumber: 1234, id: 1 }, { herdNumber: 1234, id: 1 }] " }
            };
        } else {
            const herdDetails = req.body.herdDetails;
            validateHerdObject(herdDetails)
            await db.sync();
            const tokens = await createAuthToken();
            const { access_token } = tokens;
            console.log("Token created :>")
            await insertHerdAnimals(access_token, herdDetails);
            context.res = {
                status: 200,
                body: { message: "Sync Completed" }
            };
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message || 'Something went wrong!'
        };
    }

};
