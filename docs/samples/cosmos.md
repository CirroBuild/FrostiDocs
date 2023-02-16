---
title: Add Cosmos Db to ASP.NET web application
sidebar_label: Add Cosmos Db
description:
  This tutorial will walk through the process of updating an existing ASP.NET web application to query from an Azure Cosmos Db.
---

This tutorial will demonstrate reading and writing from a db using a Cosmos Db account.

## Prerequisites
- Completed "Create .NET Web App"

## Add the package

Add the Microsoft.Azure.Cosmos NuGet package to the .NET project. In Visual Studio, use the package manager or use the below command prompt with dotnet CLI. 

```bash title=".NET CLI"
dotnet add package Microsoft.Azure.Cosmos
```

## Connect to Cosmos and Create a Database

From the project directory, open the Program.cs file. In your editor, add a using directive for Microsoft.Azure.Cosmos.

```csharp title="Program.cs"
using Microsoft.Azure.Cosmos;
```

Define a new instance of the CosmosClient class using the constructor, and client.GetSecret() method to get the Cosmos Db connection string stored in the Key Vault referenced in the previous article.

```csharp title="Program.cs"
//Add the following lines under the Azure Key Vault configuration added in the previous tutorial

var client = new CosmosClient(builder.Configuration["CosmosConnection"]);
await client.CreateDatabaseIfNotExistsAsync("CascadeBrewsDb");
builder.Services.AddSingleton(s =>
{
    return client;
});
```
## Frosti
Run `frosti provision`. This is all that's required to provision the cosmos infrastructure. The following steps demonstrate general Azure best practices for creating Db's and containers in your application code.

## Sample to Create and Query the database
The sample code described in this article creates a database named "CascadeBrewsDb" with a container named "Brews". The Brews table is designed to contain product details such as name, category, quantity, and a sale indicator. Each product also contains a unique identifier.



## Learn more about Cosmos Db CRUD Operations in .NET
Follow this tutorial [Azure SQL How To: Connect and Query Dotnet Visual Studio](https://learn.microsoft.com/en-us/azure/azure-sql/database/connect-query-dotnet-visual-studio?view=azuresql)