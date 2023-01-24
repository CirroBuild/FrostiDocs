export default [
  {
    comment: [
      "Deploy your .NET application to Azure",
    ],
    query: `
    brew install CirroBuild/tap/frosti
az login
frosti provision
    `,
  },


].map(({ comment, query }) => ({
  comment: comment.map((c) => `-- ${c}`).join("\n"),
  query: query.trim(),
}))
