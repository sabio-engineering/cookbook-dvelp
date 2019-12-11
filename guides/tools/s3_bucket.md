# Create a new S3 bucket

If you need to create a S3 bucket, you should use our template bucket as the image, to ensure our default properties are applied to it.

## DVELP image bucket

We have created a bucket that we will use as the image to create any new bucket.
This bucket name is `dvelp-bucket-template` and has these properties:
- Restricted Public access
- Enabled Logs and storaged in our bucket for logs (`dvelp-logs`)
- It’s encrypted using Amazon AES-256 encryption.

## How to create a new bucket using the bucket image

[Go to S3 buckets](https://s3.console.aws.amazon.com) and choose Create a new bucket.
- Select `Copy settings from an existing bucket`
- Search the template bucket `dvelp-bucket-template`
- Click Create. No need to go through the next steps, all the properties inherits from the bucket template.

That’s it!. Your new bucket inherits the properties of dvelp-bucket-template.

If you need to configure any other properties, check the AmazonS3 documentation: [create new bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html)

## Ownership

Víctor Alejo is the owner of this document. You can contact him on
<victor@dvelp.co.uk>.
