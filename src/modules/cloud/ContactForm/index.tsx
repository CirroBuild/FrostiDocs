import React, { FormEvent, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import Input from "@theme/Input"
import Button from "@theme/Button"
import emailPattern from "../../../utils/emailPattern"
import subscribeStyle from "../../../components/Subscribe/style.module.css"
import style from "./styles.module.css"

type Props = {
  options?: Array<{ type: string; label: string }>
  optionsLabel?: string
  defaultOption: Props["options"] extends Array<Props["options"]>
    ? Props["options"][number]["type"]
    : string
  defaultName?: string
  defaultEmail?: string
  defaultCompany?: string
}

const defaultOptions: Props["options"] = [
  { type: "cloud", label: "QuestDB Cloud demo" },
  { type: "sla", label: "Support with SLAs" },
]

export const ContactForm = ({
  options = defaultOptions,
  defaultOption,
  optionsLabel = "What are you interested in?",
  defaultName = "",
  defaultEmail = "",
  defaultCompany = "",
}: Props) => {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)

    const formData = new FormData(event.target as HTMLFormElement)
    const payload = {
      email: formData.get("email"),
      name: formData.get("name"),
      company: formData.get("company"),
      interestedIn: formData.get("interested_in"),
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
            <div className={style.inputs}>
              <Input
                className={subscribeStyle.input}
                name="name"
                defaultValue={defaultName}
                type="text"
                placeholder="Name"
              />

              <Input
                className={subscribeStyle.input}
                name="email"
                defaultValue={defaultEmail}
                type="email"
                title="Email address should be valid"
                placeholder="E-mail*"
                required
                pattern={emailPattern}
              />

              <Input
                className={subscribeStyle.input}
                name="company"
                defaultValue={defaultCompany}
                type="text"
                placeholder="Company"
              />

              <h4>{optionsLabel}</h4>

              <div className={style.radios}>
                {options?.map((option) => (
                  <label key={option.type}>
                    <input
                      type="radio"
                      name="interested_in"
                      value={option.type}
                      defaultChecked={defaultOption === option.type}
                    />
                    {option.label}
                  </label>
                ))}
              </div>

              <p>
                You will be added to our user database and signed up for our
                product newsletter.
              </p>

              <Button className={style.submit} variant="primary" type="submit">
                {loading ? <span className={style.loader} /> : "Send"}
              </Button>
            </div>
          )}
        </CSSTransition>
      </TransitionGroup>
    </form>
  )
}
