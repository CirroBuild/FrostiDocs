import React from "react"
import style from "./styles.module.css"
import clsx from "clsx"
import { ContactFormDialog } from "../../../components/ContactFormDialog"

type Status =
  | "available"
  | "available-new"
  | "unavailable"
  | "not-applicable"
  | "coming-soon"
  | "contact-us"

export type Feature = {
  title: string
  inOpenSource: Status
  inCloud: Status
  isNew?: boolean
}

type Props = {
  title: string
  items: Feature[]
}

const Availability = ({ status }: { status: Status }) => {
  switch (status) {
    case "available":
      return <span className={clsx(style.icon, style.iconCheck)} />
    case "available-new":
      return (
        <span className={style.availableNew}>
          <span className={clsx(style.icon, style.iconCheck)} />
          <span className={style.availableNewLabel}>New!</span>
        </span>
      )
    case "unavailable":
      return <span className={clsx(style.icon, style.iconClose)} />
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

export const FeatureTable = ({ title, items }: Props) => (
  <table className={style.root}>
    <thead>
      <tr>
        <th>{title.toUpperCase()}</th>
        <th>Open Source</th>
        <th>QuestDB Cloud</th>
      </tr>
    </thead>

    <tbody>
      {items.map(({ title, inOpenSource, inCloud }) => (
        <tr key={title}>
          <td>{title}</td>
          <td>
            <Availability status={inOpenSource} />
          </td>
          <td>
            <Availability status={inCloud} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)
