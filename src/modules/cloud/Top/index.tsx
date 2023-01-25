import React from "react"
import { Section } from "../../../components/Section"
import localStyle from "./styles.module.css"
import { ContactForm } from "../ContactForm"

const featureList = [
  "Automatic cloud resource provisioning and configuration",
  "Built in enterprise grade security",
  "Industry leading reliability and resiliency architectures",
]

export const Top = () => {
  return (
    <Section className={localStyle.section}>
      <div className={localStyle.columns}>
        <div className={localStyle.textColumn}>
          <Section.Title level={1}>Frosti</Section.Title>

          <Section.Subtitle>
            Your virtual DevOps engineer.
          </Section.Subtitle>

          <ul className={localStyle.list}>
            {featureList.map((feature) => (
              <li className={localStyle.bullet} key={feature}>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Section noGap center>
          <ContactForm interestedIn="cloud" />
        </Section>
      </div>
    </Section>
  )
}
