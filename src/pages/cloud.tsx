import React from "react"
import Layout from "../theme/Layout"

import seCss from "../css/section.module.css"
import { ActionFooter } from "../components/ActionFooter"
import { CompareFeatures } from "../modules/cloud/CompareFeatures"
import { Top } from "../modules/cloud/Top"

const CloudPage = () => {
  const title = "Cloud"
  const description = ""

  return (
    <Layout
      canonical="/cloud"
      description={description}
      title={title}
      image="/img/pages/cloud/screens-thumb.png"
    >
      <Top />
      <CompareFeatures />
      <section className={seCss["section--inner"]}>
        <ActionFooter />
      </section>
    </Layout>
  )
}

export default CloudPage
