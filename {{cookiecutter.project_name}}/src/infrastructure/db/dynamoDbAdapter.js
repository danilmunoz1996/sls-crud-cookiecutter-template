const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const Model = require('../../domain/Model');

const TABLE_NAME = process.env.TABLE_NAME;

class DynamoDbAdapter {
    constructor(tableName = TABLE_NAME) {
        this.tableName = tableName;
    }

    async create(model) {
        const params = {
          TableName: this.tableName,
          Item: model.toItem(),
        };

        try {
            await dynamoDb.put(params).promise();
            const result = await this.read(model.pk());
            return result;
        } catch (error) {
          console.error(error);
          throw error;
        }
    }

    async read(id) {
        const params = {
          TableName: this.tableName,
          Key: Model.getKeys(id)
        };

        try {
          const result = await dynamoDb.get(params).promise();
          if (result.Item) {
            return result.Item;
          } else {
            throw new Error(`No se encontró ningún registro con el ID ${id}`);
          }
        } catch (error) {
          console.error(error);
          throw error;
        }
    }

    async update(id, model) {
        let updateExpression = 'SET';
        let expressionAttributeNames = {};
        let expressionAttributeValues = {};

        for ( const property in model ) {
            updateExpression += ` #${property} = :${property},`;
            expressionAttributeNames[`#${property}`] = property;
            expressionAttributeValues[`:${property}`] = model[property];
        }

        // Remove the last comma
        updateExpression = updateExpression.slice(0, -1);

        const params = {
            TableName: this.tableName,
            Key: Model.getKeys(id),
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            UpdateExpression: updateExpression,
            ReturnValues: 'ALL_NEW',
        };
        try {
          const result = await dynamoDb.update(params).promise();
          return result.Attributes;
        } catch (error) {
          console.error(error);
          throw error;
        }
    }

    async delete(id) {
        try {
            // First we check if the model exists
            await this.read(id);
        } catch (error) {
            // If the model does not exist, we throw an error
            console.error(`No se encontró ningún registro con el ID ${id}`);
            throw error;
        }
    
        // If the model exists, we proceed to delete it
        const params = {
            TableName: this.tableName,
            Key: Model.getKeys(id),
        };
        
        try {
            await dynamoDb.delete(params).promise();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = DynamoDbAdapter;
