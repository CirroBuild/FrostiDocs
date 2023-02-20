import clsx from "clsx"
import React, {useState, useEffect } from "react"
import Layout from "../theme/Layout"
import ilCss from "../css/enterprise/illustration.module.css"
import seCss from "../css/section.module.css"
import Button from "@theme/Button"

const Enterprise = () => {
  // const [userDetails, setUserDetails] = useState(null);
  const baseUrl = "https://buy.stripe.com/7sIcNV5NcbvMdDGfYY"; 
  const [checkOutString, setCheckOutString] = useState(baseUrl);
  let oid = "";
  useEffect(() => {
    const getCheckOutUrl = async () => {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      console.log(payload)
      const claims = clientPrincipal.claims;
      for (let i = 0; i < claims.length; i++){
        const obj = claims[i];
        if(obj.typ === "http://schemas.microsoft.com/identity/claims/objectidentifier")
          oid = obj.val;
      }
      // setUserDetails(clientPrincipal.userDetails);
      setCheckOutString(baseUrl.concat("?prefilled_email=", clientPrincipal.userDetails, "&client_reference_id=", oid));
    }
    getCheckOutUrl()
    .catch((e: Error) => {
      console.log(e);
    });
  }, []);

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
            For $1/month, gain access to standalone, cloud hosted test instances to deploy your application.
          </p>

          <p>For Stripe checkout, copy your AAD object ID (shown below) into the `AAD Object ID` field. 
            Frosti will use this ID to grant you access to the Beta Frosti release.</p>
          <h2>{oid}</h2>
          <Button
            size="xsmall"
            newTab
            to={checkOutString}
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
