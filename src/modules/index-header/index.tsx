import React from "react"
import Button from "@theme/Button"
import { Section } from "../../components/Section"
import styles from "./styles.module.css"
import Link from "@docusaurus/Link"

export const Header = () => {
  return (
    <Section fullWidth center>
      <div className={styles.titles}>
        <Section.Title level={1} className={styles.header}>
          Your Virtual DevOps Engineer
        </Section.Title>

        <Section.Subtitle className={styles.subheader} center>
          No more wasting time with cloud infrastructure or infrastructure as code
        </Section.Subtitle>

        <div className={styles.getStartedButtons}>
          <Link to="/docs/get-started/homebrew/" className={styles.joinPublicPreviewLink}>
            <Button newTab={false}>Try it now</Button>
          </Link>
        </div>
      </div>
    </Section>
  )
}
