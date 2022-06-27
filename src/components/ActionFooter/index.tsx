import footerCss from "./footer.module.css"
import ActionCard from "../ActionCard"
import FossIcon from "./foss.svg"
import customFields from "../../config/customFields"
import SubscribeIcon from "./subscribeIcon.svg"
import Subscribe from "../Subscribe"
import React from "react"

export const ActionFooter = () => (
  <div className={footerCss.cards}>
    <ActionCard
      icon={<FossIcon />}
      title="Join our developer community"
      description="QuestDB is open source. Follow us on Twitter, star our GitHub repo, and join our developer community on Slack!"
    >
      <a
        className={footerCss.card__link}
        href={customFields.githubUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        Go to GitHub&nbsp;&nbsp;&gt;
      </a>
      <a className={footerCss.card__link} href={customFields.slackUrl}>
        Join Slack&nbsp;&nbsp;&gt;
      </a>
    </ActionCard>

    <ActionCard
      title="Subscribe to our newsletter"
      description="Stay up to date with all things QuestDB"
      icon={<SubscribeIcon />}
      skin="primary"
    >
      <Subscribe
        placeholder="Email address"
        submitButtonVariant="tertiary"
        provider="newsletter"
      />
    </ActionCard>
  </div>
)
