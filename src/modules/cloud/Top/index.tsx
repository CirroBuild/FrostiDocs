import React from "react"
import clsx from "clsx"
import style from "../../../css/cloud/style.module.css"
import Button from "@theme/Button"
import flCss from "../../../css/cloud/flashy.module.css"
import prCss from "../../../css/property.module.css"
import { Section } from "../../../components/Section"
import { Screenshot } from "./screenshot"
import styled from "styled-components"
import { GetAccess } from "../get-access"
import localStyle from "./styles.module.css"
import customFields from "../../../config/customFields"

const screenPath = (screen: string) => `/img/pages/cloud/screens/${screen}.png`

const screenshots = [
  { src: screenPath("instances"), position: { top: 50, left: 0 } },
  { src: screenPath("snapshots"), position: { top: 200, left: "15%" } },
  { src: screenPath("connect-go"), position: { top: 100, right: 0 } },
]

const Cards = styled.div`
  --cols: 1;
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  align-items: stretch;
  gap: 2rem;

  & > div {
    /* override .flashy in ../../../css/cloud/flashy.module.css :( */
    margin-bottom: 0 !important;
  }

  @media screen and (min-width: 750px) {
    & {
      --cols: 2;
    }
  }
`

export const Top = () => {
  return (
    <Section>
      <Section.Title center>QuestDB Cloud</Section.Title>

      <Section.Subtitle center>
        The fastest open source time series database fully managed on the cloud.
      </Section.Subtitle>

      <Section noGap center>
        <div className={localStyle.topScreens}>
          {screenshots.map(({ src, position }) => (
            <Screenshot
              className={localStyle.screenshot}
              key={src}
              width={543}
              height={351}
              src={src}
              style={position}
            />
          ))}
        </div>

        <Cards>
          <div className={flCss.flashy}>
            <h3 className={flCss.flashy__title}>Open source</h3>
            <p>Install QuestDB on your server for free.</p>

            <ul className={style.card__list}>
              {["Free", "Apache 2.0 License", "Self-hosting"].map((item) => (
                <li
                  key={item}
                  className={clsx(prCss.property, style.card__item)}
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className={localStyle.cardButtons}>
              <Button variant="tertiary" href={customFields.demoUrl}>
                Live Demo
              </Button>
              <Button variant="primary" href="/get-questdb" newTab={false}>
                Install
              </Button>
            </div>
          </div>

          <div className={flCss.flashy}>
            <h3 className={flCss.flashy__title}>Cloud</h3>
            <p>Use a fully managed cloud solution.</p>
            <ul className={style.card__list}>
              {[
                "Database-as-a-service",
                "Database monitoring",
                "Built-in authentication",
                "Additional database features",
                "Multiple regions",
              ].map((item) => (
                <li
                  key={item}
                  className={clsx(prCss.property, style.card__item)}
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className={localStyle.cardButtons}>
              <Button variant="tertiary" to="/pricing" newTab={false}>
                Pricing
              </Button>
              <GetAccess />
            </div>
          </div>
        </Cards>
      </Section>
    </Section>
  )
}
