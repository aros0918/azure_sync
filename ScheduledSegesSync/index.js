const { createAuthToken } = require('./helpers/authenticate');
const { validateHerdObject, insertHerdAnimals } = require('./helpers/animals');
const { db } = require('./helpers/db');
const config = require('./config')
module.exports = async function (context, myTimer) {
    const timeStamp = new Date().toISOString();
    try {
        if (myTimer.isPastDue) {
            context.log('Trigger is running late!');
        }
        const { herdNumber, id } = config.herd;
        const herdDetails = { herdNumber, id };
        validateHerdObject(herdDetails,context)
        await db.sync();
        const tokens = await createAuthToken();
        const { access_token } = tokens;
        await insertHerdAnimals(access_token, herdDetails,context);
        context.log('Trigger function ran!', timeStamp);
    } catch (error) {
        context.log('Error ->', error);
    }
};