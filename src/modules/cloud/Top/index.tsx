import React from "react"
import { Section } from "../../../components/Section"
import localStyle from "./styles.module.css"
import Calendly from "../Calendly"


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
          <Section.Title level={1}>Book a Demo</Section.Title>

          <Section.Subtitle>
            Meet Frosti, your virtual DevOps engineer.
          </Section.Subtitle>

          <ul className={localStyle.list}>
            {featureList.map((feature) => (
              <li className={localStyle.bullet} key={feature}>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

     
        <Calendly />
       
      </div>
    </Section>
  )
}
