# GET Handler
This Lambda function is by far the simplest. When we start the subscription process, Twitch sends a GET request to our callback URL to ensure that it is accessible and to confirm this the incoming request contains a 'hub.challenge' header which we simply have to reply to the request with, along with a '200' statusCode.

## Step 1: Create a Lambda function
Same process as before, except this time we'll just call it 'twitch-webhook-get', and we'll not need to set any env variables.

## Step 2: Code
The code is so simple I'll just paste it here, but it's also available in the '/src/twitch-webhook-get' directory, and as a zip to upload, but copy/paste should suffice.

```javascript
exports.handler = event => {
  return { statusCode: 200, body: event.queryStringParameters['hub.challenge'] };
};
```

## Step 4: Next
We now have completed the functions needed to create a webhook subscription. The last function we will need to create is the [POST Handler](/docs/Lambda_POST.md) which will handle the incoming notifications.