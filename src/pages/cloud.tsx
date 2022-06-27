import React from "react"
import clsx from "clsx"

import Layout from "../theme/Layout"
import Subscribe from "../components/Subscribe"

import seCss from "../css/section.module.css"
import style from "../css/cloud/style.module.css"
import flCss from "../css/cloud/flashy.module.css"
import { ActionFooter } from "../components/ActionFooter"
import {
  CloudFeatureItem,
  CloudFeatureTable,
} from "../components/CloudFeatureTable"
import hlCss from "../css/cloud/highlights.module.css"
import prCss from "../css/property.module.css"
import Button from "@theme/Button"
import { ContactFormDialog } from "../components/ContactFormDialog"

const CoreFeaturesItems: CloudFeatureItem[] = [
  {
    title: "High-throughput ingestion",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "Out-of-order ingestion",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "High-performance SQL",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "Time series-native SQL extensions",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "High-performance data migration",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "Geospatial data type",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "Cloud-native backups",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "Built-in web console",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "Data compression",
    inOpenSource: "unavailable",
    inCloud: "coming-soon",
  },
  {
    title: "Cold storage support",
    inOpenSource: "unavailable",
    inCloud: "coming-soon",
  },
]

const SecurityFeaturesItems: CloudFeatureItem[] = [
  {
    title: "Authentication",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "SSO Authentication",
    inOpenSource: "not-applicable",
    inCloud: "coming-soon",
  },
  {
    title: "TLS encryption",
    inOpenSource: "not-applicable",
    inCloud: "available",
  },
  {
    title: "EBS volume encryption",
    inOpenSource: "not-applicable",
    inCloud: "available",
  },
  {
    title: "VPC peering",
    inOpenSource: "not-applicable",
    inCloud: "coming-soon",
  },
  {
    title: "Role-based authorization",
    inOpenSource: "unavailable",
    inCloud: "coming-soon",
  },
  {
    title: "Bring your own key encryption",
    inOpenSource: "not-applicable",
    inCloud: "coming-soon",
  },
]

const HighAvailabilityFeaturesItems: CloudFeatureItem[] = [
  {
    title: "Cloud-native replication",
    inOpenSource: "coming-soon",
    inCloud: "coming-soon",
  },
  {
    title: "High-availability reads",
    inOpenSource: "coming-soon",
    inCloud: "coming-soon",
  },
  {
    title: "High-availability writes",
    inOpenSource: "unavailable",
    inCloud: "coming-soon",
  },
]

const ManagedInfractionFeaturesItems: CloudFeatureItem[] = [
  {
    title: "Scheduled backups",
    inOpenSource: "not-applicable",
    inCloud: "available",
  },
  {
    title: "Monitoring and alerting",
    inOpenSource: "not-applicable",
    inCloud: "available",
  },
  {
    title: "Auto scaling",
    inOpenSource: "not-applicable",
    inCloud: "coming-soon",
  },
  {
    title: "Zero-downtime upgrades",
    inOpenSource: "unavailable",
    inCloud: "coming-soon",
  },
]

const SupportFeaturesItems: CloudFeatureItem[] = [
  {
    title: "Community support",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "Standard customer support",
    inOpenSource: "unavailable",
    inCloud: "available",
  },
  {
    title: "Customized SLA",
    inOpenSource: "unavailable",
    inCloud: "contact-us",
  },
]

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

        <p
          className={clsx(
            seCss.section__subtitle,
            seCss["section__subtitle--jumbotron"],
            seCss["section__subtitle--accent"],
            "text--center",
          )}
        >
          The fastest open source time series database fully managed on the
          cloud, now available on AWS
        </p>

        <Subscribe
          placeholder="E-mail"
          className={style.subscribe}
          submitButtonText="Get access"
          provider="cloud"
        />

        <img
          alt="Screenshot of instance creation form and instance details pages in QuestDB Cloud"
          height={626}
          src="/img/pages/cloud/screens.png"
          width={1026}
        />

        <div className={hlCss.highlights}>
          <div className={flCss.flashy}>
            <h3 className={flCss.flashy__title}>Open source</h3>
            <ul className={style.card__list}>
              <li className={clsx(prCss.property, style.card__item)}>
                Apache 2.0
              </li>
              <li className={clsx(prCss.property, style.card__item)}>
                Self-hosting
              </li>
              <li className={clsx(prCss.property, style.card__item)}>Free</li>
            </ul>
            <Button
              variant="primary"
              href="/get-questdb"
              className={style.card__button}
            >
              Install
            </Button>
          </div>
          <div className={flCss.flashy}>
            <h3 className={flCss.flashy__title}>Cloud</h3>
            <ul className={style.card__list}>
              <li className={clsx(prCss.property, style.card__item)}>
                Database-as-a-service
              </li>
              <li className={clsx(prCss.property, style.card__item)}>
                Database monitoring
              </li>
              <li className={clsx(prCss.property, style.card__item)}>
                Built-in authentication
              </li>
              <li className={clsx(prCss.property, style.card__item)}>
                Additional database features
              </li>
              <li className={clsx(prCss.property, style.card__item)}>
                Multiple regions
              </li>
            </ul>
            <ContactFormDialog
              defaultInterest="cloud"
              trigger={
                <Button variant="primary" className={style.card__button}>
                  Book a demo
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const CompareFeatures = () => {
  return (
    <section className={clsx(seCss.section, seCss["section--odd"])}>
      <section
        className={clsx(seCss["section--inner"], style["compare-features"])}
      >
        <p className={clsx(style["compare-title"], "text--center")}>
          Compare features
        </p>

        <div className={style["feature-tables"]}>
          <CloudFeatureTable title="Core features" items={CoreFeaturesItems} />

          <CloudFeatureTable title="Security" items={SecurityFeaturesItems} />

          <CloudFeatureTable
            title="High availability"
            items={HighAvailabilityFeaturesItems}
          />

          <CloudFeatureTable
            title="Managed infrastructure"
            items={ManagedInfractionFeaturesItems}
          />

          <CloudFeatureTable title="Support" items={SupportFeaturesItems} />
        </div>
      </section>
    </section>
  )
}

const Footer = () => {
  return (
    <section className={seCss["section--inner"]}>
      <ActionFooter />
    </section>
  )
}

const CloudPage = () => {
  const title = "Cloud"
  const description = ""

  return (
    <Layout
      canonical="/cloud"
      description={description}
      title={title}
      image="/img/pages/cloud/screens-thumb.png"
    >
      <Top />
      <CompareFeatures />
      <Footer />
    </Layout>
  )
}

export default CloudPage
