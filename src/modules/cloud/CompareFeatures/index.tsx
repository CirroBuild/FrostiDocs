import clsx from "clsx"
import seCss from "../../../css/section.module.css"
import style from "../../../css/cloud/style.module.css"
import { FeatureItem, FeatureTable } from "../FeatureTable"
import React from "react"

const CoreFeaturesItems: FeatureItem[] = [
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

const SecurityFeaturesItems: FeatureItem[] = [
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

const HighAvailabilityFeaturesItems: FeatureItem[] = [
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

const ManagedInfractionFeaturesItems: FeatureItem[] = [
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

const SupportFeaturesItems: FeatureItem[] = [
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

export const CompareFeatures = () => {
  return (
    <section className={clsx(seCss.section, seCss["section--odd"])}>
      <section
        className={clsx(seCss["section--inner"], style["compare-features"])}
      >
        <p className={clsx(style["compare-title"], "text--center")}>
          Compare features
        </p>

        <div className={style["feature-tables"]}>
          <FeatureTable title="Core features" items={CoreFeaturesItems} />

          <FeatureTable title="Security" items={SecurityFeaturesItems} />

          <FeatureTable
            title="High availability"
            items={HighAvailabilityFeaturesItems}
          />

          <FeatureTable
            title="Managed infrastructure"
            items={ManagedInfractionFeaturesItems}
          />

          <FeatureTable title="Support" items={SupportFeaturesItems} />
        </div>
      </section>
    </section>
  )
}
