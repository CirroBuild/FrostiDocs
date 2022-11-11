import React from "react"

import Button from "@theme/Button"
import { Dialog } from "../../components/Dialog"
import { ContactForm } from "./ContactForm"

export const GetAccess = () => (
  <Dialog>
    <Dialog.Trigger>
      <Button variant="primary">Join public preview</Button>
    </Dialog.Trigger>
    <Dialog.Content title="Join Public Preview" maxWidth="40rem">
      <ContactForm interestedIn="cloud" />
    </Dialog.Content>
  </Dialog>
)
