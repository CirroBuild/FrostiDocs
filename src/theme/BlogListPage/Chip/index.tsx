import clsx from "clsx"
import React from "react"
import styles from "./styles.module.css"

type Props = {
  label: string
  permalink: string
  className?: string
}

export const Chip = ({ label, permalink, className }: Props) => (
  <a className={clsx(styles.root, className)} href={permalink}>
    {label}
  </a>
)
