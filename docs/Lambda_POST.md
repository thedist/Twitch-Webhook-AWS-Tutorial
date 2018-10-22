# POST Handler
The function to handle POST requests has 2 main parts to it, first it has to verify the authenticity of the notification by the use of the 'crypto' module the secret that was provided during webhook subscription, this allows you to be sure both the integrity of the notification as well as that it was sent by Twitch. Secondly, assuming verification check passed this function then has to put the item into our DynamoDB table.

## Step 1: Create a Lambda function
Same process as before, except this time we'll just call it 'twitch-webhook-post', and we will need to set the 'webhook_secret' variable to the same that was set in the 'twitch-webhook-create' function.

## Step 2: Code
The code for this function can be found in the '/src/twitch-webhook-post', and much like the first function we created this one needs an additional module, 'crypto' in this case. So the easiest way to create this function in Lambda is to upload the zip. The function also makes use of the AWS SDK module, but this doesn't need to be included as all Node.js Lambda functions can require that module natively.

The first step of the code is a simple verification step where we take the body of the request sent by Twitch, create a hash of it using our 'webhook_secret', and then compare that to the hash that is included in the request as the 'x-hub-signature' header.

Next we create the parameters for our DynamoDB 'put' operation. This structure for the item is very basic and uses the channel ID and topic type from the querystring of the request, the notification ID and timestamp values created by Twitch that are in the header of the request, and finally a data field that will contain the notification object. This Item structure should work well for all webhooks topics, but in production it would be beneficial to create separate items for different topics so that redundant data (such as the 'to_id' field in follows, as you already know who the follow is to).

## Step 4: Next
We've created all of our Lambda functions, next we need to set up our [API Gateway](/docs/API_Gateway.md) which will proxy requests to these Lambda functions.

