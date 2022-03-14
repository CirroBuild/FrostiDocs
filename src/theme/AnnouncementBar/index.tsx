import React from "react"

import useUserPreferencesContext from "@theme/hooks/useUserPreferencesContext"

import customFields from "../../config/customFields"

import styles from "./styles.module.css"

const AnnouncementBar = () => {
  const {
    isAnnouncementBarClosed,
    closeAnnouncementBar,
  } = useUserPreferencesContext()

  if (isAnnouncementBarClosed) {
    return null
  }

  return (
    <div className={styles.announcement} role="banner">
      <p className={styles.announcement__content}>
        Join our QuestDB meetup on the 17th of March!&nbsp;
        <a
          className={styles.announcement__link}
          href={customFields.meetupCalendarUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Add the event to your calendar
        </a>
        &nbsp;📅
      </p>

      <button
        aria-label="Close"
        className={styles.announcement__close}
        onClick={closeAnnouncementBar}
        type="button"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export default AnnouncementBar
