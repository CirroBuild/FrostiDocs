export default [
  {
    comment: [
      "Deploy your .NET application to Azure",
    ],
    query: `
frosti provision

Completed Interpretting
Using subscription: 8850fa2d-9n45-446e-81ce-9824bd59gk04
Services to be provisioned: Managed Identity (required), Keyvault (required), Cosmos
Is this correct? (Y/n)
Y
Deploying the Global Resources. This may take a while.
Deploying the eastus Resources. This may take a while.
Completed Linking

    `,
  },


].map(({ comment, query }) => ({
  comment: comment.map((c) => `-- ${c}`).join("\n"),
  query: query.trim(),
}))
