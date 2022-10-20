import React, { useState } from "react"
import clsx from "clsx"
import subscribeStyle from "../../../components/Subscribe/style.module.css"
import style from "../../../css/cloud/style.module.css"
import Input from "@theme/Input"
import emailPattern from "../../../utils/emailPattern"
import { ContactFormDialog } from "../../../components/ContactFormDialog"
import Button from "@theme/Button"
import flCss from "../../../css/cloud/flashy.module.css"
import prCss from "../../../css/property.module.css"
import { Section } from "../../../components/Section"
import localStyle from "./styles.module.css"

export const Top = () => {
  const [email, setEmail] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }

  return (
    <Section>
      <Section.Title center>QuestDB Cloud</Section.Title>

      <Section.Subtitle center>
        The fastest open source time series database fully managed on the cloud.
      </Section.Subtitle>

      <div className={clsx(style.subscribe, subscribeStyle.inputs)}>
        <Input
          className={subscribeStyle.input}
          name="email"
          type="email"
          title="Email address should be valid"
          placeholder="E-mail"
          required
          pattern={emailPattern}
          onChange={handleChange}
        />
        <ContactFormDialog
          defaultInterest="cloud"
          defaultEmail={email}
          trigger={
            <Button variant="primary" className={subscribeStyle.submit}>
              Get Access
            </Button>
          }
        />
      </div>

      <img
        alt="Screenshot of instance creation form and instance details pages in QuestDB Cloud"
        height={626}
        src="/img/pages/cloud/screens.png"
        width={1026}
        className={style["header-image"]}
      />

      <Section noGap center>
        <div className={localStyle.bookingCards}>
          <div className={flCss.flashy}>
            <h3 className={flCss.flashy__title}>Open source</h3>
            <ul className={style.card__list}>
              <li className={clsx(prCss.property, style.card__item)}>
                Apache 2.0
              </li>
              <li className={clsx(prCss.property, style.card__item)}>
                Self-hosting
              </li>
              <li className={clsx(prCss.property, style.card__item)}>Free</li>
            </ul>
            <Button
              variant="primary"
              href="/get-questdb"
              className={style.card__button}
              newTab={false}
            >
              Install
            </Button>
          </div>

          <div className={flCss.flashy}>
            <h3 className={flCss.flashy__title}>Cloud</h3>
            <ul className={style.card__list}>
              <li className={clsx(prCss.property, style.card__item)}>
                Database-as-a-service
              </li>
              <li className={clsx(prCss.property, style.card__item)}>
                Database monitoring
              </li>
              <li className={clsx(prCss.property, style.card__item)}>
                Built-in authentication
              </li>
              <li className={clsx(prCss.property, style.card__item)}>
                Additional database features
              </li>
              <li className={clsx(prCss.property, style.card__item)}>
                Multiple regions
              </li>
            </ul>
            <Button
              variant="primary"
              className={style.card__button}
              to="/cloud/book-a-demo"
            >
              Schedule a call
            </Button>
          </div>
        </div>
      </Section>
    </Section>
  )
}
