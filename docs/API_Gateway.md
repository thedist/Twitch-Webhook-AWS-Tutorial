# API Gateway
API Gateway is a service that will be our internet facing part of this tutorial, it provides the routes that Twitch will use to send GET and POST requests to which will then be passed on to our Lambda functions. This is one of the services that we'll be using that has only a limited 12 month trial of 1 million free request, after which it will cost $3.50 per million requests at the time of writing this, plus data transfer costs, but both of this will be almost negligible at the scale that this tutorial is for.


## Step 1: Create our API
From the API Gateway dashboard, click Create API. The creation settings should be self-explanatory, the only one worth mentioning is endpoint type, and this is set to edge optimised because our API will act as a gateway between internal services, such as Lambda, and the internet. If you was creating an API to use between services within the same AWS Region, then Regional API Endpoint would be used, and Private API Endpoint is for AWS VPC, neither of which we will deal with in this tutorial.

![Create API](/docs/images/API-Gateway-1.png)


## Step 2: Creating a GET Method
From our resources page of our API we now need to create the methods we will be using. From the actions dropdown, click 'Create Method', this will create a little dropdown box in root of of API which we will set to 'GET' and then click the tick to confirm.

This method is what controls what happens when a GET request is made to our API, for this tutorial we'll be using a Lambda Function as integration type, with Lambda Proxy Integration toggled which will cause the entire HTTP request to be passed on to the Lambda function. Select whichever Lambda Region you use, the default varies depending on your AWS account settings but for me this is 'eu-west-1'. Finally we set the Lambda function we'd like to call, in this case it is our 'twitch-webhooks-get' function.

![Method Settings](/docs/images/API-Gateway-2.png)


## Step 3: Creating a POST Method
To create the POST method for the incoming Twitch notifications we just follow the same process we used to create the GET Method, except we will select 'POST' from the method dropdown, and the function name is 'twitch-webhooks-post'.


## Step 4: Deploy
For the API to be reachable, we now have to deploy it by clicking 'Deploy API' in the actions dropdown menu. Since this is the first time time we're deploying our API we will need to create a stage to deploy to. For the tutorial it will be perfectly fine to use a single stage, but in a production environment you will likely want to use both a development stage and a production stage for reasons that will be mentioned in the closing sections of this tutorial.

![Deploy Stage](/docs/images/API-Gateway-3.png)


## Step 5: API URL
From the stages section of our API, you can now see an 'Invoke URL', which should look something like `https://someIdHere.execute-api.eu-west-1.amazonaws.com/DEV`. This is now an internet accessible address for our GET and POST lambda functions. As we now how this URL, go back to the configuration of of our 'twitch-webhooks-create' function in the Lambda dashboard, and add that URL as the 'domain' env variable, this will now let the function use that domain as the callback URL for our webhook subscriptions.


## Step 6: Checking it works
Now we can finally start our webhook subscription! To start it up we can simply click the test button in the top right, and as we're not passing any variables to the script you can just ignore needing to pass anything in our test function, and this test will run our function and cause the subscription process to take place. To test that it works, if you've been using the samples I've provided then the webhook will be one that sends notifications for new followers to the channel id 32168215, which happens to be my channel https://twitch.tv/theDist so to shamelessly plug my own channel go there and follow it.

If all goes according to plan then you can go to the Items tab of your DynamoDB table page and should see an entry for the follow! If there is an issue at some point though, every Lambda function has its own logs on CloudWatch so by going to the logs section of CloudWatch and selecting each function you can view the function calls and see if any of them are showing errors (and usefully for debugging, any console output you add to the function will be included in these logs so it becomes easy to add console.log() to functions while testing and watching the logs).


## Next: Automatic Renewal
We now have the means to subscribe to a webhook, and the API to handle incoming requests, but a subscription has a limited lease time so we need a way to automate resubscription, and that's where [CloudWatch Events](/docs/CloudWatch.md) comes in.