import React, { useState, useEffect } from "react"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Button from "@theme/Button"
import TypeIt from "typeit-react"
import QuestDBLogo from "../../assets/img/questdb.svg"
import Highlight from "../../components/Highlight"
import { Section } from "../../components/Section"
import SvgImage from "../../components/SvgImage"
import customFields from "../../config/customFields"
import exampleQueriesRaw from "./example-queries"
import styles from "./styles.module.css"
import { LightningChargeFill } from "@styled-icons/bootstrap/LightningChargeFill"

const exampleQueries = exampleQueriesRaw.map(({ comment, query }) => ({
  url: `${customFields.demoUrl}?query=${encodeURIComponent(
    [comment, query].join("\n"),
  )}&executeQuery=true`,
  query,
  view() {
    return <Highlight code={query} />
  },
}))

export const Header = () => {
  const { siteConfig } = useDocusaurusContext()
  const [query, setQuery] = useState<null | number>(null)

  useEffect(() => {
    const isClient = typeof window !== "undefined"

    if (isClient) {
      setQuery(Math.floor(Math.random() * exampleQueries.length))
    }
  }, [])

  return (
    <Section className={styles.root}>
      <div className={styles.titles}>
        <Section.Title level={1} className={styles.header}>
          Fast SQL for time series
        </Section.Title>

        <Section.Subtitle className={styles.subheader}>
          {siteConfig.tagline}
        </Section.Subtitle>

        <div className={styles.getStartedButtons}>
          <Button to="/get-questdb/" uppercase={false}>
            Get Started
          </Button>

          <Button
            href="/cloud/"
            icon={
              <SvgImage
                image={<QuestDBLogo width="32" height="32" />}
                title="QuestDB Cloud"
              />
            }
            newTab={false}
            variant="secondary"
            uppercase={false}
          >
            Cloud
          </Button>
        </div>
      </div>

      <div className={styles.preview}>
        <Section.Subtitle className={styles.previewHeader}>
          Try QuestDB demo in your browser
        </Section.Subtitle>

        <div className={styles.editor}>
          <div className={styles.code}>
            {typeof query === "number" && (
              <TypeIt
                options={{
                  startDelay: 1000,
                  speed: 2,
                  waitUntilVisible: true,
                  cursor: false,
                }}
              >
                {exampleQueries[query].view()}
              </TypeIt>
            )}
          </div>
        </div>

        {typeof query === "number" && (
          <div className={styles.previewTagline}>
            <LightningChargeFill
              className={styles.previewTaglineIcon}
              size="15px"
            />
            <Button
              className={styles.runQueryButton}
              href={exampleQueries[query].url}
              uppercase={false}
              variant="plain"
              size="xxsmall"
            >
              Run this query
            </Button>
            <span>
              in milliseconds on our demo dataset with 1.6 billion rows!
            </span>
          </div>
        )}
      </div>
    </Section>
  )
}
