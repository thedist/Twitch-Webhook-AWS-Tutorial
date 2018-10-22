# Lambda functions
Lambda is an amazon service that allows serverless running of code and supports a variety of languages (of which we'll be using Node.js 8.10 in this tutorial). The service is designed so that you're only charge while your function is actually running, so Lambda is ideal for small functions requiring minimal resources that will start, do a thing, then stop in a short space of time.

Lambda functions are charged in 100ms increments, and are priced per the amount of memory you assign the function (and while not clearly mentioned, increasing memory allowance of a function also increases compute power, so a high CPU low memory function can still benefit from a higher memory setting to reduce its runtime). The smallest is 128MB memory, which charges (at the time of writing this) $0.000000208 per 100ms runtime. However, there is also an indefinite free tier for Lambda, allowing for 400,000 GB-seconds, and 1M free requests each month, which is equivalent of 3.2 million seconds of runtime for a 128MB Lambda function, which far exceeds our needs for this tutorial and not something we will reach.


## [Webhook Subscription](/docs/Lambda_Subscription.md)
The first function we'll be creating is one that will be making a request to Twitch to subscription to a webhook topic. The function will also be what we use to renew subscriptions that are coming close to the end of their lease, so what we'll do is also include a request to check the status of our webhooks, and if they're either missing (which would be the case of the first launch, or if there is some issue that has caused the subscription to be dropped), or close to expiration the subscription request will take place.


## [GET Handler](/docs/Lambda_GET.md)
As part of the subscription process Twitch sends a GET request to our callback URL along with a challenge string, which we will need to reply back to Twitch with along with a 200 status code to complete the webhook subscription process.


## [POST Handler](/docs/Lambda_POST.md)
When a webhook subscription is live, Twitch will send us notifications for that topic as a POST to our callback URL. This Lambda function will handle receiving those notifications, verify their authenticity by using the secret we used when subscribing, and then storing them in the DynamoDB table we previously created.
