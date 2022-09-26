import React from "react"
import { Section } from "../Section"
import styles from "./styles.module.css"
import { logos } from "../../assets/logos"
import { CustomerLogo } from "../../assets/types"
import Marquee from "react-fast-marquee"
import useThemeContext from "@theme/hooks/useThemeContext"
import clsx from "clsx"

const logosOverrides: Record<keyof typeof logos, Partial<CustomerLogo>> = {
  yahoo: {
    width: 120,
  },
  toggle: {
    width: 120,
  },
  apacheNifi: {
    height: 45,
  },
  synology: {
    width: 120,
    height: 30,
  },
  prediko: {
    width: 120,
    height: 30,
  },
  "razor-secure": {
    width: 140,
    height: 40,
  },
  "electric-era": {
    width: 120,
  },
}

const customerLogos = [
  "yahoo",
  "kepler",
  "airbus",
  "yc",
  "aquis-exchange",
  "central-group",
  "tqs-integration",
  "syndica",
  "copenhagen-atomics",
  "turk-telekom",
  "liveaction",
  "apacheNifi",
  "toggle",
  "syntropy",
  "synology",
  "prediko",
  "electric-era",
  "razor-secure",
].map((key) => ({ ...logos[key], ...logosOverrides[key] }))

const Customers = () => {
  const { isDarkTheme } = useThemeContext()
  return (
    <Section noGap>
      <Marquee gradientColor={isDarkTheme ? [33, 34, 44] : [255, 255, 255]}>
        <div className={styles.logos}>
          {customerLogos.map((logo) => (
            <div
              key={logo.alt}
              className={clsx(styles.logo, { [styles.logoDark]: isDarkTheme })}
            >
              <img
                alt={logo.alt}
                height={logo.height}
                src={logo.src}
                width={logo.width}
                style={{ top: logo.offset ?? 0 }}
              />
            </div>
          ))}
        </div>
      </Marquee>
    </Section>
  )
}

export default Customers
