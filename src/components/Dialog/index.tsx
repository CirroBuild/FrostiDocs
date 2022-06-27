import React, { useRef } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import styles from "./styles.module.css"

type Props = {
  children: React.ReactNode
  maxwidth?: string
}

export const DialogContent = ({ children, maxwidth, ...props }: Props) => {
  const node = useRef<HTMLDivElement>(null)

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles["dialog-overlay"]} />
      <DialogPrimitive.Content
        {...props}
        ref={node}
        className={styles["dialog-content"]}
        {...(maxwidth !== null ? { style: { maxWidth: maxwidth } } : {})}
      >
        {children}
        <DialogPrimitive.Close
          aria-label="Close"
          className={styles["dialog-close"]}
        />
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = ({ children }) => (
  <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
)
