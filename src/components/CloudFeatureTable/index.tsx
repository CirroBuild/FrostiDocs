import React from "react"
import style from "./styles.module.css"
import clsx from "clsx"
import { ContactFormDialog } from "../ContactFormDialog"

type Availability =
  | "available"
  | "unavailable"
  | "not-applicable"
  | "coming-soon"
  | "contact-us"

export type CloudFeatureItem = {
  title: string
  inOpenSource: Availability
  inCloud: Availability
}

type Props = {
  title: string
  items: CloudFeatureItem[]
}

const AvailabilityStatus = ({
  availability,
}: {
  availability: Availability
}) => {
  switch (availability) {
    case "available":
      return <span className={clsx(style.icon, style["icon--check"])} />
    case "unavailable":
      return <span className={clsx(style.icon, style["icon--close"])} />
    case "not-applicable":
      return <span>-</span>
    case "coming-soon":
      return <span>Coming soon</span>
    case "contact-us":
      return (
        <ContactFormDialog
          defaultInterest="sla"
          trigger={<span className={style.link}>Contact us</span>}
        />
      )
  }
}

export const CloudFeatureTable = ({ title, items }: Props) => (
  <div className={style.root}>
    <div className={clsx(style["table-row"], style["table-heading"])}>
      <span className={style["table-heading__title"]}>
        {title.toUpperCase()}
      </span>
      <span className={style["table-heading__category"]}>Open Source</span>
      <span className={style["table-heading__category"]}>QuestDB Cloud</span>
    </div>
    {items.map(({ title, inOpenSource, inCloud }) => (
      <div
        className={clsx(style["table-row"], style["table-item"])}
        key={title}
      >
        <span className={style["table-row__title"]}>{title}</span>
        <span className={style["table-row__value"]}>
          <AvailabilityStatus availability={inOpenSource} />
        </span>
        <span className={style["table-row__value"]}>
          <AvailabilityStatus availability={inCloud} />
        </span>
      </div>
    ))}
  </div>
)
