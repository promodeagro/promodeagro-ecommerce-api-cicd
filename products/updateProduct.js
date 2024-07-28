const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;

module.exports.handler = async (event) => {
  const { id, name, price, category, description } = JSON.parse(event.body);

  const params = {
    TableName: PRODUCTS_TABLE,
    Key: { id },
    UpdateExpression: 'set #name = :name, price = :price, category = :category, description = :description',
    ExpressionAttributeNames: { '#name': 'name' },
    ExpressionAttributeValues: {
      ':name': name,
      ':price': price,
      ':category': category,
      ':description': description,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not update product' }),
    };
  }
};
