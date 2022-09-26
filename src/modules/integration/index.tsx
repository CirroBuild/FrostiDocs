import React from "react"
import { Section } from "../../components/Section"
import type { CustomerLogo } from "../../assets/types"
import { logos } from "../../assets/logos"
import Link from "@docusaurus/Link"

import styles from "./styles.module.css"

const integrations: Array<{
  label: string
  logo: CustomerLogo
  src?: string
}> = [
  {
    logo: logos.postgres,
    label: "Postgres",
    src: "/docs/reference/api/postgres/",
  },
  {
    logo: logos.grafana,
    label: "Grafana",
    src: "/docs/third-party-tools/grafana/",
  },
  {
    logo: logos.kafka,
    label: "Kafka",
    src: "/docs/third-party-tools/kafka/",
  },
  {
    logo: logos.python,
    label: "Python",
    src: "https://github.com/questdb/py-questdb-client",
  },
  {
    logo: logos.pandas,
    label: "Pandas",
    src: "/blog/2022/03/08/questdb-crypto-pandas/",
  },
  {
    logo: logos.telegraf,
    label: "Telegraf",
    src: "/docs/third-party-tools/telegraf/",
  },
  {
    logo: logos.mindsDB,
    label: "MindsDB",
    src: "/blog/2022/04/18/enabling-machine-learning-in-questdb-with-mindsdb/",
  },
  {
    logo: logos.cube,
    label: "Cube",
    src: "/blog/2022/04/26/time-series-data-analytics-with-questdb-and-cube/",
  },
  {
    logo: logos.redpanda,
    label: "Redpanda",
    src:
      "/blog/2022/05/25/how-to-build-a-real-time-crypto-tracker-with-redpanda-and-questdb/",
  },
  {
    logo: logos.plotly,
    label: "Plotly",
    src: "/blog/2021/11/01/plotly-finnhub-realtime-dashboard/",
  },
]

export const Integration = () => (
  <Section noGap>
    <Section.Title size="small" center>
      Use with the tools you love
    </Section.Title>

    <div className={styles.integrations}>
      {integrations.map(({ label, logo, src }, index: number) => {
        const props = {
          key: index,
          className: styles.integration,
        }

        return React.createElement(
          typeof src === "string" ? Link : "div",
          {
            ...props,
            ...(typeof src === "string" ? { href: src } : {}),
          },

          <>
            <img
              className={styles.logo}
              src={logo.srcGrayscale ?? logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
            {label}
          </>,
        )
      })}
    </div>
  </Section>
)
