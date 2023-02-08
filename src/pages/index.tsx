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
            header: "Deploy Everwhere",
            content:
              "Provision resources across Azure, AWS, GCP, and others",
          },
          {
            header: "Zero Trust Security",
            content:
              "Secure access to resources following instustry leading standards via managed identities"
          },
          {
            header: "Business Continuity and Disaster Recovery",
            content:
              "Our comprehensive solution keeps your data and operations safe and secure",
          },
          {
            header: "Stay Updated",
            content:
              "Technology moves fast. Frosti keeps your infrastructure up-to-date in a few clicks",
          },
          {
            header: "Declarative Deployment",
            content:
              "Easy, efficient, and deterministic deployment of your applications and infrastructure",
          },
          {
            header: "Local Development",
            content:
              "Fast and flexible development via seamless connection to cloud resources",
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

const Workflow = () => (
  <Section center>
    <img
      loading="lazy"
      width="900px"
      alt="Before and After via Frosti"
      src="/img/pages/index/WorkflowDiagram.png"
    />
  </Section>
)
const Provision = () => (
  <Section noGap center>
    <Section.Title size="small" center>
      Fully Automated Deployments
    </Section.Title>

    <img
      loading="lazy"
      width="900px"
      alt="Frosti Provision"
      src="/img/pages/index/FrostiProvision.png"
    />
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
    <Workflow />
    

    <Section fullWidth odd>
      <Integration />
    </Section>    

    <Section>
      <Cards />
    </Section>

    <Section fullWidth odd>
      <Provision />
    </Section>  
  </Layout>
)

export default Home
