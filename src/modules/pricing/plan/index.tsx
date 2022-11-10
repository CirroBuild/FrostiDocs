import React from "react"
import Button from "@theme/Button"
import { Section } from "../../../components/Section"
import style from "./styles.module.css"
import clsx from "clsx"

import { Dialog } from "../../../components/Dialog"
import { ContactForm } from "../../cloud/ContactForm"
import { plans } from "../plans/plans"

export type PricingPlan = {
  type: "entry" | "performant" | "high-performance"
  title: string
  description: string
  price: string
  specs: Array<{ label: string; value: string }>
  subtext: string
  highlighted?: boolean
}

const contactFormChoices = plans.map(({ type, title }) => ({
  type,
  label: title,
}))

export const Plan = (plan: PricingPlan) => (
  <article className={style.root}>
    <header
      className={clsx(style.heading, { [style.highlighted]: plan.highlighted })}
    >
      <Section.Title level={3} className={style.title}>
        {plan.title}
      </Section.Title>

      <span className={style.description}>{plan.description}</span>
    </header>

    <div className={style.price}>
      <span className={style.priceValue}>${plan.price}</span>
      <span className={style.pricePeriod}>per hour</span>
    </div>

    <div className={style.specs}>
      {plan.specs.map((spec, index) => (
        <div key={index} className={style.spec}>
          <span className={style.specLabel}>{spec.label}</span>
          <span className={style.specValue}>{spec.value}</span>
        </div>
      ))}
    </div>

    <div className={style.cta}>
      <Dialog>
        <Dialog.Trigger>
          <Button size="small">Get Access</Button>
        </Dialog.Trigger>
        <Dialog.Content title="Get Access">
          <ContactForm
            optionsLabel="What plan would you like to start with?"
            options={contactFormChoices}
            defaultOption={plan.type}
          />
        </Dialog.Content>
      </Dialog>
    </div>
  </article>
)
