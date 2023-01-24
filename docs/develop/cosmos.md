---
title: Add Azure Cosmos Db to ASP.NET web application
sidebar_label: Cosmos Db
description:
  This tutorial will walk through the process of updating an existing ASP.NET web application that uses placeholder data to instead query from the API.
---

The goal of this guide is to to update an existing ASP.NET web application to query data from CosmosDb API.

Frosti will provision a cosmos db account in your subscription if your program references a cosmos db creation as demonstrated below (and as documented in Azure Docs)

The sample code described in this article creates a database named cosmicworks with a container named products. The products table is designed to contain product details such as name, category, quantity, and a sale indicator. Each product also contains a unique identifier.

For this sample code, the container will use the category as a logical partition key.

## Prerequisites
- Completed "Connect Other Azure Resources"
- .NET 7 

## Install the package

Add the Microsoft.Azure.Cosmos NuGet package to the .NET project. Use the dotnet add package command specifying the name of the NuGet package.

```bash title=".NET CLI"
dotnet add package Microsoft.Azure.Cosmos
```
Build the project with the dotnet build command.

```bash title=".NET CLI"
dotnet build
```
## Authenticate the Client

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
    CosmosClientOptions cosmosClientOptions = new CosmosClientOptions
    {
        MaxRetryAttemptsOnRateLimitedRequests = 3,
        MaxRetryWaitTimeOnRateLimitedRequests = TimeSpan.FromSeconds(60)
    };
    return new CosmosClient(cosmosConnection);
});
```

## Create and Query the database

### Create a database
Next you'll create a database and container to store products, and perform queries to insert and read those items.

Use the CosmosClient.CreateDatabaseIfNotExistsAsync method to create a new database if it doesn't already exist. This method will return a reference to the existing or newly created database.
```csharp title="Program.cs"

// New instance of Database class referencing the server-side database
Database database = await cosmosConnection.CreateDatabaseIfNotExistsAsync(
    id: "cosmicworks"
);

Console.WriteLine($"New database:\t{database.Id}");
```

### Create a container
The Database.CreateContainerIfNotExistsAsync will create a new container if it doesn't already exist. This method will also return a reference to the container.

```csharp title="Program.cs"
// Container reference with creation if it does not alredy exist
Container container = await database.CreateContainerIfNotExistsAsync(
    id: "products",
    partitionKeyPath: "/categoryId",
    throughput: 400
);

Console.WriteLine($"New container:\t{container.Id}");
```

## Learn more about Cosmos Db CRUD Operations in .NET
Follow this tutorial [Quickstart: Azure Cosmos DB for NoSQL client library for .NET](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/quickstart-dotnet?tabs=azure-cli%2Cwindows%2Cconnection-string%2Csign-in-azure-cli)

## Provision a CosmosDb Account
1. Run Frosti provision

```bash 
frosti provision 
```

## Additional Resources 
TO DO Check:
- Cosmos Db Tutorial [Cosmos Tutorial](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/quickstart-dotnet?tabs=azure-cli%2Cwindows%2Cpasswordless%2Csign-in-azure-cli)
- Cosmos Create If Not Exist Method [Create if not exist](https://learn.microsoft.com/en-us/dotnet/api/microsoft.azure.cosmos.cosmosclient.createdatabaseifnotexistsasync?view=azure-dotnet)
