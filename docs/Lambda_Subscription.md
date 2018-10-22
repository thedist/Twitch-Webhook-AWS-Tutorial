# Webhook Subscription
For this Lambda function, we will be going through the process to create the function in Lambda, and then use Node.js to first request our current webhook subscriptions from Twitch and then if a subscription is not present or close to lease expiration we will request a new subscription.

It is worth noting that in this tutorial I am generating an app access token as part of the function as the check webhook subscription endpoints requires an app access token. In a production environment I have separate services that manage creating and renewing my various OAuth tokens and I just have my production functions get a token from that rather than having to make a request to Twitch. If you this is the only place you're using an app access token then you can use something like what the tutorial function does, otherwise consider a solution that meets your own use case and needs.


## Step 1: Creating a Lambda Function
Navigate to the [Lambda](https://console.aws.amazon.com/lambda/home) dashboard and from here just click the **Create Function** button. We will be authoring an app from scratch so leave that selected, for the name we'll call this one 'twitch-webhook-create', change the runtime to Node.js 8.10 and as we've already created an IAM role for this we can choose the existing role 'twitch-webhooks'.


## Step 2: Setting environment variables
For this tutorial we'll be using 'client_id', 'client_secret', and 'webhook_secret' env variable in our requests, so before we start coding scroll down to the environment variables section and enter your client id and secret that can be found on your Twitch Developer dashboard, and the webhook secret is whatever you want to use and will be used for notification verification later.

![ENV Var](/docs/images/Lambda-Create-1.png)


## Step 3: Code
For functions that don't require modules, or for when you're making changes to a Lambda function that already contains required modules, the Lambda code editor is sufficient, but the easiest way to develop Lambda functions is to develop them locally and using NPM to download any modules you may need and then simply zip the files and use Lambda's ability to upload a zip file.

There's a large number of modules to perform HTTP requests, each with their own pros and cons, for this tutorial I'll be using 'request-promise' as a large portion of Node.js developers are familiar with request, and this just bundles it with Bluebird promises.

The code for the tutorial can be found in the '/src/twitch-webhook-create/' directory of this project, along with the zip you can upload to Lambda that contains all of the code and required modules for you.

You can see from the code, there are 4 basic steps in this Lambda function.
1. Get app access token.
1. Get list of current subscriptions.
1. Create new subscription if needed.
1. return a '200' status code on success, or '500' on failure

The callback we use for the webhook can be done in multiple ways, you can either use a simple URL but then you have to look through the headers on notifications to figure out what topic a notification is for.

Another way is to use use the channel and type of a webhook topic in the URL path, which works very well for Express apps, and can be done through API Gateway easily.

For simplicity though I've used querystring parameters so that when a notification comes in Lambda will take care of parsing the parameters and we can easily access them through the event object.


## Step 4: Next
The function is almost complete, but not quite ready for testing. The reason for this is that we can't set the callback URL in the env variables until we've configured API Gateway, and even then we have yet to set up the other functions required for this all to work so next is to create the [GET Handler](/docs/Lambda_GET.md).