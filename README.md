# Serverless Development from zero

This tutorial can help you navigating through the deployment of our Product rater app.
We intentionally kept the instructions on a high level.
If you need more detailed instructions you can take a look at the [Cheatsheet](CHEATSHEET.md) where we have listed all the gcloud commands.
The numbers in square brackets behind the steps always show the reference in the Cheatsheet

## Preparation

Before we can do the actual Cloud Run deployment we need to ensure that our Persistence Layer (Redis) is ready.

For this:
1. You have to create a VPC [1]
1. Deploy a redis instance inside the VPC you created. [2]

## Deploy the Cloud Run Service

1. When you deploy the Cloud Run service you need to hand over the IP address of the Redis Instance to the Cloud Run as the
   environment variable `REDISHOST`. If you are struggling you can also take a look on the hint below before going into the Cheatsheet [3]

   Hint 1: The source code for the app is in the `demo_app` folder. You can directly deploy from this directory

   Hint 2: For being able to conenct to the redis instance it does not only need the IP address
   of the Redis instance but also a private connection to the instance


## Get a pretty URL for your service

1. Add Fireabase hosting integration and select your URL. [4]
