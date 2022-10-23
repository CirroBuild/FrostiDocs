import React from "react"
import Layout from "../../theme/Layout"

import { Section } from "../../components/Section"
import { ActionFooter } from "../../components/ActionFooter"
import { CompareFeatures } from "../../modules/cloud/CompareFeatures"
import { Top } from "../../modules/cloud/Top"
import { GetAccess } from "../../modules/cloud/get-access"

const CloudPage = () => (
  <Layout
    canonical="/cloud"
    description="The fastest open source time series database fully managed on the cloud, now available on AWS"
    title="Cloud"
    image="/img/pages/cloud/screens-thumb.png"
  >
    <Top />
    <CompareFeatures />

    <Section>
      <Section.Subtitle center>Ready to get started?</Section.Subtitle>
      <GetAccess />
    </Section>

    <Section>
      <ActionFooter />
    </Section>
  </Layout>
)

export default CloudPage
