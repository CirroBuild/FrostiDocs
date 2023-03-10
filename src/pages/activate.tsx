import clsx from "clsx"
import React, {useEffect, useState} from "react"
import Layout from "../theme/Layout"
import ilCss from "../css/enterprise/illustration.module.css"
import seCss from "../css/section.module.css"
import Button from "@theme/Button"

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
  
  const getOid = (): string | null => {
    const isClient = typeof window !== "undefined"
  
    const objectId = () => {
      if (!isClient) {
        return null
      }
  
      return new URLSearchParams(window.location.search).get(
        "objectId"
      );
    }
    return objectId()
  }

  const objectId = getOid()

  const getSid = (): string | null => {
    const isClient = typeof window !== "undefined"
  
    const sid = () => {
      if (!isClient) {
        return null
      }
  
      return new URLSearchParams(window.location.search).get(
        "sessionId"
      );
    }
    return sid()
  }

  const sessionId = getSid()

  const addBetaUser = async () => {
    if(objectId != null && sessionId != null)
    {
        await fetch(`https://frostifu-ppe-eus-functionappc1ed.azurewebsites.net/api/AddBetaUser?objectId=${objectId}&sessionId=${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin':'*' },
      })
    }
  }
  addBetaUser()
  .then(() => console.log('Adding Beta User'))
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
            You have succesfully enrolled in Beta!
          </h1>
          <p>{userInfo}</p>
          

          <p
            className={clsx(
              seCss.section__subtitle,
              seCss["section__subtitle--accent"],
              "text--center",
            )}
          >
            Run <kbd>frosti provision</kbd> again and the Test Env workflow will be created for you.
          </p>

          <Button
            size="xsmall"
            to="/docs/get-started/provision/#deploying-to-ppeproduction-requires-sign-up-for-the-beta"
          >
            More Info
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
