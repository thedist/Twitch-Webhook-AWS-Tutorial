# Creating an IAM role
Identity and Access Management (IAM) is where we'll create a role that gives permission for our Lambda functions to access our previously created DynamoDB table. Going into best practises for managing security is beyond the scope of this tutorial, but I highly encourage reading Amazons own own guides and documentation on the IAM page, especially if you intend to expand any service into a production environment.


## Step 1: IAM Dashboard
Navigate through the services page to [IAM](https://console.aws.amazon.com/iam/home) and from here just click **Roles** from the menu on the left.


## Step 2: Create a Role
From the roles page, click **Create Role** and select Lambda from the list of services that will use this role, then proceed to the Permissions page.


## Step 3: Permissions
In the search box type *lambda* and select **AWSLambdaBasicExecutionRole**.

![Permissions](/docs/images/IAM-1.png)

This role will let Lambda functions log to CloudWatch, which can be immensely useful in monitoring the performance of the functions, as well as providing a way to track potential issues and console output. Next proceed to Review, and we'll name this role 'twitch-webhooks' and finish creating the role.


## Step 4: DynamoDB Policy
Now that a role has been created we can now add a policy to it allowing it to access our DynamoDB table. In the list of roles, click our newly created 'twitch-webhooks' role, and then click *Add inline policy* on the right.

Select DynamoDB as the service, and from the actions section we want to select the following access levels:
* Read: BatchGetItem, GetItem, Query, Scan.
* Write: BatchWriteItem, DeleteItem, PutItem, UpdateItem.

Next click in the *resources* section so we can add our tables ARN. Simply click *Add ARN* in the **Table** section, and paste the ARN we got from the DynamoDB page earlier into this and it will auto-fill the boxes. We can leave the Index ARN empty as we wont be querying by index.

![ARN](/docs/images/IAM-2.png)


## Step 5: Review
Proceed to reviewing the policy we're adding to this role and give it a name. For a name in this tutorial I choose 'DynamoDB-Twitch-Webhooks-read-write', as at a glance I can see what service this policy is for, the scope (in this case, our Twitch-Webhooks table), and the access it provides.


## Next: Creating Lambda functions
Now we have a DynamoDB table to store our notifications from Twitch, and a role allowing us to access it, next up is creating the Lambda functions that will do all the work of subscribing to and managing our webhooks! [**Creating Lambda functions**](/docs/Lambda.md)