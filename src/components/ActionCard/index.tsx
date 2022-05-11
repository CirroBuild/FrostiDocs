import clsx from "clsx"
import React from "react"

import style from "./styles.module.css"

type Props = {
  skin?: "default" | "primary"
  title: React.ReactNode
  description: React.ReactNode
  icon?: React.ReactNode
}

export const ActionCard: React.FunctionComponent<Props> = ({
  skin = "default",
  icon,
  title,
  description,
  children,
}) => (
  <div
    className={clsx(style.root, {
      [style.skinPrimary]: skin === "primary",
    })}
  >
    {icon}
    <h3 className={style.title}>{title}</h3>
    <p className={style.description}>{description}</p>
    <div className={style.content}>{children}</div>
  </div>
)

export default ActionCard
