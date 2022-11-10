import React from "react"
import Layout from "../theme/Layout"
import Button from "@theme/Button"

import { Section } from "../components/Section"
import { Plans } from "../modules/pricing/plans"
import { OtherUseCases } from "../modules/pricing/other-use-cases"
import { PricingChoices } from "../modules/pricing/pricing-choices"

const CloudPage = () => (
  <Layout
    canonical="/pricing"
    description="Pricing details of QuestDB Cloud. We bring elasticity, availability and security with a fully managed Cloud offering"
    title="Pricing"
    // @TODO: make banner
    image="/img/pages/pricing/banner.png"
  >
    <Section>
      <Section.Title level={1} center>
        QuestDB Cloud Pricing
      </Section.Title>

      <Section.Subtitle center>
        With QuestDB Cloud we bring elasticity, availability
        <br /> and security with a fully managed Cloud offering
      </Section.Subtitle>
    </Section>

    <Section center noGap>
      <Plans />
    </Section>

    <Section center>
      <PricingChoices />
    </Section>

    <Section odd fullWidth>
      <Section.Title size="small" center>
        See full feature list of QuestDB Cloud
      </Section.Title>

      <Section noGap center>
        <Button to="/cloud" uppercase={false}>
          More info
        </Button>
      </Section>
    </Section>

    <Section>
      <OtherUseCases />
    </Section>
  </Layout>
)

export default CloudPage
