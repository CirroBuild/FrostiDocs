import clsx from "clsx"
import React from "react"
import Layout from "../theme/Layout"
import Subscribe from "../components/Subscribe"
import ilCss from "../css/enterprise/illustration.module.css"
import seCss from "../css/section.module.css"
import style from "../css/enterprise/style.module.css"
import _quotes from "../assets/quotes"

const Enterprise = () => {
  return (
    <Layout canonical="/enterprise" 
    description="Gain access to standalone, cloud hosted test instances to deploy your application." 
    title="Sign Up for Frosti">
      <section className={seCss["section--inner"]}>
        <div className={seCss.section__header}>
          <h1
            className={clsx(
              seCss.section__title,
              seCss["section__title--accent"],
            )}
          >
            Sign Up
          </h1>

          <p
            className={clsx(
              seCss.section__subtitle,
              seCss["section__subtitle--accent"],
              "text--center",
            )}
          >
            Gain access to standalone, cloud hosted test instances to deploy your application.
          </p>

          <Subscribe
            placeholder="Work Email"
            submitButtonText="Contact Us"
            provider="enterprise"
            className={style.subscribe}
          />

          <img
            alt="Artistic view of the console with sub-queries"
            className={ilCss.illustration}
            height={394}
            src="/img/pages/index/FrostiProvision.png"
            width={900}
          />
        </div>
      </section>      
    </Layout>
  )
}

export default Enterprise
