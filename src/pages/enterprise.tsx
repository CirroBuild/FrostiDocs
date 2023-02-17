import clsx from "clsx"
import React, {useEffect, useState} from "react"
import Layout from "../theme/Layout"
import ilCss from "../css/enterprise/illustration.module.css"
import seCss from "../css/section.module.css"
import Button from "@theme/Button"



const Enterprise = () => {

  function useUserInfo() {
    const [userInfo, setUserInfo] = useState(null);
  
    useEffect(() => {
      async function getUserInfo() {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        return clientPrincipal;
      }
      getUserInfo()
      .then((ui) => setUserInfo(ui))
      .catch((e: Error) => {
        console.log(e);
      });
    }, []);
    return userInfo;
  }
  const userInfo = useUserInfo();

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
          <p>{userInfo}</p>

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
