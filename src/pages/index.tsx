import clsx from "clsx"
import React from "react"
import customFields from "../config/customFields"

import Layout from "../theme/Layout"
import { Header } from "../modules/index-header"
import { Section } from "../components/Section"
import { UseCases } from "../modules/use-cases"
import { Integration } from "../modules/integration"

import feCss from "../css/index/feature.module.css"
import seCss from "../css/section.module.css"
import LiveDemo from "../modules/index-live-demo"

const Cards = () => (
  <Section odd fullWidth>
    <Section noGap>
      <Section.Title level={3} size="small" center>
        Why Frosti?
      </Section.Title>

      <div
        className={clsx(
          seCss.section__footer,
          seCss["section__footer--feature-cards"],
        )}
      >
        {[
          {
            header: "Save 6+ Months of DevOps Time",
            content:
              "Save months of work building cloud primitives and deployment processes. No more pain debugging failed deployment and misconfigurations. Frosti will automate the infrastructure provisioning and configuration.",
          },
          {
            header: "Automatically Adopt Industry Cloud Best Practices",
            content:
              "Our developer platform will automatically provision the most secure, reliable and cost optimized cloud infrastructure based on the Sdks used. ",
          },
          {
            header: "Deploy Everwhere",
            content:
              "Frosti provisions resources across GCP, AWS and Azure. Take your application and leverage best of class services across each cloud.",
          },

          

          

        ].map(({ header, content }, index) => (
          <div key={index} className={feCss.feature}>
            <h3 className={feCss.feature__header}>{header}</h3>
            <p className={feCss.feature__content}>{content}</p>
          </div>
        ))}
      </div>
    </Section>
  </Section>
)

const Home = () => (
  <Layout
    canonical=""
    description={customFields.description}
    title="Frosti | Virtual DevOps Engineer"
    replaceTitle
  >
    <Header />
    <Section fullWidth center>
      <UseCases />
    </Section>

    <LiveDemo />

    <Section fullWidth odd>
      <Integration />
    </Section>

  
 

    <Section>
      <Cards />
    </Section>
  </Layout>
)

export default Home
