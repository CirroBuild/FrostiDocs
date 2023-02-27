import clsx from "clsx"
import React from "react"
import Layout from "../theme/Layout"
import CodeBlock from "@theme/CodeBlock"
import ilCss from "../css/enterprise/illustration.module.css"
import seCss from "../css/section.module.css"

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
            For <strong>$10</strong>, gain access to standalone, cloud hosted Test instances to deploy your application.  
          </p>
          <p
            className={clsx(
              seCss.section__subtitle,
              seCss["section__subtitle--accent"],
              "text--center",
            )}
          >
            Simply run the following command after installing Frosti:
          </p>

          <CodeBlock className="language-shell">
            frosti signup beta
          </CodeBlock>

          
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
