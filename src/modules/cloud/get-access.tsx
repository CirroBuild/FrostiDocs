import React, { useState } from "react"
import clsx from "clsx"
import subscribeStyle from "../../components/Subscribe/style.module.css"
import style from "../../css/cloud/style.module.css"

import Input from "@theme/Input"
import Button from "@theme/Button"
import emailPattern from "../../utils/emailPattern"
import { ContactFormDialog } from "../../components/ContactFormDialog"

type Props = {
  className?: string
}

export const GetAccess = ({ className }: Props) => {
  const [email, setEmail] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }

  return (
    <div className={clsx(style.subscribe, subscribeStyle.inputs, className)}>
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
  )
}
