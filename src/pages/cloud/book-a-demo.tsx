import React from "react"
import Layout from "../../theme/Layout"
import { InlineWidget } from "react-calendly"
import { Section } from "../../components/Section"
import style from "../../css/cloud/style.module.css"

const BookADemo = () => {
  const title = "Book a demo"

  return (
    <Layout
      canonical="/cloud/"
      description="Book a demo for the fastest open source time series database fully managed on the cloud"
      title={title}
      image="/img/pages/cloud/screens-thumb.png"
    >
      <Section>
        <Section.Title center>{title}</Section.Title>
        <Section.Subtitle center>or email us at frostibuild.com</Section.Subtitle>
        <div className={style["calendly-inline-widget-wrapper"]}>
          <InlineWidget
            url="https://calendly.com/questdb-nic/questdb"
            styles={{ width: "100%", height: "100%" }}
          />
        </div>
      </Section>
    </Layout>
  )
}

export default BookADemo
