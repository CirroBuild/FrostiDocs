const consts = require("./consts")

const googleCalBaseUrl = "https://www.google.com/calendar/render"
const calendarUrlParams = [
  "action=TEMPLATE",
  "text=QuestDB+Community+Meetup",
  "location=https%3A%2F%2Fzoom.us%2Fw%2F98577806387%3Ftk%3DisEZOLMNFucTcMqjPCrIZAgbyYURJyS7roTh9aebq18.DQMAAAAW87H0MxZJeC1ackRuWFN3bWc3NDg4TjhXWlB3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%26pwd%3DL0sybFJUWks4M0RSdmVQdklDeWRzQT09",
  "details=The+QuestDB+event+for+Q1+2022+is+coming+soon%21%0AOur+community+meetup+is+a+great+opportunity+for+QuestDB+users%2C+contributors%2C+and+maintainers+to+meet+each+other+and+exchange+thoughts+and+ideas.%0A%0AAgenda%0A-+Community+Show%26Tell+by+Holger+Amort%2C+Senior+Data+Scientist+at+TQS+Integration%0A-+QuestDB+Best+Practices%3A+Performance+tuning+and+resource+optimization%0A-+QuestDB+2022+Product+Roadmap",
  "dates=20220317T160000Z%2F20220317T170000Z",
].join("&")
const meetupCalendarUrl = [googleCalBaseUrl, calendarUrlParams].join("?")

module.exports = {
  artifactHubUrl: "https://artifacthub.io/packages/helm/questdb/questdb",
  copyright: `Copyright © ${new Date().getFullYear()} QuestDB`,
  crunchbaseUrl: "https://www.crunchbase.com/organization/quest-db",
  demoUrl: `https://demo.${consts.domain}`,
  description:
    "QuestDB is an open source database designed to make time-series lightning fast and easy. It exposes a high performance REST API and is Postgres compatible.",
  dockerUrl: "https://hub.docker.com/r/questdb/questdb",
  domain: consts.domain,
  githubOrgUrl: consts.githubOrgUrl,
  githubUrl: `${consts.githubOrgUrl}/questdb`,
  helmVersion: "0.11.0",
  linkedInUrl: "https://www.linkedin.com/company/questdb/",
  oneLiner: "QuestDB: the database for time series",
  slackUrl: `https://slack.${consts.domain}`,
  stackoverflowUrl: "https://stackoverflow.com/questions/tagged/questdb",
  twitterUrl: "https://twitter.com/questdb",
  videosUrl: "https://www.youtube.com/channel/UChqKEmOyiD9c6QFx2mjKwiA",
  meetupCalendarUrl,
}
