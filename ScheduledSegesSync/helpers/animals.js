const { Animals } = require("./../models/animals.model");
const axios = require('axios');

const validateHerdObject = (herd = null,context) => {
    herd = [{herdNumber: 29035, id: 1 }];
    context.log("HERD: " + JSON.stringify(herd));
    const keys = ['herdNumber', 'id']
    if (!herd || herd.length == 0)
        throw new Error("Empty Payload")
    return herd.forEach(element => {
        context.log("ELEMENT: " + JSON.stringify(element));
        Object.keys(element).map(key => {
            if (keys.indexOf(key) == -1)
                throw new Error("Payload Object Error Validation failed for :" + key + 'Must contain herdNumber & id as array of objects')
        })
    });

}

const getHerdCount = async (HerdNumber) => {
    return await Animals.findAll({
        where: { HerdNumber },
        raw: true
    })
}

const clearHerdAnimals = async (HerdNumber) => {
    return await Animals.destroy({
        where: { HerdNumber }
    })
}


/**
 * Axios post request to retrive all animals
 * @param {*} accessToken 
 */
const getAnimals = async (obj) => {
    try {
        const { access_token, herdNumber } = obj;
        const payload = {
            "HerdNumber": herdNumber
        }
        console.log("Initiating getAnimals API, This may take some time!")
        const responseMessage3 = await axios.post('https://prod-dcf-odata.dlbr.dk/DCFOData/CattleWebApi/AnimalPublicOperations/GetAnimals', payload, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': ' application/json; charset=utf-8',
                'Content-Length': 30,
                'Expect': '100-continue',
            }
        });
        return responseMessage3.data
    } catch (error) {
        return error
    }
}
/**
 * Initial function
 * 
 */
const triggerScript = async ({ access_token, herdNumber }) => {
    try {
        console.log("Calling Getanimals APi =>", herdNumber)
        const animals = await getAnimals({ access_token, herdNumber });
        return animals['Animals'];
    } catch (error) {
        console.log("triggerScript error=>")
        return error;
    }
}
/**
 * @param {*} herd : Aray of objects
 * Eg: [{ herdNumber: 1234, id: 1 }, { herdNumber: 1234, id: 1 }]
 */
const insertHerdAnimals = async (access_token, herd,context) => {
    herd = [{herdNumber: 29035},{herdNumber: 30210}];
    try {
        const insertAnimals = herd.map(async data => {
            context.log("Starting run for herdnumber:", data.herdNumber)
            const payload = { access_token, ...data };
            const { herdNumber } = data;
            const hCount = await getHerdCount(herdNumber);
            context.log("hCount.length for herdnumber: " + data.herdNumber + " =>" + hCount.length)
            if (hCount && hCount.length) {
                await clearHerdAnimals(herdNumber);
                context.log("deleted Existing Herd Animals");
            }
            const values = await triggerScript(payload);
            if (values)
            {
                context.log("Got new animals for herd " + data.herdNumber + " with count: " + values.length);
                await Animals.bulkCreate(values, { returning: true })
                context.log("data inserted!!")
            }
        })
        return await Promise.all(insertAnimals)
    } catch (error) {
        context.log("insertHerdAnimals Error=>",error.message)
    }
}
module.exports = { validateHerdObject, insertHerdAnimals }