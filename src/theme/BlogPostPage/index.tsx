import React from "react"
import { ThemeClassNames } from "@docusaurus/theme-common"
import BlogPostItem from "@theme/BlogPostItem"
import type { Props } from "@theme/BlogPostPage"
import BlogPostPaginator from "@theme/BlogPostPaginator"
import BlogSidebar from "@theme/BlogSidebar"
import EditThisPage from "@theme/EditThisPage"
import Layout from "@theme/Layout"
import Toc from "@theme/TOC"


function BlogPostPage(props: Props): JSX.Element {
  const { content: BlogPostContents, sidebar } = props
  const { frontMatter, metadata } = BlogPostContents
  const { title, description, nextItem, prevItem, editUrl } = metadata
  const { hide_table_of_contents: hideTableOfContents } = frontMatter

  return (
    <Layout
      title={title}
      description={description}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogPostPage}
    >
      {BlogPostContents != null && (
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--3">
              <BlogSidebar sidebar={sidebar} />
            </div>
            <main className="col col--7">
              <BlogPostItem
                frontMatter={frontMatter}
                metadata={metadata}
                isBlogPostPage
              >
                <BlogPostContents />
              </BlogPostItem>
              <div>
                {typeof editUrl === "string" && (
                  <EditThisPage editUrl={editUrl} />
                )}
              </div>
              {(nextItem != null || prevItem != null) && (
                <div className="margin-vert--xl">
                  <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
                </div>
              )}
            </main>

            {typeof hideTableOfContents === "boolean" &&
              !hideTableOfContents &&
              BlogPostContents.toc && (
                <div className="col col--2">
                  <Toc toc={BlogPostContents.toc} />
                </div>
              )}
          </div>
        </div>
      )}


    </Layout>
  )
}

export default BlogPostPage
