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
    <Section.Title center>
      Frosti Pricing
    </Section.Title>

    <Section center noGap>
      <Plans />
    </Section>
  </Layout>
)

export default CloudPage
