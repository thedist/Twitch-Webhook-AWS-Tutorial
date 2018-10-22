# Creating a DynamodDB table
DynamoDB is a NoSQL database that you pay for only what you use, and the free tier provided by Amazon (that does not expire) allows you enough for 25GB/month storage, and 25 read and 25 write capacity units, which will be more than enough to get started.


## Step 1: DynamoDB Dashboard
Once you're logged in to your AWS dashboard, navigate through the services page to [DynamoDB](https://console.aws.amazon.com/dynamodb/home) which should take you to the DynamoDB dashboard and set to your region, which for me is eu-west-1. From here, just click **Create Table**.


## Step 2: Create a Table
For this example, we'll just call the table *Twitch-Webhooks*, and for the primary key we'll be using *channel* as a partition key and *timestamp* as a sort key. Channel will be the channel ID of that a webhook notification is for, and the timestamp will be the Twitch provided notification timestamp.

![Create Table](/docs/images/DynamoDB-1.png)

## Step 3: Table Settings
For learning and testing purposes, we don't want this table to scale, especially beyond the free tier limit, and because even the lowest level of 1 read capacity unit and 1 write capacity unit provides 1 read and 1 write of 1KB each per second, that will be sufficient for testing. Once that is set, you can proceed and create the table!

![Table Settings](/docs/images/DynamoDB-2.png)


## Step 4: Amazon Resource Name (ARN)
The last thing we need to do here is to make a note of the Amazon Resource Name (ARN) of the table, this is located at the bottom of the overview tab for the table. This ARN will be used in the next step to create a role and give it the rights that will be required to read and write to the table.

![ARN](/docs/images/DynamoDB-3.png)


## Next: Creating an IAM role
Now that we have a table ready to store the notifications, and the ARN for it copied, we can now set up a role that will be used by the Lambda functions we will be creating and give it access to this table. [Creating an IAM Role](/docs/IAM.md)