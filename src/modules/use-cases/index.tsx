import React from "react"
import styles from "./styles.module.css"

const useCases = [
  {
    title: "Save Dev Time",
    uses: [
      "Write and test code against actual cloud resources at almost no cost and no headache from provisioning."
    ],
    cta: {
      label: "See Benchmarks",
      url: "/blog/tags/benchmark/",
    },
  },
  {
    title: "Scale Fast",
    uses: [
      "Don't get stuck on your PoC. Scale your infrastructure to test or production environments in a couple clicks."
    ],
    cta: {
      label: "See live demo",
      url: "https://demo.questdb.io",
    },
  },
  {
    title: "Secure & Reliable",
    uses: [
      "Cost optimized infrastructure to deliver enterprise grade security and reliability for your environment."
    ],

    cta: {
      label: "See Cloud",
      url: "/cloud/",
    },
  },
]

export const UseCases = () => (
  <div className={styles.root}>
    {useCases.map(({ title, uses }, index) => (
      <div className={styles.card} key={index}>
        <h2>{title}</h2>

        <ul className={styles.list}>
          {uses.map((use, index) => (
            <p key={index} className={styles.listItem}>
              {use}
            </p>
          ))}
        </ul>

      </div>
    ))}
  </div>
)
