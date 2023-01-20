import React from "react"
import Link from "@docusaurus/Link"
import styles from "./styles.module.css"

const useCases = [
  {
    title: "Time to Market",
    uses: [
      "Save months of dev time",
      "Deploy app to cloud in minutes",
      "Scale horizontally and vertically instantly",
    ],
    cta: {
      label: "See Benchmarks",
      url: "/blog/tags/benchmark/",
    },
  },
  {
    title: "Developer experience",
    uses: [
      "Automatic discovery of required cloud resources",
      "Simple, human readable sku choices",
      "Avoid vendor lock in, simply use cloud primitive sdks",
    ],
    cta: {
      label: "See live demo",
      url: "https://demo.questdb.io",
    },
  },
  {
    title: "Operational Excellence",
    uses: [
      "Enterprise grade security",
      "Highly available production deployments",
      "Cost optimized skus to your requirements",
    ],

    cta: {
      label: "See Cloud",
      url: "/cloud/",
    },
  },
]

export const UseCases = () => (
  <div className={styles.root}>
    {useCases.map(({ title, uses, cta }, index) => (
      <div className={styles.card} key={index}>
        <h2>{title}</h2>

        <ul className={styles.list}>
          {uses.map((use, index) => (
            <li key={index} className={styles.listItem}>
              {use}
            </li>
          ))}
        </ul>

        <Link className={styles.link} href={cta.url}>
          {cta.label}
        </Link>
      </div>
    ))}
  </div>
)
