---
title: Add SQL Db to ASP.NET web application
sidebar_label: Add SQL Db
description:
  This tutorial will walk through the process of updating an existing ASP.NET web application that uses placeholder data to instead query from the API.
---

## Prerequisites
- Completed "Connect Other Azure Resources"

## Add the package

Add the Microsoft.Azure.Cosmos NuGet package to the .NET project. In Visual Studio, use the package manager or use the below command prompt with dotnet CLI. 

```bash title=".NET CLI"
dotnet add package Microsoft.Azure.Cosmos
```

## Connecting to Cosmos

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

## Frosti
Run `frosti provision`. This is all that's required to provision the cosmos infrastructure. The following steps demonstrate general Azure best practices for creating Db's and containers in your application code.

## Optional: Sample to Create and Query the database
The sample code described in this article creates a database named "cosmicworks" with a container named "products". The products table is designed to contain product details such as name, category, quantity, and a sale indicator. Each product also contains a unique identifier.

For this sample code, the container will use the "category" as a logical partition key.

### Create a database
We'll create a database and container to store products within the HomeController, and perform queries to insert and read those items. In order to initialize the database, you would go to `/home/initializedatabase`. This is just an example, this should most likely be done in app start.

1. See the `InitializeDatabase` function. Use the CreateDatabaseIfNotExistsAsync method to create a new database if it doesn't already exist. This method will return a reference to the existing or newly created database.

2. Create a container via the `CreateContainerIfNotExistsAsync` function.

```csharp title="HomeController.cs"

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly CosmosClient _cosmosClient;

    public HomeController(ILogger<HomeController> logger, CosmosClient cosmosClient)
    {
        _logger = logger;
        _cosmosClient = cosmosClient;
    }

    public IActionResult Index()
    {
        return View();
    }

    public async Task<HttpStatusCode> InitializeDatabase()
    {
        var dbResp = await _cosmosClient.CreateDatabaseIfNotExistsAsync("cosmicworks");
        var containerResp = await dbResp.Database.CreateContainerIfNotExistsAsync("products", "/category");
        return containerResp.StatusCode;
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

```

## Learn more about Cosmos Db CRUD Operations in .NET
Follow this tutorial [Quickstart: Azure Cosmos DB for NoSQL client library for .NET](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/quickstart-dotnet?tabs=azure-cli%2Cwindows%2Cconnection-string%2Csign-in-azure-cli)