# Soft-phone

Soft-phones allow you you to make phonecalls over the Internet using your computer rather than dedicated hardware. Soft-phones are great for manual testing of Twilio apps. There are lot clients to choose from, but this doc will explain how to configure Zoiper.

## Download

To download Zoiper visit https://www.zoiper.com.

## Sip Domain

Before you configure the Zoiper client you have to create SIP domain on [Twilio ](https://www.twilio.com/console/voice/sip/endpoints/add). Fill in following fields:
- FRIENDLY NAME - preferably your name
- SIP URI - URI which you will need to use for Zoiper configuration later
- REQUEST URL - URL to your application which will handle API requests (see [how to configure ngrok](https://github.com/DVELP/cookbook/blob/master/guides/tools/ngrok.md) to get public url from your localhost)

### Authentication

Soft-phones require basic authentication, so we have to create a user and password. On Twilio:
- Click on `+` near with CREDENTIAL LISTS field
- Fill in the form:
  - FRIENDLY NAME - preferably your name
  - USERNAME - enter your phone number in E164 format e.g. +441231231231
  - PASSWORD - your password (don't forget to use 1Password)
- Once it's done click create. You should see a new record in CREDENTIAL LISTS field
- Save your SIP domain

## Zoiper Configuration

After installing Zoiper you will be requested to enter the following credentials:
1. Fill user name (phone number) and password which we created before.
2. Fill in your hostname, you can find it on [Voice SIP Domains](https://www.twilio.com/console/voice/sip/endpoints) page, e.g. `dvelp-test.sip.us1.twilio.com`[SIP Registration](https://www.twilio.com/docs/voice/api/sip-registration)
3. Skip Authentication and outbound proxy
4. Skip testing step
5. Click Create Account

That's it. Now you are ready to make calls!
