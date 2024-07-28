const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;

module.exports.handler = async () => {
  const params = {
    TableName: PRODUCTS_TABLE,
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    console.log(result)
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve products' },error),
    };
  }
};
