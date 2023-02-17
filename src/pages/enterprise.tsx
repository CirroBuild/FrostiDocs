import clsx from "clsx"
import React, { useState, useEffect } from "react"
import Layout from "../theme/Layout"
import ilCss from "../css/enterprise/illustration.module.css"
import seCss from "../css/section.module.css"
import Button from "@theme/Button"







const Enterprise = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    (async function () {
      const response = await fetch('/api/user');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      setData(clientPrincipal.userDetails);
    })();
  }); 
  return (
    <Layout canonical="/enterprise" description="Gain access to standalone, cloud hosted test instances to deploy your application." title="Sign Up for Frosti">
      <section className={seCss["section--inner"]}>
        <h5>{data} </h5>
        <div className={seCss.section__header}>
          <h1
            className={clsx(
              seCss.section__title,
              seCss["section__title--accent"],
            )}
          >
            Sign Up For Beta
          </h1>
          <p> {data}</p>

          <p
            className={clsx(
              seCss.section__subtitle,
              seCss["section__subtitle--accent"],
              "text--center",
            )}
          >
            For $1/month, gain access to standalone, cloud hosted test instances to deploy your application.
          </p>

          <Button
            size="xsmall"
            to="https://buy.stripe.com/7sIcNV5NcbvMdDGfYY"
          >
            Get Started
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
