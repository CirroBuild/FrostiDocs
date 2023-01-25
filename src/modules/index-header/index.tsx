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
          Your virtual DevOps engineer
        </Section.Title>

        <Section.Subtitle className={styles.subheader} center>
          Frosti translates your business logic to cloud infrastructure. 
          Deploy in less than 5 minutes with a single build command.
        </Section.Subtitle>

        <div className={styles.getStartedButtons}>
          <Link to="/cloud/" className={styles.joinPublicPreviewLink}>
            <Button newTab={false}>Book a Demo</Button>
          </Link>
        </div>
      </div>
    </Section>
  )
}
