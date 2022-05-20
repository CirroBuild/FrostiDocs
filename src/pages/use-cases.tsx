import React from "react"
import Layout from "../theme/Layout"

import seCss from "../css/section.module.css"
import clsx from "clsx"

import UseCaseCustomers, { Customer } from "../components/UseCaseQuotes"

import ilCss from "../css/use-cases/illustration.module.css"
import flCss from "../css/use-cases/flashy.module.css"
import hlCss from "../css/use-cases/highlights.module.css"
import liCss from "../css/use-cases/list.module.css"
import ucCss from "../css/use-cases/use-case.module.css"
import prCss from "../css/property.module.css"

type UseCaseHighlightItem = {
  key: string
  title: string
  description: string
  image: string
}

const UseCaseHighlights = () => {
  const items: UseCaseHighlightItem[] = [
    {
      key: "monitoring-and-real-time-analytics",
      title: "Monitoring and Real-time analytics",
      description:
        "Observability, monitoring and analytics for time series data generated from infrastructure and software applications",
      image: "/img/pages/use-cases/real-time-analytics.svg",
    },
    {
      key: "financial-market-data",
      title: "Financial market data",
      description:
        "Processing billions of rows of high-frequency tick data in milliseconds and exploring vasts datasets of market data on the fly",
      image: "/img/pages/use-cases/financial-market-data.svg",
    },
    {
      key: "industrial-analytics",
      title: "Industrial analytics",
      description:
        "Collecting high-frequency metrics at scale from rockets, plants, machinery, fleets or any type of IIoT sensor \n",
      image: "/img/pages/use-cases/industrial-telemetry.svg",
    },
  ]

  return (
    <section
      className={clsx(seCss["section--inner"], seCss["section--center"])}
    >
      <div className={hlCss.highlights}>
        {items.map((item) => (
          <div className={flCss.flashy} key={`${item.title}-${item.key}`}>
            <img
              src={item.image}
              alt={item.title}
              className={flCss.flashy__image}
            />
            <h3 className={flCss.flashy__title}>{item.title}</h3>
            <p className={flCss.flashy__content}>{item.description}</p>
            <a href={`#${item.key}`} className={flCss.flashy__link}>
              Learn more
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

const Monitoring = () => {
  const monitoringCustomers: Customer[] = [
    {
      key: "yahoo",
      quote:
        "See how Yahoo uses QuestDB to monitor and autoscale cloud clusters that serve a billion users",
      caseStudyLink: "/case-study/yahoo",
      logoWidth: 100,
    },
    {
      key: "liveaction",
    },
    {
      key: "central-group",
    },
    {
      key: "syntropy",
    },
    {
      key: "syndica",
    },
    {
      key: "prediko",
      logoWidth: 100,
    },
    {
      key: "synology",
      logoWidth: 100,
    },
    {
      key: "magicpixel",
    },
  ]

  return (
    <section className={seCss.section} id="monitoring-and-real-time-analytics">
      <div className={clsx(seCss["section--inner"])}>
        <div className={ucCss["use-case__half"]}>
          <h2 className={clsx(seCss.section__title, ucCss["use-case__title"])}>
            Monitoring and Real-time analytics
          </h2>
          <ul className={liCss.list}>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              On the fly aggregations and downsampling for real-time dashboards
            </li>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              DevOps monitoring and alerting
            </li>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              Network traffic flow analysis and machine learning based threat
              detection
            </li>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              In-product application analytics
            </li>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              Real-time SQL queries computed on data streams
            </li>
          </ul>
        </div>
        <img
          src="/img/pages/use-cases/real-time-analytics-jumbo.svg"
          alt="An illustration of real-time analytics and monitoring"
          width="630"
          height="532"
          className={ucCss["use-case__image"]}
        />
      </div>
      <div className={clsx(seCss["section--inner"])}>
        <div className={ucCss["use-case__industries"]}>
          <h4>Applicable industries</h4>
          <p className={clsx(prCss.property, ucCss["use-case__property"])}>
            DevOps/Networks
          </p>
          <p className={clsx(prCss.property, ucCss["use-case__property"])}>
            Blockchain / Web 3
          </p>
          <p className={clsx(prCss.property, ucCss["use-case__property"])}>
            SaaS applications
          </p>
          <p className={clsx(prCss.property, ucCss["use-case__property"])}>
            E-commerce
          </p>
          <p className={clsx(prCss.property, ucCss["use-case__property"])}>
            Cyber security
          </p>
        </div>

        <UseCaseCustomers customers={monitoringCustomers} />
      </div>
    </section>
  )
}

const MarketData = () => {
  const marketDataCustomers: Customer[] = [
    {
      key: "toggle",
      quote:
        "See how Toggle migrated from InfluxDB to QuestDB with queries that are 300x faster, utilizing 1/4 of the hardware\n",
      caseStudyLink: "/case-study/toggle",
      logoWidth: 100,
    },
    {
      key: "kepler",
      logoWidth: 120,
    },
    {
      key: "coinhall",
    },
    {
      key: "aquis-exchange",
      logoOffset: 3,
    },
  ]

  return (
    <section className={seCss.section} id="financial-market-data">
      <div className={clsx(seCss["section--inner"])}>
        <img
          src="/img/pages/use-cases/financial-market-data-jumbo.svg"
          alt="An illustration of financial market data charts"
          width="565"
          height="480"
          className={ucCss["use-case__image"]}
        />
        <div className={ucCss["use-case__half"]}>
          <h2 className={clsx(seCss.section__title, ucCss["use-case__title"])}>
            Financial market data
          </h2>
          <ul className={liCss.list}>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              Real-time market data with dashboard integrations
            </li>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              Fast aggregations for OHLC and candlestick charts
            </li>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              Drill down large historical datasets to analyze the market
            </li>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              Financial modelling with python and machine learning libraries
            </li>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              Match and correlate multiple feeds with fuzzy timestamp JOINs
            </li>
          </ul>
        </div>
      </div>

      <div className={clsx(seCss["section--inner"])}>
        <div className={ucCss["use-case__industries"]}>
          <h4>Applicable industries</h4>
          <p className={clsx(prCss.property, ucCss["use-case__property"])}>
            Crypto (Exchanges, Intelligence, Funds)
          </p>
          <p className={clsx(prCss.property, ucCss["use-case__property"])}>
            FinTech (Asset/Wealth Management, AI predictions)
          </p>
          <p className={clsx(prCss.property, ucCss["use-case__property"])}>
            Trading (FX, Equity, Commodity)
          </p>
        </div>

        <UseCaseCustomers customers={marketDataCustomers} />
      </div>
    </section>
  )
}

const IndustrialTelemetry = () => {
  const industrialTelemetryCustomers: Customer[] = [
    {
      key: "tqs-integration",
      quote:
        "See how TQS, a Cognizant company, uses QuestDB to store manufacturing plants metrics for real-time data visualization and anomaly detection",
      caseStudyLink: "/case-study/tqs-integration",
      logoWidth: 120,
    },
    {
      key: "airbus",
      logoWidth: 120,
    },
    {
      key: "samtec",
      logoWidth: 120,
    },
    {
      key: "copenhagen-atomics",
      logoWidth: 120,
    },
    {
      key: "electric-era",
      logoWidth: 120,
    },
    {
      key: "turk-telekom",
      logoWidth: 120,
    },
    {
      key: "sapient-industries",
      logoWidth: 120,
    },
    {
      key: "razor-secure",
    },
  ]

  return (
    <section className={seCss.section} id="industrial-analytics">
      <div className={clsx(seCss["section--inner"])}>
        <div className={ucCss["use-case__half"]}>
          <h2 className={clsx(seCss.section__title, ucCss["use-case__title"])}>
            Industrial analytics
          </h2>
          <ul className={liCss.list}>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              Store high frequency sensor data with continuous data ingestion
            </li>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              Process metrics in the manufacturing process: vibrations,
              pressure, temperatures, pH levels
            </li>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              Monitor electricity readings for usage insights
            </li>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              Track fleets of autonomous cars, aircrafts or cargo ships with
              native geospatial features
            </li>
            <li
              className={clsx(liCss.list__item, ucCss["use-case__list__item"])}
            >
              React to industrial anomalies in real-time
            </li>
          </ul>
        </div>
        <img
          src="/img/pages/use-cases/industrial-telemetry-jumbo.svg"
          alt="An illustration of industrial analytics charts"
          width="585"
          height="498"
          className={ucCss["use-case__image"]}
        />
      </div>

      <div className={clsx(seCss["section--inner"])}>
        <UseCaseCustomers
          customers={industrialTelemetryCustomers}
          columnLayout
        />

        <div
          className={clsx(
            ucCss["use-case__industries"],
            ucCss["use-case__industries--wide"],
          )}
        >
          <h4>Applicable industries</h4>
          <p className={clsx(prCss.property, ucCss["use-case__property"])}>
            Energy (Power plants, Renewables, Oil & Gas, Utilities)
          </p>
          <p className={clsx(prCss.property, ucCss["use-case__property"])}>
            Space & Defence (Rockets, Satellites, Maritime, Aerospace)
          </p>
          <p className={clsx(prCss.property, ucCss["use-case__property"])}>
            Transportation and Mobility (Autonomous cars, Freight transport,
            Drones, Logistics)
          </p>
          <p className={clsx(prCss.property, ucCss["use-case__property"])}>
            Manufacturing & Automation (Digital factories, pre-processing
            plants, Robotics)
          </p>
          <p className={clsx(prCss.property, ucCss["use-case__property"])}>
            Telco (Network base stations)
          </p>
        </div>
      </div>
    </section>
  )
}

const UseCasesPage = () => {
  const title = "Use Cases"
  const description = "Use Cases"

  return (
    <Layout canonical="/careers" description={description} title={title}>
      <section
        className={clsx(seCss["section--inner"], seCss["section--center"])}
      >
        <div className={seCss.section__header}>
          <h1
            className={clsx(
              seCss.section__title,
              seCss["section__title--accent"],
            )}
          >
            Use cases and industries
          </h1>

          <p
            className={clsx(
              seCss.section__subtitle,
              seCss["section__subtitle--accent"],
              "text--center",
            )}
          >
            QuestDB offers high throughput ingestion and real-time SQL queries
            for applications in a wide range of use cases and industries
          </p>
        </div>
        <img
          alt="An illustration of QuestDB use cases"
          className={ilCss.illustration}
          height={584}
          src="/img/pages/use-cases/banner.svg"
          width={1091}
        />
      </section>

      <UseCaseHighlights />

      <Monitoring />

      <MarketData />

      <IndustrialTelemetry />
    </Layout>
  )
}

export default UseCasesPage
