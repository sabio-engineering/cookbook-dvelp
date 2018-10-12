# Environments

Consistency in approach is key to building and maintaining 100s of applications
efficiently. It dramatically reduces the cost of switching and prevents silos of
knowledge in projects or teams.

## Resources

* [Circle CI 2 Configuration]('circle-ci-2.md')
* [Deploying to Shopify]('deploying-shopify.md')
* [Diagnostics]('diagnostics.md')
* [Heroku Pipeline]('heroku-pipeline.md')

## Setup

The following is a typical environment setup that we use to build, deploy and
maintain our applications:

###  Local/Dev

This  will be your local environment. Typically on a local machine, but could be on a local network.

Anything goes in `dev`, it's yours to do what you want.

We recommend [ngrok]('https://ngrok.com/') to expose public tunnels
to localhost for speedy development work of APIs or with distributed teams.


### Staging

Staging is a publicly accessible environment and is designed to mirror
production as closely as possible.

We recommend all resources associated with staging are appended with `-staging`
e.g. `dvelp-staging`, where `dvelp` is the name of the git repo.

External resources, for example Sentry, should also mirror this naming
convention.

###  Production

The real deal. This is the holy grail and should be treated with ulitimate
respect.

Live data, live traffic.

In alignment with `staging`, all resources should be appended with
`-production` e.g. `dvelp-production`.


