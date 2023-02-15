---
title: Azure Cosmos Db
sidebar_label: Cosmos Db
description:
  Overview of Azure Cosmos Db using Frosti
---

## Packages / SDKs
Add these nuget packages via the CLI or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio)
```bash title="Bash / CLI"
dotnet add package Microsoft.Azure.Cosmos
```

## Connecting to CosmosDb
```csharp title="Program.cs"
using Microsoft.Azure.Cosmos;

// other code

//Add the following lines under the add keyvault reference that you should already have in Program.cs
builder.Configuration.AddAzureKeyVault(
    new Uri(builder.Configuration["KV_ENDPOINT"]), 
    new DefaultAzureCredential());

builder.Services.AddSingleton(s =>
{
    return new CosmosClient(builder.Configuration["CosmosConnection"]);
});
```

## Usage
Interact with Cosmos using the CosmosClient and DependencyInjection.

Example: `_cosmosClient.CreateDatabaseIfNotExistsAsync("sampleDatabase");`

Learn more about Cosmos Db Operations in .NET [Quickstart: Azure Cosmos DB for NoSQL client library for .NET](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/quickstart-dotnet?tabs=azure-cli%2Cwindows%2Cconnection-string%2Csign-in-azure-cli)