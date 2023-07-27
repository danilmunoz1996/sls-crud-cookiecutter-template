const Service = require('../../application/Service');
const Model = require('../../domain/Model');

/**
 * use DynamoDB as database
 */
const DbAdapter = require('../../infrastructure/db/dynamoDbAdapter');

const dbAdapter = new DbAdapter();
const service = new Service(dbAdapter);

/**
 * 
 * @param {*} event 
 * @returns 
 */
module.exports.create = async (event) => {
    const modelData = JSON.parse(event.body);
    const model = new Model(data);
    await service.create(model);
    return {
        statusCode: 201,
        body: JSON.stringify(model)
    };
};

/**
 * 
 * @param {*} event 
 * @returns 
 */
module.exports.read = async (event) => {
    const id = event.pathParameters.id;
    const model = await service.read(id);
    return {
        statusCode: 200,
        body: JSON.stringify(model),
    };
};

/**
 * 
 * @param {*} event
 * @returns
 */
module.exports.update = async (event) => {
    const id = event.pathParameters.id;
    const data = JSON.parse(event.body);
    await service.update(id, data);
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};

/**
 * 
 * @param {*} event 
 * @returns
 */
module.exports.delete = async (event) => {
    const id = event.pathParameters.id;
    await service.delete(id);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Object deleted successfully' }),
    };
};
