# CloudWatch Events
CloudWatch has many great uses, including Lambda function logs, graphs and stats on various AWS services we are running as well as the ability to set up alerts if they go outside of a specified range, and also scheduled tasks. It is the scheduled tasks that we will use to trigger our 'twitch-webhook-create' Lambda function at regular intervals to keep our webhook subscriptions running continuously.


## Step 1: Creating a Rule
From the CloudWatch page, click 'Events' and then 'Create Rule'. From here we have a vast range of event sources that we can use, but for our needs we can just set a schedule as it will always be at a set interval that it will run our Lambda function. The tutorial sample code has a 10 hour lease, and is set to renew if the function is run with less than 2 hours remaining so we can simply set the schedule for every 1 hour and that will work, although in production if using a max lease duration of 10 days then a 1 day interval would work (with a large number of webhook subscriptions it can be advantageous to use these intervals to spread out resubscriptions, rather than let them all be done at once and potentially hit rate-limit bottlenecks).

For the target we will set 'twitch-webhook-create', and leave the rest of the settings as their defaults. In production we would likely set the alias and use a production version of the Lambda function, but just like stages in the API Gateway, aliases are not essential for this tutorial.


## Step 2: Configure Rule Details
All that remains is to give the rule a name, description, and to leave the state set to enabled. Once we click create rule it will now at the set interval call our Lambda function, which will in turn check our subscription and renew if the lease duration is low.


## Next: End of the Tutorial!
And with this automatic renewal all set up, we now have a serverless webhook system that automatically renews! There were some topics that I touched on briefly during this tutorial that I'll talk a little about, as well as some potential ideas of where to go forward from here now that you have a webhook, in the [What's Next?](/docs/Whats_Next.md) section.
