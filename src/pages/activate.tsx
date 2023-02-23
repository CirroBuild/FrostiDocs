import clsx from "clsx"
import React, {useEffect, useState} from "react"
import Layout from "../theme/Layout"
import ilCss from "../css/enterprise/illustration.module.css"
import seCss from "../css/section.module.css"
import Button from "@theme/Button"
import {URLSearchParams} from 'url'

const Activate = () => {

  function useUserInfo() {
    const [userInfo, setUserInfo] = useState(null);
  
    useEffect(() => {
      const getUserInfo = async () => {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        console.log(payload)
        setUserInfo(clientPrincipal.userDetails);
      }
      getUserInfo()
      .catch((e: Error) => {
        console.log(e);
      });
    }, []);

    return userInfo;
  }
  const userInfo = useUserInfo();
  
  const oid = new URLSearchParams(location.search).get(
    "oid"
  );
  const PID = new URLSearchParams(location.search).get(
    "PID"
  );

  const addBetaUser = async () => {
    console.log(`Adding user start`)

    if(oid != null && PID != null)
    {
        console.log(`Adding user: ${oid} and PID ${PID}`)
        await fetch(`https://frostifu-ppe-eus-functionappc1ed.azurewebsites.net/api/AddBetaUser?objectId=${oid}&PID=${PID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin':'*' },
      })
    }
  }
  addBetaUser()
  .then(() => console.log('Retrieving Payment Intent'))
    .catch((e: Error) => {
    console.log(e);
    });

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
            Enrolled in Beta!
          </h1>
          <p>{userInfo}</p>
          

          <p
            className={clsx(
              seCss.section__subtitle,
              seCss["section__subtitle--accent"],
              "text--center",
            )}
          >
            You have unlocked the Frosti test environment. Feel free to contact us with any questions.
          </p>

          <Button
            size="xsmall"
            to="/docs/get-started/provision/"
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

export default Activate
