let guidelines

if (process.env.NODE_ENV === "development") {
  guidelines = {
    label: "Guidelines (DEV ONLY)",
    type: "category",
    items: [
      {
        type: "category",
        label: "Templates",
        items: [
          "__guidelines/template/guide",
          "__guidelines/template/function",
          "__guidelines/template/sql",
        ],
      },
      "__guidelines/naming-convention",
      "__guidelines/content-hierarchy",
      "__guidelines/lexicon",
      "__guidelines/markdown",
      "__guidelines/sql-code-blocks",
      "__guidelines/influences",
    ],
  }
}

module.exports = {
  docs: [
    {
      id: "introduction",
      type: "doc",
    },
    {
      label: "Get Started",
      type: "category",
      items: [
        "get-started/homebrew",
        "get-started/first-app",
      ],
    },
    {
      label: "Deployment",
      type: "category",
      items: [
        "deployment/azure",
      ],
    },
    {
      label: "Configure",
      type: "category",
      items: [
        "configure/connect",
      ],
    },
    {
      label: "Troubleshooting",
      type: "category",
      items: [
        "troubleshooting/faq",
      ],
    },
  ].filter(Boolean),
}
