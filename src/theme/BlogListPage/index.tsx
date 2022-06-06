import React from "react"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { usePluginData } from "@docusaurus/useGlobalData"
import Layout from "@theme/Layout"
import BlogPostItem from "@theme/BlogPostItem"
import BlogListPaginator from "@theme/BlogListPaginator"
import type { Props } from "@theme/BlogListPage"
import type { Tag } from "@theme/BlogTagsListPage"
import { ThemeClassNames } from "@docusaurus/theme-common"

import styles from "./styles.module.css"
import { ListItem } from "./ListItem"
import { Categories } from "./Categories"
import type { Props as CategoriesProps } from "./Categories"
import { Chips } from "./Chips"

const categories: CategoriesProps["categories"] = [
  {
    title: "Tutorials",
    description:
      "Step-by-step toturials and guides for developers to build time series applications",
    url: "/tutorial",
  },
  {
    title: "Engineering",
    description:
      "Updates about QuestDB releases, introduction of new features, and engineering stories",
    url: "/blog/tags/engineering",
  },
  {
    title: "User Stories",
    description:
      "How our users from various industries implement QuestDB in thier projects",
    url: "/customers",
  },
  {
    title: "Company",
    description: "News and annoucements related to the company behind QuestDB",
    url: "/blog/tags/questdb",
  },
]

function BlogListPage(props: Props): JSX.Element {
  const { metadata, items } = props
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext()
  const { tags } = usePluginData<{
    tags: {
      [key: string]: { name: string; permalink: string; items: string[] }
    }
  }>("docusaurus-plugin-content-blog")

  const sortedTags = Object.values(tags)
    .filter((tag) => categories.every(({ url }) => url !== tag.permalink))
    .sort((a, b) => b.items.length - a.items.length)
    .slice(0, 7)
  const { blogDescription, blogTitle, permalink } = metadata
  const isBlogOnlyMode = permalink === "/"
  const title = isBlogOnlyMode ? siteTitle : blogTitle

  const posts = [...items]
  const latestPost = metadata.page === 1 ? posts.shift() : undefined

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
        {latestPost !== undefined && (
          <div className={styles.latestPost}>
            <BlogPostItem
              key={latestPost.content.metadata.permalink}
              frontMatter={latestPost.content.frontMatter}
              metadata={{ ...latestPost.content.metadata, tags: [] }}
              truncated={latestPost.content.metadata.truncated}
            >
              {React.createElement(latestPost.content)}
            </BlogPostItem>
          </div>
        )}

        <h2>Popular topics</h2>
        {/* BlogListPage component is used for blog and for tags.
                When rendered for tags, then `metadata` includes tag, instead of blog data */}
        <Categories
          activeCategory={((metadata as unknown) as Tag).permalink}
          categories={categories}
        />
        <Chips
          activeChip={((metadata as unknown) as Tag).permalink}
          items={sortedTags}
        />

        <h2>Blog posts</h2>
        <div className={styles.posts}>
          {posts.map(({ content }) => (
            <ListItem key={content.metadata.permalink} content={content} />
          ))}
        </div>

        <BlogListPaginator metadata={metadata} />
      </main>
    </Layout>
  )
}

export default BlogListPage
