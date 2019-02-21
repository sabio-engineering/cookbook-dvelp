# Go Live Checklist

A Go Live Checklist should be added to every project trello board to ensure we all understand what has to be done before a project can go live.

The card should be added at project kick off and be personalised for the project.
It should be reviewed at least once a sprint.


## Checklist

- [ ] Hosting, maintenance and support [plans](maintenance-support-and-hosting.md) agreed
- [ ] Rollout Plan agreed with stakeholders
- [ ] Scoped requirements have been fully tested in staging (happy and unhappy paths)
- [ ] Error tracking setup [Sentry](/guides/environments/diagnostics.md#error-handling) and being sent to the right places
- [ ] Required reporting setup and being monitored appropriately
- [ ] Handover documentation (technical and instructions for end users)
- [ ] Required training for users has been completed
- [ ] Rollback plans defined
- [ ] Security requirements are met (you should decide what these are the beginning of the project)
- [ ] Escalation process defined and shared with the client
- [ ] Plan for how future production releases are handled

## Go Live Plan

For each major feature release to a production environment, we recommend you
summarise the roll out plan in a document like
[this](https://docs.google.com/document/d/1K7tO3CFhQkJ7L-HIKlmieUh6fo6Wh-R64vk-9Ri_bcU/edit?usp=sharing).
