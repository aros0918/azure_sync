// Define the 'Animals' model
const Sequelize = require('sequelize')
const { db } = require('./../helpers/db')
const Animals = db.define('PitstopPLUS_synccow', {
    Id: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    //'$id': Sequelize.STRING,
    AnimalNumber: Sequelize.BIGINT,
    ShortNumber: Sequelize.BIGINT,
    LactationNumber: Sequelize.BIGINT,
    HerdId: Sequelize.BIGINT,
    HerdNumber: Sequelize.BIGINT,
    LatestCalvingDate: Sequelize.STRING,
    LatestCalvingNumber: Sequelize.BIGINT,
    
    /*AIDate: Sequelize.STRING,
    AISireAnimalNumber: Sequelize.BIGINT,
    AISireHerdbookNumber: Sequelize.BIGINT,
    AISireName: Sequelize.STRING,
    AiSireExternalBreed: Sequelize.STRING,
    AISemenProductCode: Sequelize.BIGINT,
    AINumberSinceLastCalving: Sequelize.BIGINT,
    NMStartDate: Sequelize.STRING,
    NMEndDate: Sequelize.STRING,
    NMSireAnimalNumber: Sequelize.STRING,
    NMSireHerdbookNumber: Sequelize.STRING,
    NMSireName: Sequelize.STRING,
    NMSireExternalBreed: Sequelize.STRING,
    LatestHeatDate: Sequelize.STRING,
    LatestBleedDate: Sequelize.STRING,
    LatestPregnancyCheckDate: Sequelize.STRING,
    LatestPregnancyCheckResult: Sequelize.STRING,
    LatestDryOffDate: Sequelize.STRING,
    AnimalName: Sequelize.STRING,
    AnimalArrivalDate: Sequelize.STRING,
    GenderId: Sequelize.STRING,
    AnimalBreed: Sequelize.STRING,
    */
    DateOfBirth: Sequelize.STRING,
    KgECMLastTestDay: Sequelize.STRING,
    /*
    BatchName: Sequelize.STRING,
    BatchNumber: Sequelize.STRING,
    LatestAbortionDate: Sequelize.STRING,
    BodyCondition: Sequelize.STRING,
    InseminationBullSuggestion1: Sequelize.STRING,
    InseminationBullSuggestion2: Sequelize.STRING,
    InseminationBullSuggestion3: Sequelize.STRING,
    */
    ExpectedCalvingDate: Sequelize.STRING,
    CullingRegistrationDate: Sequelize.STRING,
    //LatestEggTransplantation: Sequelize.STRING,
    InternalAnimalIdentifiers: {
        type: Sequelize.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('InternalAnimalIdentifiers').split(';')
        },
        set(val) {
            this.setDataValue('InternalAnimalIdentifiers', val.join(';'));
        },
    }
});
module.exports = { Animals }