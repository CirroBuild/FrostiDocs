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

import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import siteConfig from '@generated/docusaurus.config';

const appInsights = new ApplicationInsights({ config: {
  connectionString: siteConfig.customFields.ai_connection
} });

appInsights.loadAppInsights();
appInsights.trackPageView();

const Cards = () => (
  <Section noGap odd fullWidth>
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
            header: "Declarative Deployment",
            content:
              "Easy, efficient, and deterministic deployment of your applications and infrastructure",
            isPreview : false
          },
          {
            header: "Local Development",
            content:
              "Fast and flexible development via seamless connection to cloud resources",
            isPreview : false
          },
          {
            header: "Zero Trust Security",
            content:
              "Secure access to resources following instustry leading standards via managed identities",
            isPreview : true
          },
          {
            header: "Deploy Everwhere",
            content:
              "Provision resources across Azure, AWS, GCP, and others",
            isPreview : true
          },
          {
            header: "Business Continuity and Disaster Recovery",
            content:
              "Our comprehensive solution keeps your data and operations safe and secure",
            isPreview : true
          },
          {
            header: "Stay Updated",
            content:
              "Technology moves fast. Frosti keeps your infrastructure up-to-date in a few clicks",
            isPreview : true
          },
        ].map(({ header, content, isPreview }, index) => (
          <div key={index} className={feCss.feature}>
            <h3 className={feCss.feature__header}>{header} {isPreview? <sub> [Preview]</sub> : <></>}</h3>
            <p className={feCss.feature__content}>{content}</p>
          </div>
        ))}
      </div>
    </Section>
  </Section>
)

const Workflow = () => (
  <Section center>
    <Section.Title level={3} size="small" center>
      Your Time is Valuable
    </Section.Title>
    <img
      loading="lazy"
      width="1000px"
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
    image="/img/pages/index/FrostiProvision.png"
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
      <Provision />
    </Section>  

    <Section fullWidth odd>
      <Cards />
    </Section>

  </Layout>
)

export default Home
