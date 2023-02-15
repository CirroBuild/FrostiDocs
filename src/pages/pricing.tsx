import React from "react"
import Layout from "../theme/Layout"

import { Section } from "../components/Section"
import { Plans } from "../modules/pricing/plans"

const CloudPage = () => (
  <Layout
    canonical="/pricing"
    description="Pricing details of Frosti."
    title="Pricing"
    image="/img/pages/cloud/screens-thumb.png"
  >
    <Section>
      <Section.Title level={1} center>
        Frosti Pricing
      </Section.Title>

      <Section.Subtitle center>
        Never write Infrastructure as Code again. 
      </Section.Subtitle>
    </Section>

    <Section center noGap>
      <Plans />
    </Section>
  </Layout>
)

export default CloudPage
