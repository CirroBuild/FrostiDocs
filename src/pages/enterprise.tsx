import clsx from "clsx"
import React from "react"
import Layout from "../theme/Layout"
import ilCss from "../css/enterprise/illustration.module.css"
import seCss from "../css/section.module.css"
import Button from "@theme/Button"

const Enterprise = () => {
  return (
    <Layout canonical="/enterprise" description="Gain access to standalone, cloud hosted test instances to deploy your application." title="Sign Up for Frosti">
      <section className={seCss["section--inner"]}>
        <div className={seCss.section__header}>
          <h1
            className={clsx(
              seCss.section__title,
              seCss["section__title--accent"],
            )}
          >
            Sign Up For Beta
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

          <Button
            size="xsmall"
            to="https://billing.stripe.com/p/login/test_9AQ17Kcb02ay01i9AA"
          >
            Create Subscription
          </Button>
          



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
