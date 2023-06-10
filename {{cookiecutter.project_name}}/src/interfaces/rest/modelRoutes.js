const {{cookiecutter.model_class_name}}Service = require('../../application/{{cookiecutter.model_name}}Service');
const {{cookiecutter.model_class_name}} = require('../../domain/{{cookiecutter.model_name}}');

/**
 * use DynamoDB as database
 */
const DbAdapter = require('../../infrastructure/db/dynamoDbAdapter');

const dbAdapter = new DbAdapter();
const {{cookiecutter.model_class_name}}Service = new {{cookiecutter.model_class_name}}Service(dbAdapter);

/**
 * 
 * @param {*} event 
 * @returns 
 */
module.exports.create = async (event) => {
    const {{cookiecutter.model_name}}Data = JSON.parse(event.body);
    const {{cookiecutter.model_name}} = new {{cookiecutter.model_class_name}}({{cookiecutter.model_name}}Data);
    await {{cookiecutter.model_name}}Service.create({{cookiecutter.model_name}});
    return {
        statusCode: 201,
        body: JSON.stringify({{cookiecutter.model_name}}),
    };
};

/**
 * 
 * @param {*} event 
 * @returns 
 */
module.exports.read = async (event) => {
    const id = event.pathParameters.id;
    const {{cookiecutter.model_name}} = await {{cookiecutter.model_name}}Service.read(id);
    return {
        statusCode: 200,
        body: JSON.stringify({{cookiecutter.model_name}}),
    };
};

/**
 * 
 * @param {*} event
 * @returns
 */
module.exports.update = async (event) => {
    const id = event.pathParameters.id;
    const {{cookiecutter.model_name}}Data = JSON.parse(event.body);
    await {{cookiecutter.model_name}}Service.update(id, {{cookiecutter.model_name}}Data);
    return {
        statusCode: 200,
        body: JSON.stringify({{cookiecutter.model_name}}Data),
    };
};

/**
 * 
 * @param {*} event 
 * @returns
 */
module.exports.delete = async (event) => {
    const id = event.pathParameters.id;
    await {{cookiecutter.model_name}}Service.delete(id);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Object deleted successfully' }),
    };
};
