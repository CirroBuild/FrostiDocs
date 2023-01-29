import React from "react"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import BlogListPaginator from "@theme/BlogListPaginator"
import type { FrontMatter as OriginalFrontMatter } from "@theme/BlogPostPage"
import type { Props } from "@theme/BlogListPage"
import type { Tag } from "@theme/BlogTagsListPage"
import { ThemeClassNames } from "@docusaurus/theme-common"

import styles from "./styles.module.css"
import { ListItem } from "./ListItem"


export type FrontMatter = OriginalFrontMatter & { permalink?: string }




function BlogListPage(props: Props): JSX.Element {
  const { metadata, items } = props
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext()
  const { blogDescription, blogTitle, permalink } = metadata
  const isBlogOnlyMode = permalink === "/"
  const isTagsPage =
    typeof ((metadata as unknown) as Tag).allTagsPath !== "undefined"
  const title = isBlogOnlyMode ? siteTitle : blogTitle

  const posts = [...items]
  
  return (
    <Layout
      title={title}
      description={blogDescription}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogListPage}
      searchMetadatas={{
        // assign unique search tag to exclude this page from search results!
        tag: "blog_posts_list",
      }}
    >
      <main className={styles.root}>
      
        <h2>
          {isTagsPage
            ? `Articles tagged with "${((metadata as unknown) as Tag).name}"`
            : "Blog Posts"}
        </h2>

        <div className={styles.posts}>
          {posts.map(({ content }, i) => (
            <ListItem
              key={content.metadata.permalink}
              content={content}
              belowFold={i > 5}
              forcedTag={
                isTagsPage
                  ? {
                      label: ((metadata as unknown) as Tag).name,
                      permalink: metadata.permalink,
                    }
                  : undefined
              }
            />
          ))}

        </div>

        <BlogListPaginator metadata={metadata} />
      </main>
    </Layout>
  )
}

export default BlogListPage
