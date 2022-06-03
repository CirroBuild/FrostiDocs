import React from "react"
import type { Props as BlogPostItemProps } from "@theme/BlogPostItem"
import { Chip } from "../Chip"
import styles from "./styles.module.css"

export const ListItem = ({
  content,
}: {
  content: Omit<BlogPostItemProps, "children">
}) => {
  const tag = content.metadata.tags[0] ?? {}

  const imageUrl = content.frontMatter.image ?? "/img/tutorial/placeholder.png"

  return (
    <a href={content.metadata.permalink} className={styles.root}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <div className={styles.content}>
        <div className={styles.tags}>
          <Chip
            label={tag.label}
            permalink={tag.permalink}
            skin="secondary"
            size="small"
          />
        </div>

        <h3 className={styles.title}>
          <a href={content.metadata.permalink}>{content.metadata.title}</a>
        </h3>
        <div className={styles.author}>
          by {content.frontMatter.author} on {content.metadata.formattedDate}
        </div>
      </div>
    </a>
  )
}
