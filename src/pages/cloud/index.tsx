import React from "react"
import Layout from "../../theme/Layout"

import { Section } from "../../components/Section"
import { ActionFooter } from "../../components/ActionFooter"
import { Top } from "../../modules/cloud/Top"


const CloudPage = () => (
  <Layout
    canonical="/cloud"
    description="The fastest open source time-series database fully managed on the cloud, now available on AWS"
    title="Cloud"
    image="/img/pages/cloud/screens-thumb.png"
  >
    <Top />

    <Section>
      <ActionFooter />
    </Section>
  </Layout>
)

export default CloudPage
