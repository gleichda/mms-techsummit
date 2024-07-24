# Cheatsheet

## Prepare your environment

In order to fully run all of the commands some prerequesites should be set:

```bash
gcloud config set project <PROJECT ID>
gcloud config set run/region europe-west4
gcloud config set compute/region europe-west4
gcloud config set redis/region europe-west4
```

## Preparation
[1] `gcloud compute networks create default --subnet-mode=auto` \
[2] `gcloud redis instances create rater --size=2 --redis-version=redis_7_0` \

## Cloud Run deployment



[3]
1. ensure you are in the `demo_app` directory
1. Get the IP address of the Redis instance: `export REDISIP=$(gcloud redis instances describe rater --format='value(host)')`
1. Now deploy the Cloud Run Service `gcloud run deploy mms-rater --source . --allow-unauthenticated --vpc-egress=private-ranges-only --set-env-vars=REDISHOST=${REDISIP} --network=default --subnet=default`

## Get a pretty URL for your service

[4]
1. Assing the compute service account the Firebase Admin role: `gcloud projects add-iam-policy-binding $(gcloud config get project) --role=roles/firebase.admin --member=serviceAccount:<PROJECT NUMBER>-compute@developer.gserviceaccount.com`
1. `gcloud beta run integrations create --type=firebase-hosting --service=mms-rater --parameters='site-id=<Your SITE ID>'`
