# What's Next
There were some points I made during this tutorial about things that could be done in a production environment that I think are worth mentioning here, as well as an example showing how this webhook system we just made can be put to a practical use, and a few helpful ideas of things worth looking to and learning about.


## Lambda Aliases and API Stages
When you're in an environment where you need to make updates and changes to one of your services, but can't afford to have the system go offline or break while you're making this changes, then a great way to go about doing this is to use Lambda Aliases and API Stages.

By default, a Lambda function that is run by the API Gateway will be whatever is the latest version, which has some risks to it if you're testing out some new things that might break functionality. To deal with this we can create 2 (or more) Aliases, 'DEV', and 'PROD', for development and production versions. This way you can set the DEV alias to always point to whatever is the latest version that you're currently working on, while the PROD alias will be set to a specific version of the function that you know is good.

In the API Gateway, when we choose what Lambda function a particular method calls, we can add a version to the end of the function name, but rather than setting DEV or PROD, we can just specify `:${stageVariables.lambdaAlias}`, and then whatever we set as the 'lambdaAlias' value in the stage variables setting is what will be called. So when the DEV stage URL is used it can call the DEV lambda function, and whenever the PROD API URL is called it'll start the PROD Lambda function.

Using this setup means that we can run multiple versions side by side without needing to duplicate API Gateway or Lambda functions, the different Stage URLS just access different functions!


## API Gateway Custom Domain
It's possible to use your own domain name with API Gateway, it's as simple as going through a little config and adding a CNAME DNS record on your domain that points to your API. Then rather than a long amazon URL you can point a 'webhooks' subdomain to the API and use `webhooks.yourdomain.com`, and through path mapping you can point different API's to different paths, such as `webhooks.yourdomain.com/dev` and `webhooks.yourdomain.com/prod` or point to an entirely separate API that you've set up.


## API Gateway Tweaks
There are far too many config options and ways to go about utilising API Gateway to go into detail here, but one nice feature is validating request querystring/headers/body. One example of how this might be used would be on the GET method we set up in this tutorial, where the only use it has is for handling the 'hub.challenge', so if an incoming request lacks that header it would be beneficial to just have API Gateway immediately respond that a header is missing and skip ever having to run the Lambda function. By validating expected requests we can ensure that Lambda time isn't needlessly wasted which will help save costs and reduce needless load on any services that your function might make use of.


## Stream Going Live Example
One use case for a webhook setup like that in this tutorial would be to send a Tweet, or Discord message, when a stream goes live. An easy way to accomplish this is with Lambda and DynamoDB Streams. What DynamoDB Streams can do is act as trigger to start a Lambda function, and pass it some data. So you could create a Lambda function that utilises the Twitter or Discord API to send messages, and any time a webhook notification comes in it will be added to the table, which will then pass that update on through the stream to the Lambda function.

Because the Stream webhook has recently changed to include notifications of title, game, and other parameter changes rather than just stream up/down, one use case might be to use a single entry in the table per channel and update that entry with new notifications. This has the advantage of the DynamoDB stream can send both the previous state, and the updated state to the function, from there you can determine if the stream went live/offline, or maybe changed game or title and from that determine if the Lambda function should create, delete, or edit the announcement based on that change.


## Downsides
As with all solutions, there are both pros and cons. I'm still exploring various AWS services and trying new things myself so I'm not able to give in depth advice on everything, but one issue I've encountered is the way in which DynamoDB works. It's great as a simple store of a few fields, and supports a variety of field types, but coming from a MongoDB background I feel that the limitations on indexes/primary keys, as well as depth of queries and aggregation just isn't there for DynamoDB. Maybe there are ways to get more out of it that I haven't explored yet, or maybe DynamoDB simply has it's own use cases and outside of that you're expected to use Amazons more expensive database services.
