## Database Limits Policy

### Row Limit

For our development and staging databases sometimes we use Heroku's hobby-tier
database plan. Heroku applies row limits depending on the tier used.

When a database exceeds the hobby-tier row limit and we try to insert, we
receive the Postgres error:

`permission denied for relation <table name>`

The row limits of hobby-tier database plans are enforced with the following
mechanism:

1) When a hobby-dev database reaches 7,000 rows, or a hobby-basic database hits
7 million rows, the owner receives a warning email stating they are nearing
their row limits.

2) When the database exceeds its row capacity, the owner receives an additional
notification. At this point, the database receives a 7-day grace period to
either reduce the number of records, or migrate to another plan.

3) If the number of rows still exceeds the plan capacity after 7 days, `INSERT`
privileges are revoked on the database. Data can still be read, updated, or
deleted from the database. This ensures that users can bring their database into
compliance and retain access to their data.

4) When the number of rows is again in compliance with the plan limit, INSERT
privileges are automatically restored to the database. Note that database sizes
are checked asynchronously, so it may take a few minutes for privileges to be
restored.

### Storage Limit

Storage capacity is a soft limit. Heroku-postgres recommend customers to stay
under because this can make that database difficult to support. Storage usage
can be monitored on heroku-postgres database page for exact application.

At the same time heroku-postgres provides more then enough storage even on
standard-tier plan. So we often use only 2-3% of even the cheapest plan.

### RAM Limit

The RAM limit is a hard limit. If we max out our memory, we will receive out of
memory errors on our database and be unable to connect or perform queries. On
such issues the alert will be sent to us from Sentry and Heroku.

### Actions

The alerts of any connected issues from Sentry or Heroku will be sent to system
admins (Exact persons can be seen
[here](/handbook/information-security/access-control.md)). The relevant system admin is
then responsible for taking the appropriate action to remedy the situation and
avoid (continued) disruption to our service.

On production environments this is will often require upgrading to a higher
tier, while on development and staging environments a clean-up of the database
to reduce its content is likely to be the appropriate course of action.

### Ownership

Ilya Lozer is the owner of this document. You can contact him on
<ilya@dvelp.co.uk>.
