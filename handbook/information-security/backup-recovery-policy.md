# Backup and Recovery Policy

Technical and operational resiliency is a key objective of our Information
Security Charter.

This document provides guidelines to ensure the integrity and availability of
data, which is critical to the running of client applications or day-to-day
business at DVELP.


## Application Data

Application data covers any data that is stored by any software application on
DVELP servers, databases or document (blob) storage. It does not cover data
that is held transiently in memory or background processes.


### Databases

Any production environment managed by DVELP is to run on Heroku. Production
databases, at a minimum, should be using the `Standard - 0` tier Heroku
Postgresql database.

Standard tier databases offer [Continuous Protection](https://devcenter.heroku.com/articles/heroku-postgres-data-safety-and-continuous-protection) to replicate the data through write-ahead logs, shipped to a datacentre for high-durability storage. In the event of a hardware failure, the logs can be used to reinstate the database to within seconds of the fault.

Data can be rolled back up to 4 days.


### Document Storage

Document, blob or cloud storage is often used to persist data relating to the
application such as files or images.

For all applications managed by DVELP, documents should be stored on Amazon S3.
Each application should have its own bucket, following the naming conventions
set out in this [guide](/guides/environments).

For every new bucket created on S3, the following settings should be configured:

* [Versioning](https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html)
* [MFA Delete](https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html#MultiFactorAuthenticationDelete)


## Operational Data

Operational data refers to any data, or documents that are created,
processed or stored in the day-to-day running of DVELP.

* *Legal documents*, including employment contracts, Master Services Agreements
  and Non-disclosure Agreements are to be created and stored on DocuSign.

* *Standard documents*, including word processing documents, spreadsheets and
  other formats of document used to discuss, share and store information
  relevant to day-to-day operations of DVELP should be stored on Google Drive.

  It is recommended, but not essential that your Google Drive is synced with
  your local work station.

* *Timesheets*, generated and saved historically on Harvest are backed up at
  least daily to Amazon Redshift on the DVELP Amazon Webservices (AWS) account.

* *Sales opportunities*, generated and saved historically on Hubspot are backed
  up at least daily to Amazon Redshift on the DVELP Amazon Webservices (AWS)
  account.


## Project Data

Project data covers all data and information that is relevant to the running of
any given project. All projects run by DVELP are managed on Trello, each with a
separate Trello board.

Trello boards are not backed-up. Once Trello boards are 'closed' they can be
reinstated. If a Trello board is closed and then deleted, it cannot be
recovered.


## Communication Data

Communication data covers all data transferred electronically via Slack or
Gmail (for e-mail).

Neither Slack nor Gmail are backed up manually.


## Mobile & Local Data

Any business critical data that is stored locally on either a laptop or
mobile device should be backed up to Google Drive or a similar cloud backup
facility.

Backups should be performed at least once a day.

### Ownership

Tom Mullen is the owner of this document. You can contact him on
<tom@dvelp.co.uk>.
