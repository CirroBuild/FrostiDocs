import React from "react"
import type { Props as BlogPostItemProps } from "@theme/BlogPostItem"
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
          <a href={tag.permalink} className={styles.tag}>
            {tag.label}
          </a>
        </div>

        <h3 className={styles.title}>
          <a href={content.metadata.permalink}>{content.metadata.title}</a>
        </h3>
        <div className={styles.author}>{content.frontMatter.author}</div>
      </div>
    </a>
  )
}
