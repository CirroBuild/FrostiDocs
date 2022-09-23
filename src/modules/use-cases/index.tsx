import Button from "@theme/Button"
import React from "react"
import styles from "./styles.module.css"

const useCases = [
  {
    logo: {
      alt:
        "Speedometer illustration with an indicator pointing to high level speed",
      src: "/img/pages/index/rawPower.svg",
      width: 176,
      height: 113,
    },
    title: "Built for performance",
    uses: [
      "SIMD-optimized analytics",
      "Row and column based access",
      "Vectorized query execution",
      "Tiny memory footprint",
      "C++ and zero-GC Java",
    ],
    cta: {
      label: "See Benchmarks",
      url: "/blog/tags/benchmark",
    },
  },
  {
    logo: {
      alt:
        "Illustration of a stylized code editor with a chart that shows the result of the query",
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
    cta: {
      label: "View Tutorials",
      url: "/blog/tags/tutorial",
    },
  },
  {
    logo: {
      alt: "Illustration of a code editor containing a SQL statement",
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

    cta: {
      label: "Browse Docs",
      url: "/docs",
    },
  },
]

export const UseCases = () => (
  <div className={styles.root}>
    {useCases.map(({ logo, title, uses, cta }, index) => (
      <div className={styles.card} key={index}>
        <img
          alt={logo.alt}
          className={styles.illustration}
          src={logo.src}
          width={logo.width}
          height={logo.height}
        />

        <h3>{title}</h3>

        <ul className={styles.list}>
          {uses.map((use, index) => (
            <li key={index} className={styles.listItem}>
              {use}
            </li>
          ))}
        </ul>

        <Button
          className={styles.button}
          uppercase={false}
          newTab={false}
          size="small"
          href={cta.url}
        >
          {cta.label}
        </Button>
      </div>
    ))}
  </div>
)
