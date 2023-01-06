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
          Fast SQL for time-series
        </Section.Title>

        <Section.Subtitle className={styles.subheader} center>
          Columnar time-series database with high performance ingestion and SQL
          analytics you know and love from QuestDB open source, now on the
          cloud.
        </Section.Subtitle>

        <div className={styles.getStartedButtons}>
          <Link to="/cloud/" className={styles.joinPublicPreviewLink}>
            <Button newTab={false}>Join private preview</Button>
          </Link>
        </div>
      </div>
    </Section>
  )
}
