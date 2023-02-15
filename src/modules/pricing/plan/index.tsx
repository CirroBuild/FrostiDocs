import React from "react"
import Button from "@theme/Button"
import { Section } from "../../../components/Section"
import style from "./styles.module.css"
import clsx from "clsx"
import Link from "@docusaurus/Link"



export type PricingPlan = {
  type: "idea" | "beta" | "team" | "enterprise"
  title: string
  price: string
  action: string
  url: string
  specs: Array<{ label: string; value: string }>
  highlighted?: boolean
}

export const Plan = (plan: PricingPlan) => (
  <article className={style.root}>
    <header
      className={clsx(style.heading, { [style.highlighted]: plan.highlighted })}
    >
      <Section.Title level={3} className={style.title}>
        {plan.title}
      </Section.Title>
    </header>

    <div className={style.price}>
      <span className={style.priceValue}>{plan.price}</span>
    </div>

    <div className={style.specs}>
      {plan.specs.map((spec, index) => (
        <div key={index} className={style.spec}>
          <span className={style.specValue}>{spec.value}</span>
        </div>
      ))}
    </div>

    <div className={style.cta}>
      <Link to={plan.url}>
        <Button newTab={false} size="small">{plan.action}</Button>
      </Link>
    </div>
  </article>
)
