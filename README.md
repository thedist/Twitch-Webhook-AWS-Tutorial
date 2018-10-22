# Twitch-Webhook-AWS-Tutorial
Tutorial for using AWS to create a scalable, serverless, infrastructure to subscribe to, store, and maintain Twitch Webhooks


## About
Twitch Webhooks provide a great way for developers to receive updates on changes to specific API endpoints without needing to constantly poll the endpoint. This tutorial will hopefully explain how to take advantage of serverless technologies to make use of webhooks but without the need to maintain a constantly on webserver.

Please also keep in mind that this tutorial is for illustrative purposes only, and if you intend to take these services forward into a production environment then please ensure access rights, database design, any auto-scaling, and all relevant security precautions are configured correctly for your use case.

For this tutorial I'll be using Amazon Web Services (AWS) for the backend:
* DynamoDB - Database to store incoming notifications from Twitch.
* IAM - Access rights management between services.
* Lambda - Run Node.js apps to handle webhook subscription and incoming notifications.
* API Gateway - Web accessible endpoint for Twitch's GET/POST requests.
* CloudWatch - Monitoring of AWS services and logging of Lambda output.


## Getting Started
This guide assumes you already have an AWS account, if not please sign up at https://aws.amazon.com/ Because of the way different services rely on each other, I'll be starting the tutorial with creating a DynamoDB table so that we'll have the ARN resource id that will be needed to create an IAM role. This role will then be used for Lambda function execution, and then finally these functions will be called by the API gateway routes.


## Documentation
1. [**Creating a DynamodDB Table**](/docs/DynamoDB.md)
1. [**Creating an IAM role**](/docs/IAM.md)
1. [**Lambda functions**](/docs/Lambda.md)
   1. [Webhook Subscription](/docs/Lambda_Subscription.md)
   1. [GET Handler](/docs/Lambda_GET.md)
   1. [POST Handler](/docs/Lambda_POST.md)
1. [**API Gateway Routes**](/docs/API_Gateway.md)
1. [**What's Next?**](/docs/Whats_Next.md)


## Author
* **Jeff Martin** - [theDist](https://twitch.tv/thedist)

If you need to get in touch either message me here on GitHub, on Twtich's [Dev forums](https://discuss.dev.twitch.tv), or on the TwitchDev server in the Twitch app. If you liked this tutorial I'd appreciate anyone who wants to follow me on Twitch using my channel link above. I plan to write more tutorials on different subjects as I try new things, some of which I plan to stream in the future too!


## License

This project is licensed under the MIT License - see the LICENSE file for details