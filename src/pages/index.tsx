import clsx from "clsx"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React, { useState } from "react"
import Customers from "../components/Customers"
import customFields from "../config/customFields"
import { QueryScroller } from "../components/QueryScroller"

import Button from "@theme/Button"
import Layout from "../theme/Layout"
import SvgImage from "../components/SvgImage"
import { ActionFooter } from "../components/ActionFooter"
import { Section } from "../components/Section"

import doCss from "../css/index/docker.module.css"
import feCss from "../css/index/feature.module.css"
import inCss from "../css/index/integration.module.css"
import juCss from "../css/index/jumbotron.module.css"
import meCss from "../css/index/menu.module.css"
import usCss from "../css/index/usp.module.css"
import prCss from "../css/property.module.css"
import seCss from "../css/section.module.css"

import QuestDBLogo from "../assets/img/questdb.svg"
import PgLogo from "../assets/img/pages/index/integrations/pg.svg"
import GrafanaLogo from "../assets/img/pages/index/integrations/grafana.svg"
import KafkaLogo from "../assets/img/pages/index/integrations/kafka.svg"
import PythonLogo from "../assets/img/pages/index/integrations/python.svg"
import PandasLogo from "../assets/img/pages/index/integrations/pandas.svg"
import InfluxdataLogo from "../assets/img/pages/index/integrations/influxdata.svg"
import TableauLogo from "../assets/img/pages/index/integrations/tableau.svg"
import PlotlyLogo from "../assets/img/pages/index/integrations/plotly.svg"
import MindsdbLogo from "../assets/img/pages/index/integrations/mindsdb.svg"
import CubeLogo from "../assets/img/pages/index/integrations/cube.svg"
import DockerLogo from "../assets/img/pages/index/docker.svg"

type FeatureTab = "digital" | "realtime" | "integration"
const FeatureTabs = () => {
  const [opened, setOpened] = useState<FeatureTab>("digital")

  return (
    <Section fullWidth odd>
      <Section noGap>
        <Section.Title size="small" center>
          Why QuestDB?
        </Section.Title>

        <div
          className={clsx(
            seCss.section__footer,
            seCss["section__footer--feature-tabs"],
          )}
        >
          <div className={meCss.menu__list}>
            {[
              { label: "Simplicity", id: "digital" },
              { label: "Performance", id: "realtime" },
              { label: "Open Source", id: "integration" },
            ].map((tab) => (
              <Button
                key={tab.id}
                className={meCss.menu__button}
                onClick={() => setOpened(tab.id as FeatureTab)}
                size="small"
                variant={opened === tab.id ? "primary" : "tertiary"}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <div className={meCss.menu__content}>
            <div
              className={clsx(meCss.menu__panel, {
                [meCss["menu__panel--active"]]: opened === "digital",
              })}
            >
              <p className={prCss.property}>Query with SQL</p>
              <p className={prCss.property}>Deploy via Docker or binaries</p>
              <p className={prCss.property}>Interactive web console</p>
              <p className={prCss.property}>
                Postgres and InfluxDB line protocols
              </p>
              <p className={prCss.property}>Cloud-native or on-premises</p>
            </div>

            <div
              className={clsx(meCss.menu__panel, {
                [meCss["menu__panel--active"]]: opened === "realtime",
              })}
            >
              <p className={prCss.property}>High-throughput ingestion</p>
              <p className={prCss.property}>Optimized SQL queries</p>
              <p className={prCss.property}>Real-time streaming</p>
              <p className={prCss.property}>Lower infrastructure costs</p>
              <p className={prCss.property}>Less operational complexity</p>
            </div>

            <div
              className={clsx(meCss.menu__panel, {
                [meCss["menu__panel--active"]]: opened === "integration",
              })}
            >
              <p className={prCss.property}>Apache License 2.0</p>
              <p className={prCss.property}>Thriving developer community</p>
              <p className={prCss.property}>Transparent development</p>
              <p className={prCss.property}>Popular open source integrations</p>
              <p className={prCss.property}>Embedded in Java applications</p>
            </div>

            <Button
              className={meCss.menu__cta}
              to="https://github.com/questdb/questdb#try-questdb"
            >
              Get Started &gt;
            </Button>
          </div>
        </div>
      </Section>
    </Section>
  )
}

const integrations: Array<{
  label: string
  image: React.ElementType
  title: string
}> = [
  { image: PgLogo, title: "Postgres logo", label: "Postgres" },
  { image: GrafanaLogo, title: "Grafana logo", label: "Grafana" },
  { image: KafkaLogo, title: "Kafka logo", label: "Kafka" },
  { image: PythonLogo, title: "Python logo", label: "Python" },
  { image: PandasLogo, title: "Pandas logo", label: "Pandas" },
  { image: InfluxdataLogo, title: "Telegraf logo", label: "Telegraf" },
  { image: TableauLogo, title: "Tableau logo", label: "Tableau" },
  { image: MindsdbLogo, title: "MindsDB logo", label: "MindsDB" },
  { image: CubeLogo, title: "Cube logo", label: "Cube" },
  { image: PlotlyLogo, title: "PlotlyLogo logo", label: "Plotly" },
]

const Integration = () => (
  <Section>
    <Section.Title size="small" center>
      Integration with the tools you love
    </Section.Title>

    <div className={inCss.integration}>
      {integrations.map(({ label, image, title }, index: number) => {
        const Image = image
        return (
          <div key={index} className={inCss.integration__item}>
            <SvgImage image={<Image />} title={title} />
            {label}
          </div>
        )
      })}
    </div>
  </Section>
)

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

const useCases = [
  {
    logo: {
      alt: "Speedometer",
      src: "/img/pages/index/rawPower.svg",
      width: 176,
      height: 113,
    },
    title: "Built for performance",
    uses: [
      "SIMD-optimized analytics",
      "Row- and column-based access",
      "Vectorized query execution",
      "Tiny memory footprint",
      "C++ and zero-GC Java",
    ],
  },
  {
    logo: {
      alt: "A code editor with a chart that shows the result of the query",
      src: "/img/pages/index/easyToUse.svg",
      width: 205,
      height: 113,
    },
    title: "Optimized for time series",
    uses: [
      "Relational model for time series",
      "Data stored in chronological order",
      "Time partitioned",
      "Immediate consistency",
      "Fast InfluxDB line protocol",
    ],
  },
  {
    logo: {
      alt: "A code editor containing a SQL statement",
      height: 113,
      src: "/img/pages/index/featureRich.svg",
      width: 176,
    },
    title: "Implemented with SQL",
    uses: [
      "Time series and relational joins",
      "Postgres compatibility",
      "Aggregations and downsampling",
      "Geospatial-native queries",
      "Built-in SQL optimizer",
    ],
  },
]
const UseCases = () => (
  <Section odd fullWidth noGap>
    <Section row>
      {useCases.map(({ logo, title, uses }, index) => (
        <div className={usCss.usp} key={index}>
          <div className={usCss.usp__inner}>
            <img
              alt={logo.alt}
              className={usCss.usp__illustration}
              src={logo.src}
              width={logo.width}
              height={logo.height}
            />

            <h2 className={usCss.usp__title}>{title}</h2>

            {uses.map((use, index) => (
              <p key={index} className={usCss.usp__description}>
                {use}
              </p>
            ))}
          </div>
        </div>
      ))}
    </Section>
  </Section>
)

const Cards = () => (
  <Section fullWidth odd>
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
    <Customers nbElements={6} />
    <UseCases />
    <Integration />
    <FeatureTabs />
    <QueryScroller />
    <Cards />
    <Console />

    <Section>
      <ActionFooter />
    </Section>
  </Layout>
)

export default Home
