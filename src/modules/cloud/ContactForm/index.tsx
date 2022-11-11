import React, { FormEvent, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import Input from "@theme/Input"
import Button from "@theme/Button"
import emailPattern from "../../../utils/emailPattern"
import subscribeStyle from "../../../components/Subscribe/style.module.css"
import style from "./styles.module.css"
import clsx from "clsx"
import type { PricingPlan } from "../../pricing/plan"

type Props = {
  interestedIn?: PricingPlan["type"] | "custom" | "cloud" | "sla"
  defaultEmail?: string
}

export const ContactForm = ({ defaultEmail = "", interestedIn }: Props) => {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)

    const formData = new FormData(event.target as HTMLFormElement)
    const payload = {
      email: formData.get("email"),
      interestedIn: formData.get("interestedIn"),
    }

    try {
      await fetch("https://crast.questdb.io/contact/form", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      })
    } catch (e) {}

    setSent(true)
  }

  return (
    <form onSubmit={onSubmit} className={style.root}>
      <TransitionGroup>
        <CSSTransition
          key={sent.toString()}
          timeout={200}
          classNames="transition-node"
        >
          {sent ? (
            <p className={subscribeStyle.success}>
              Thank you, we will be in touch soon!
            </p>
          ) : (
            <div className={style.content}>
              {typeof interestedIn === "string" && (
                <input type="hidden" name="interestedIn" value={interestedIn} />
              )}

              <p>
                QuestDB Cloud is in public preview, available by invitation.
              </p>

              <p>Book a demo with us and get started</p>
              <Button
                className={style.bookDemoButton}
                variant="primary"
                href="/cloud/book-a-demo/"
                newTab={false}
              >
                Book a Demo
              </Button>

              <p>
                alternatively, register for updates and get notified for general
                availability
              </p>

              <div className={style.submitBlock}>
                <Input
                  className={clsx(subscribeStyle.input, style.input)}
                  name="email"
                  defaultValue={defaultEmail}
                  type="email"
                  title="Email address should be valid"
                  placeholder="E-mail*"
                  required
                  pattern={emailPattern}
                />

                <Button
                  className={clsx(style.submit, { [style.loader]: loading })}
                  disabled={loading}
                  variant="primary"
                  type="submit"
                  size="xsmall"
                >
                  {loading ? "Sending..." : "Send"}
                </Button>
              </div>
            </div>
          )}
        </CSSTransition>
      </TransitionGroup>
    </form>
  )
}
