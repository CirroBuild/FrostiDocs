import React from "react"
import { Chip } from "../Chip"
import styles from "./styles.module.css"

type Props = {
  items: Array<{ name: string; permalink: string }>
}

export const Chips = ({ items }: Props) => (
  <div className={styles.root}>
    {items.map(({ name, permalink }) => (
      <Chip
        key={permalink}
        className={styles.chip}
        label={name}
        permalink={permalink}
      />
    ))}

    <Chip className={styles.chip} label="More..." permalink="/blog/tags" />
  </div>
)
