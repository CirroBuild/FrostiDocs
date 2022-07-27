import React from "react"
import Layout from "../../theme/Layout"
import { InlineWidget } from "react-calendly"
import { Section } from "../../components/Section"
import style from "../../css/cloud/style.module.css"

const BookADemo = () => {
  const title = "Book a demo"
  const description = ""

  return (
    <Layout
      canonical="/cloud"
      description={description}
      title={title}
      image="/img/pages/cloud/screens-thumb.png"
    >
      <Section>
        <Section.Title center>{title}</Section.Title>
        <div className={style["calendly-inline-widget-wrapper"]}>
          <InlineWidget
            url="https://calendly.com/d/dv3-8hc-2d5/questdb-cloud-demo"
            styles={{ width: "100%", height: "100%" }}
          />
        </div>
      </Section>
    </Layout>
  )
}

export default BookADemo
