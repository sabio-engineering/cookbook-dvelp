# Dialogflow Agents Management

DVELP uses Google [Dialogflow](https://dialogflow.com) technology to build natural language user interfaces.

## Create a New Agent

Dialogflow is a part of [Google Cloud Platform](https://console.cloud.google.com), so to create a new agent you need to create a new project first. To do that follow the instructions below:

1. Go to [Google Cloud Platform](https://console.cloud.google.com)
2. In the top-left corner click on dropdown box
3. Select DVELP organization.
4. Click on "NEW PROJECT"
5. Set project name. N.B. Project name should be equivalent to Dialogflow agent name
6. Make sure Location is "dvelp.co.uk"
7. Click "Create"
8. Go to [Dialoflow console](https://console.dialogflow.com)
9. Click on Agents select box and choose "Create new agent" option
10. Set agent name
11. Choose Google project which we created before
12. Optionally choose time zone
13. Click "Create"

That's it. Sometimes bot creation takes few minutes.

## Get Dialogflow API Credentials

To connect Dialogflow agent to your API you have to get credentials as follows:

1. Go to Dialogflow agent configuration
2. Click on Project ID link
3. Click on navigation menu
4. Go to IAM & Admin -> Service Accounts
5. Find "Dialogflow Integrations" in "Name" column
6. Click on 3 dots in "Actions" column -> Create Key
7. Choose JSON
8. Click Create

After this your browser will download service account key.

![Dialogflow API Credentials](../../assets/GCP_keyfile.gif)
