const crypto = require('crypto');
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

exports.handler = async event => {
  const verify = () => {
    const expected = event.headers['x-hub-signature'];
    const calculated = 'sha256=' + crypto.createHmac('sha256', process.env.webhook_secret).update(Buffer(event.body)).digest('hex');
    return expected === calculated;
  };

  // If verification fails we log the failure and return a response to the request
  if (!verify()) {
    console.warn('Verification failed', event);
    return { statusCode: 200 };
  }
  
  let notification = {};
  try {
    notification = JSON.parse(event.body);
  }
  catch(err) {
    console.warn(err);
    return { statusCode: 200 };
  }
  
  // This is data we will be adding to your DynamoDB table
  const params = {
    TableName: 'Twitch-Webhooks',
    Item: {
      channel: event.queryStringParameters.channel,
      timestamp: event.headers['twitch-notification-timestamp'],
      type: event.queryStringParameters.type,
      id: event.headers['twitch-notification-id'],
      data: notification.data[0] || false
    },
  };

  return documentClient.put(params).promise()
    .then(() => ({ statusCode: 200 }))
    .catch(err => {
      console.warn(err);
      return { statusCode: 200 };
    });
};