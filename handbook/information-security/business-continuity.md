# Business Continuity Plan

DVELP with its remote first nature and cloud infrastructure, is not easily
affected by typical causes of business disruption, such as local failures of
equipment, power supplies, telecommunications, social unrest, terrorist attacks,
fire, or natural disasters. Even so, threats considered in the context of
business continuity are categorised by impact of the disruption.

## P1: Outage would have immediate impact on DVELP customer / user operations

1. Disruption of service of Herokuapp, specifically the AWS regions in which
DVELP’s and DVELP’s clients are hosted.
    * Effect: a loss of the Herokuapp service means that anyone who uses DVELP to
    host their applications would lose service.
    * Solution(s): There are multiple AWS data centres globally to provide
    redundancy in the event of an outage

2. Unavailability of support staff in case of customer emergency.
    * Effect: emergency response times are greater than intended.
    * Solution(s): The team is distributed geographically (except during team
    get-togethers). The availability of developers will be determined by the SLA
    in place with the particular client. There is also an ongoing effort to
    document our overall on-call procedure, including escalation steps.

## P2: Outage would have immediate impact on DVELP ability to continue business

1. Malicious Software (Viruses, Worms, Trojan horses) attack.
    * Effect: depends on attack.
    * Solution(s): We outsource this protection to Heroku who have a range of
    measures in place to prevent this: https://www.heroku.com/policy/security

2.
    Hacking or other Internet attacks.
    * Effect: depends on attack.
    * Solution(s): We outsource this protection to Heroku who have a range of
    measures in place to prevent this: https://www.heroku.com/policy/security

## P3: Outage greater than 72 hours would have impact on DVELP ability to continue to do business

Disruption of service from Github, Harvest, Forecast, Slack, Trello
* Github
  * Restore master branch of codebase from local copies
  * Upload copies of codebase to relevant servers via SSH
* Communication platforms
  * Failover to email for the majority of communications

## P4: Outage greater than 10 business days would have impact on DVELP ability to continue business

Disruption of service from Google (gmail)
* No failover plan currently.

### Ownership

James King is the owner of this document. You can contact him on
<james@dvelp.co.uk>.
