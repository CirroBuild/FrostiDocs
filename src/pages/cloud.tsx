import React, { ReactElement } from "react"
import clsx from "clsx"

import Layout from "../theme/Layout"
import Button from "@theme/Button"
import SvgImage from "../components/SvgImage"
import Subscribe from "../components/Subscribe"

import ElasticSolutionIcon from "../assets/img/pages/cloud/elastic-solution.svg"
import HighAvailabilityIcon from "../assets/img/pages/cloud/high-availability.svg"
import HighPerformanceIcon from "../assets/img/pages/cloud/high-performance.svg"
import SecurityIcon from "../assets/img/pages/cloud/security.svg"
import ManagedQuestdbIcon from "../assets/img/pages/cloud/managed-questdb.svg"
import AwsLogo from "../assets/img/aws.svg"

import seCss from "../css/section.module.css"
import ilCss from "../css/cloud/illustration.module.css"
import hlCss from "../css/cloud/highlights.module.css"
import flCss from "../css/cloud/flashy.module.css"
import slCss from "../css/cloud/slack.module.css"
import style from "../css/cloud/style.module.css"

import SlackLogo from "../assets/img/slack.svg"
import customFields from "../config/customFields"

type HighlightItem = {
  title: string
  description: string
  image: ReactElement
  imageTitle: string
}

const Top = () => {
  return (
    <section className={seCss["section--inner"]}>
      <div className={seCss.section__header}>
        <h1
          className={clsx(
            seCss.section__title,
            seCss["section__title--accent"],
          )}
        >
          QuestDB Cloud
        </h1>

        <Subscribe
          className={style.subscribe}
          submitButtonText="Early Access"
          provider="cloud"
        />

        <img
          alt="Artistic view of the console with sub-queries"
          className={ilCss.illustration}
          height={394}
          src="/img/pages/enterprise/banner.svg"
          width={900}
        />
      </div>
    </section>
  )
}

const Highlights = () => {
  const items: HighlightItem[] = [
    {
      title: "Managed QuestDB",
      description: "Hosted, managed and monitored by us",
      image: <ManagedQuestdbIcon width="90" height="90" />,
      imageTitle: "Postgres logo",
    },
    {
      title: "Elastic solution",
      description: "Scalable QuestDB instances in a few steps",
      image: <ElasticSolutionIcon width="90" height="90" />,
      imageTitle: "Postgres logo",
    },
    {
      title: "High availability",
      description: "Multi-node replicas with automated deployments",
      image: <HighAvailabilityIcon width="90" height="90" />,
      imageTitle: "Postgres logo",
    },
    {
      title: "High performance",
      description: "Real-time SQL analytics optimized for time series",
      image: <HighPerformanceIcon width="90" height="90" />,
      imageTitle: "Postgres logo",
    },
    {
      title: "Security",
      description: "Built with industry-standard security in mind",
      image: <SecurityIcon width="90" height="90" />,
      imageTitle: "Postgres logo",
    },
  ]

  return (
    <section
      className={clsx(seCss["section--inner"], seCss["section--column"])}
    >
      <p
        className={clsx(
          seCss.section__subtitle,
          hlCss.highlights__subtitle,
          "text--center",
        )}
      >
        Enjoy all of QuestDB&apos;s core and enterprise features, first
        available on{" "}
        <SvgImage image={<AwsLogo width="50" height="30" />} title="AWS logo" />
      </p>
      <div className={hlCss.highlights}>
        {items.map((item, key) => (
          <div className={flCss.flashy} key={`${item.title}-${key}`}>
            <SvgImage image={item.image} title={item.imageTitle} />
            <h3 className={flCss.flashy__title}>{item.title}</h3>
            <p className={flCss.flashy__content}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const Slack = () => {
  return (
    <section className={seCss["section--inner"]}>
      <div className={slCss.slack}>
        <div className={slCss.slack__text}>
          <div className={slCss.slack__logo}>
            <SvgImage image={<SlackLogo />} title="Slack logo" />
          </div>
          Like to get support and ask questions about QuestDB? Join our
          community with 1000+ developers on Slack!
        </div>
        <div className={slCss.slack__cta}>
          <Button variant="primary" href={customFields.slackUrl}>
            Go to Slack
          </Button>
        </div>
      </div>
    </section>
  )
}

const CloudPage = () => {
  const title = "Cloud"
  const description = ""

  return (
    <Layout canonical="/cloud" description={description} title={title}>
      <Top />
      <Highlights />
      <Slack />
    </Layout>
  )
}

export default CloudPage
