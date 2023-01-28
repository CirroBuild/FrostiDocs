const visit = require("unist-util-visit")
const ssrTemplate = require("./src/internals/ssr.template")
const consts = require("./src/config/consts")
const customFields = require("./src/config/customFields")
const math = require("remark-math")
const katex = require("rehype-katex")

function variable() {
  const RE_VAR = /{@([\w-_]+)@}/g
  const getVariable = (full, partial) =>
    partial ? customFields[partial] : full

  function textVisitor(node) {
    node.value = node.value.replace(RE_VAR, getVariable)
  }

  function linkVisitor(node, vFile) {
    if (/^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?/.test(node.url)) {
      console.log(
        `Linking to ${node.url} is forbidden, changed URL text in ${vFile.path}`,
      )
      const { type, value, position } = node.children[0]
      delete node.title
      delete node.url
      delete node.children
      node.type = type
      node.value = value
      node.position = position
      return
    }

    node.url = node.url.replace(RE_VAR, getVariable)

    if (node.title) {
      node.title = node.title.replace(RE_VAR, getVariable)
    }
  }

  function transformer(ast, vFile) {
    visit(ast, "text", textVisitor)
    visit(ast, "code", textVisitor)
    visit(ast, "link", (node) => linkVisitor(node, vFile))
  }

  return transformer
}

const config = {
  title: "Frosti: Your virtual DevOps engineer",
  tagline: "Forget about the infrastructure, Frosti will take care of it.",
  url: `https://${consts.domain}`,
  baseUrl: "/",
  baseUrlIssueBanner: false,
  favicon: "/img/frosti.png",
  organizationName: "Frosti",
  projectName: "FrostiBuild",
  customFields: customFields,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  plugins: [
    require.resolve("./plugins/fetch-latest-release/index"),
    require.resolve("./plugins/fetch-repo/index"),
    require.resolve("./plugins/remote-repo-example/index"),
    require.resolve("./plugins/fetch-contributors-count/index"),
    require.resolve("./plugins/webpack-ts/index"),
    require.resolve("./plugins/optimize/index"),
    require.resolve("./plugins/manifest/index"),
    require.resolve("./plugins/delay-code-block-appearance"),
    [
      "@docusaurus/plugin-pwa",
      {
        pwaHead: [
          {
            tagName: "link",
            rel: "manifest",
            href: "/manifest.webmanifest",
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "#3EB79C",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-status-bar-style",
            content: "#21222c",
          },
        ],
      },
    ],
    [
      require.resolve("./plugins/blog"),
      {
        remarkPlugins: [variable, math],
        rehypePlugins: [katex],
        feedOptions: {
          type: "all",
          copyright: customFields.copyright,
        },
        showReadingTime: true,
        postsPerPage: 1000,
        blogPostComponent: require.resolve(
          "./src/theme/BlogPostPage/index.tsx",
        ),
        blogTagsPostsComponent: require.resolve(
          "./src/theme/BlogListPage/index.tsx",
        ),
      },
    ],
    ...[
      process.env.POSTHOG_API_KEY
        ? require.resolve("posthog-docusaurus/src/index.js")
        : null,
    ],
  ].filter(Boolean),
  themeConfig: {
    posthog: {
      apiKey: process.env.POSTHOG_API_KEY,
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    image: "/img/og.gif",
    gtag: {
      trackingID: "GTM-PVR7M2G",
      anonymizeIP: true,
    },
    prism: {
      defaultLanguage: "questdb-sql",
      additionalLanguages: [
        "rust",
        "csharp",
        "julia",
        "cpp",
        "java",
        "ebnf",
        "ini",
        "toml",
        "ruby",
        "php",
      ],
      theme: require("./src/internals/prism-github"),
      darkTheme: require("./src/internals/prism-dracula"),
    },
    algolia: {
      appId: "QL9L2YL7AQ",
      apiKey: "2f67aeacbe73ad08a49efb9214ea27f3",
      indexName: "questdb",
    },
    navbar: {
      title: " ",
      logo: {
        alt: "Frosti",
        src: "/img/frosti.svg",
      },
      items: [
        
        {
          label: "Docs",
          to: "/docs/",
          position: "left",
        },
        {
          label: "Blog",
          to: "/blog/",
          position: "left",
        },
        {
          label: "Frosti",
          href: "https://github.com/CirroBuild/frosti-bucket",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Product",
          items: [
            {
              label: "Cloud",
              to: "/cloud/",
            },
          ],
        },
        {
          title: "Developers",
          items: [
            {
              label: "Docs",
              to: "/docs/",
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              label: "About us",
              to: "/about-us/",
            },
          ],
        },
        {
          title: "Social",
          items: [
            {
              label: "GitHub",
              href: customFields.githubUrl,
            },
            {
              label: "StackOverflow",
              to: customFields.stackoverflowUrl,
            },
            {
              label: "Linkedin",
              href: customFields.linkedInUrl,
            },
            {
              label: "YouTube",
              to: customFields.videosUrl,
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        // blog is enabled through a custom plugin
        // ./plugins/blog/index.js
        blog: false,
        docs: {
          remarkPlugins: [variable, math],
          rehypePlugins: [katex],
          sidebarPath: require.resolve("./sidebars.js"),
        },

        sitemap: {
          changefreq: "daily",
          priority: 0.7,
          trailingSlash: true,
        },
        theme: {
          customCss: [
            require.resolve("./src/css/katex.min.css"),
            require.resolve("./src/css/_global.css"),
          ],
        },
      },
    ],
  ],
}

module.exports = {
  ...config,
  ssrTemplate: ssrTemplate(config),
}
