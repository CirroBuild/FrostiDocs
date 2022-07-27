import React from "react"
import style from "./styles.module.css"
import clsx from "clsx"

type Props = {
  children: React.ReactNode
  odd?: boolean
  accent?: boolean
  row?: boolean
  fullWidth?: boolean
  noGap?: boolean
}

export const Section = ({
  fullWidth,
  children,
  odd,
  accent,
  row,
  noGap,
}: Props) => (
  <div
    className={clsx(style.root, {
      [style.odd]: odd,
      [style.accent]: accent,
      [style.row]: row,
      [style.fullWidth]: fullWidth,
      [style.noGap]: noGap,
    })}
  >
    {children}
  </div>
)

const Title = ({
  level = 2,
  children,
  center,
}: {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  center?: boolean
}) =>
  React.createElement(
    `h${level}`,
    {
      className: clsx(style.title, { [style.center]: center }),
    },
    children,
  )

const Subtitle = ({
  children,
  center,
}: {
  children: React.ReactNode
  center?: boolean
}) => (
  <span className={clsx(style.subtitle, { [style.center]: center })}>
    {children}
  </span>
)

Section.Title = Title
Section.Subtitle = Subtitle
