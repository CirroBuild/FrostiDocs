import { Dialog, DialogTrigger, DialogContent } from "../Dialog"
import React, { FormEvent, useEffect, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import Input from "@theme/Input"
import Button from "@theme/Button"
import emailPattern from "../../utils/emailPattern"

import style from "./style.module.css"
import subscribeStyle from "../Subscribe/style.module.css"
import clsx from "clsx"

type Props = {
  trigger: React.ReactNode
  defaultInterest: "cloud" | "sla"
  defaultName?: string
  defaultEmail?: string
  defaultCompany?: string
}

export const ContactFormDialog = ({
  trigger,
  defaultInterest,
  defaultName = "",
  defaultEmail = "",
  defaultCompany = "",
}: Props) => {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const [name, setName] = useState(defaultName)
  const [email, setEmail] = useState(defaultEmail)
  const [company, setCompany] = useState(defaultCompany)

  const handleNameChange = (value: string) => {
    setName(value)
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
  }

  const handleCompanyChange = (value: string) => {
    setCompany(value)
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)

    const target = event.target as HTMLFormElement
    const email = new FormData(target).get("email") as string
    const name = new FormData(target).get("name") as string
    const company = new FormData(target).get("company") as string
    const interestedIn = new FormData(target).get("interested_in") as string

    try {
      await fetch("https://crast.questdb.io/contact/form", {
        body: JSON.stringify({ email, name, company, interestedIn }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      })
    } catch (e) {}

    setSent(true)
  }

  useEffect(() => {
    setName(defaultName)
  }, [defaultName])

  useEffect(() => {
    setEmail(defaultEmail)
  }, [defaultEmail])

  useEffect(() => {
    setCompany(defaultCompany)
  }, [defaultCompany])

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent maxwidth="35rem">
        <h2 className={clsx("text--center", style.heading)}>Contact us</h2>
        <form onSubmit={onSubmit} className={style.root}>
          <TransitionGroup>
            <CSSTransition
              key={sent.toString()}
              timeout={200}
              classNames="item"
            >
              {sent ? (
                <p className={subscribeStyle.success}>
                  Thank you, we will be in touch soon!
                </p>
              ) : (
                <div className={style.inputs}>
                  <div className={style.inputs__fields}>
                    <Input
                      className={subscribeStyle.input}
                      name="name"
                      value={name}
                      onChange={(event) =>
                        handleNameChange(event.currentTarget.value)
                      }
                      type="text"
                      placeholder="Name"
                    />

                    <Input
                      className={subscribeStyle.input}
                      name="email"
                      value={email}
                      onChange={(event) =>
                        handleEmailChange(event.currentTarget.value)
                      }
                      type="email"
                      title="Email address should be valid"
                      placeholder="E-mail*"
                      required
                      pattern={emailPattern}
                    />

                    <Input
                      className={subscribeStyle.input}
                      name="company"
                      value={company}
                      onChange={(event) =>
                        handleCompanyChange(event.currentTarget.value)
                      }
                      type="text"
                      placeholder="Company"
                    />
                  </div>

                  <p className={style["radio-heading"]}>
                    What are you interested in?
                  </p>

                  <label className={style.radio}>
                    <input
                      type="radio"
                      name="interested_in"
                      value="cloud"
                      {...(defaultInterest === "cloud"
                        ? { checked: true }
                        : {})}
                    />
                    QuestDB Cloud demo
                  </label>

                  <label className={style.radio}>
                    <input
                      type="radio"
                      name="interested_in"
                      value="sla"
                      {...(defaultInterest === "sla" ? { checked: true } : {})}
                    />
                    Support with SLAs
                  </label>

                  <p>
                    You will be added to our user database and signed up for our
                    product newsletter.
                  </p>

                  <Button
                    className={clsx(subscribeStyle.submit, style.submit)}
                    variant="primary"
                    type="submit"
                  >
                    {loading ? <span className={style.loader} /> : "Send"}
                  </Button>
                </div>
              )}
            </CSSTransition>
          </TransitionGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
