import clsx from "clsx"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React from "react"
import Customers from "../components/Customers"
import customFields from "../config/customFields"
import { QueryScroller } from "../components/QueryScroller"

import Button from "@theme/Button"
import Layout from "../theme/Layout"
import SvgImage from "../components/SvgImage"
import { ActionFooter } from "../components/ActionFooter"
import { Section } from "../components/Section"
import { UseCases } from "../modules/use-cases"
import { Integration } from "../modules/integration"
import { FeatureTabs } from "../modules/feature-tabs"

import doCss from "../css/index/docker.module.css"
import feCss from "../css/index/feature.module.css"
import juCss from "../css/index/jumbotron.module.css"
import seCss from "../css/section.module.css"

import QuestDBLogo from "../assets/img/questdb.svg"
import DockerLogo from "../assets/img/pages/index/docker.svg"

const Top = () => {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Section center className={juCss.top}>
      <div className={juCss.jumbotron}>
        <Section.Title level={1}>Fast SQL for time series</Section.Title>

        <Section.Subtitle>{siteConfig.tagline}</Section.Subtitle>

        <div className={juCss.jumbotron__cta}>
          <Button className={juCss.jumbotron__link} href={customFields.demoUrl}>
            Live Demo
          </Button>
          <Button
            className={clsx(
              juCss.jumbotron__link,
              juCss["jumbotron__cta--github"],
            )}
            href="/cloud"
            icon={
              <SvgImage
                image={<QuestDBLogo width="32" height="32" />}
                title="QuestDB Cloud"
              />
            }
            newTab={false}
            variant="secondary"
          >
            CLOUD
          </Button>
        </div>
        <p className={juCss.jumbotron__description}>
          Query our demo dataset with 1.6 billion rows in milliseconds
        </p>
      </div>

      <div className={doCss.docker}>
        <pre className={doCss.docker__inner}>
          <code className={doCss.docker__code}>
            {`docker pull questdb/questdb
docker run -p 9000:9000 questdb/questdb`}
          </code>
          <a
            href={customFields.dockerUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <SvgImage
              image={<DockerLogo className={doCss.docker__icon} />}
              title="Docker"
            />
          </a>
        </pre>
      </div>
    </Section>
  )
}

const Cards = () => (
  <Section odd fullWidth>
    <Section noGap>
      <Section.Title level={3} size="small" center>
        Why time series?
      </Section.Title>

      <div
        className={clsx(
          seCss.section__footer,
          seCss["section__footer--feature-cards"],
        )}
      >
        {[
          {
            header: "DevOps, monitoring and observability",
            content:
              "Collect CPU, memory and storage metrics from your infrastructure and get real-time visibility into your entire stack.",
          },

          {
            header: "Financial market data",
            content:
              "Store market tick data to identify historical trends, find correlations and analyze trades in real-time. Build aggregated views across multiple venues and efficiently compute live order books.",
          },

          {
            header: "Network traffic analysis",
            content:
              "Collect sFlow or other network traffic metadata to run analytics and detect anomalies in real-time.",
          },

          {
            header: "Connected devices",
            content:
              "Capture, store and respond to sensor data and telemetry at any resolution in industrial or machine-to-machine applications.",
          },

          {
            header: "Application metrics",
            content:
              "Empower application developers and UX teams to track and visualize user behavior data, API calls, data latency, and other application events in real-time.",
          },

          {
            header: "Machine learning with time-series data",
            content:
              "Use QuestDB with popular Python frameworks and tools for leveraging anomaly detection algorithms, machine learning libraries, statistical analysis with Pandas, or Jupyter notebooks.",
          },
        ].map(({ header, content }, index) => (
          <div key={index} className={feCss.feature}>
            <h3 className={feCss.feature__header}>{header}</h3>
            <p className={feCss.feature__content}>{content}</p>
          </div>
        ))}
      </div>
    </Section>
  </Section>
)

const Console = () => (
  <Section fullWidth>
    <Section.Title size="small" center>
      Interactive Console
    </Section.Title>

    <Section.Subtitle center>
      Interactive console to import data (drag and drop) and start querying
      right away.
    </Section.Subtitle>

    <Section.Subtitle center>
      Check our{" "}
      <a href="/docs/develop/web-console">Web Console documentation</a> to get
      started.
    </Section.Subtitle>

    <Section center>
      <img
        alt="Artistic view of QuestDB's Web Console split in 3 components: the navigation tree, the SQL code editor and data displayed as a chart"
        width={600}
        height={467}
        src="/img/pages/index/console.svg"
      />
    </Section>
  </Section>
)

const Home = () => (
  <Layout
    canonical=""
    description={customFields.description}
    title="QuestDB | Time series data, faster"
    replaceTitle
  >
    <Top />
    <Customers />
    <Section fullWidth center>
      <UseCases />
    </Section>

    <Section fullWidth odd>
      <Integration />
    </Section>

    <Section>
      <Section.Title size="small" center>
        Why choose QuestDB?
      </Section.Title>
      <FeatureTabs />
    </Section>

    <QueryScroller />
    <Cards />
    <Console />

    <Section>
      <ActionFooter />
    </Section>
  </Layout>
)

export default Home
