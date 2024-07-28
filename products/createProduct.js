const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;

module.exports.handler = async (event) => {
  const { name, price, category, description } = JSON.parse(event.body);
  const id = uuidv4();

  const params = {
    TableName: PRODUCTS_TABLE,
    Item: {
      id,
      name,
      price,
      category,
      description,
    },
  };

  try {
    console.log(params)
    await dynamoDb.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ id, name, price, category, description }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create product' }),
    };
  }
};
