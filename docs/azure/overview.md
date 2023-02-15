---
title: Azure Overview
sidebar_label: Overview
description:
  Overview of Azure Development using Frosti
---

## Frosti
Run `frosti provision`. This is all that's required to provision the cosmos infrastructure. The following steps demonstrate general Azure best practices for creating Db's and containers in your application code.

## Packages / SDKs

Add the Microsoft.Azure.Cosmos NuGet package to the .NET project. In Visual Studio, use the package manager or use the below command prompt with dotnet CLI. 

```bash title=".NET CLI"
dotnet add package Microsoft.Azure.Cosmos
```

## Service Specific Connections

Keyvault, Managed Identity etc.

From the project directory, open the Program.cs file. In your editor, add a using directive for Microsoft.Azure.Cosmos.

```csharp title="Program.cs"
using Microsoft.Azure.Cosmos;
```

Define a new instance of the CosmosClient class using the constructor, and client.GetSecret() method to get the Cosmos Db connection string stored in the Key Vault referenced in the previous article.

```csharp title="Program.cs"
// New instance of CosmosClient class
var cosmosConnection = client.GetSecret("CosmosConnection").Value.Value;
builder.Services.AddSingleton(s =>
{
    return new CosmosClient(cosmosConnection);
});
```