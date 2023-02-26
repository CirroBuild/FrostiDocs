---
title: Add Cosmos Db to ASP.NET web application
sidebar_label: Add Cosmos Db
description:
  This tutorial will walk through the process of updating an existing ASP.NET web application to query from an Azure Cosmos Db.
---

This tutorial will demonstrate reading and writing from a db using a Cosmos Db account.

## Prerequisites
- Completed "Create .NET Web App"

## Background

Cascade Brewing Co has a wide selection of brews from Belgian Goldens to Imperial Stouts. CB would like to add an "On Tap" section to show off which brews are currently available. They will store this information in Cosmos Db and create a new tab in the .NET application to query and display the results. 

## Add the package

Add the Microsoft.Azure.Cosmos NuGet package to the .NET project. In Visual Studio, use the package manager or use the below command prompt with dotnet CLI. 

```bash title=".NET CLI"
dotnet add package Microsoft.Azure.Cosmos
```

## Connect to Cosmos Db Account

From the project directory, open the Program.cs file. In your editor, add a using directive for Microsoft.Azure.Cosmos.

```csharp title="Program.cs"
using Microsoft.Azure.Cosmos;
```

Define a new instance of the CosmosClient class using the constructor, and client.GetSecret() method to get the Cosmos Db connection string stored in the Key Vault referenced in the previous article.

```csharp title="Program.cs"
// <endpoint_key> 
// New instance of CosmosClient class using an endpoint and key string
var client = new CosmosClient(builder.Configuration["CosmosConnection"]);
builder.Services.AddSingleton(s =>
{
    return client;
});
// </endpoint_key>

```

## Create a Cosmos Db

Below the Cosmos Client creation, create a database and container to store the beer inventory.

```csharp title="Program.cs"
// <create_database>
// New instance of Database class referencing the server-side database
var databaseResponse = await client.CreateDatabaseIfNotExistsAsync("CascadeBrewsDb");
// </create_database>

// <create_container>
// New instance of Container class referencing the server-side container
var container = await databaseResponse.Database.CreateContainerIfNotExistsAsync(
    id: "brews",
    partitionKeyPath: "/categoryId",
    throughput: 400
);
// </create_container>
```



## Frosti
Run `frosti provision`. This is all that's required to provision the cosmos infrastructure. Frosti will see the reference to Cosmos Db and provision an account in your subscription. 

The following steps will demonstrate general Cosmos Db patterns for interacting with the created container.

## Create a Model and Initialize Data

So far we have created a database named "CascadeBrewsDb" with a container named "Brews". The Brews table is designed to contain product details such as name, category, quantity, and a sale indicator. Each product also contains a unique identifier.

Let's create a model to define this information. Create a new class in the models folder called "Product.cs".

```csharp title="Models/Product.cs"
using System;
using Newtonsoft.Json;

namespace CascadeBrewingCo.Models
{
    // C# record representing an item in the container
    public record Product(
        string id,
        string categoryId,
        string categoryName,
        string name,
        int quantity,
        bool sale
    );
}

```

Then create a new class in the controllers folder to create our first entry.

```csharp title="Controllers/InventoryController.cs"
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CascadeBrewingCo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using Microsoft.VisualBasic;
using Newtonsoft.Json;


namespace CascadeBrewingCo.Controllers
{
	public class InventoryController
	{
        private readonly ILogger<InventoryController> _logger;
        private readonly CosmosClient _cosmosClient;

        public InventoryController(ILogger<InventoryController> logger, CosmosClient cosmosClient)
		{
            _logger = logger;
            _cosmosClient = cosmosClient;
        }

        public async Task AddInventory()
        {
            var container = _cosmosClient.GetContainer("CascadeBrewsDb", "brews");
            // Create new object and upsert (create or replace) to container
            Product newItem = new(
                id: "70b63682-b93a-4c77-aad2-65501347265f",
                categoryId: "61dba35b-4f02-45c5-b648-c6badc0cbd79",
                categoryName: "Beer",
                name: "Steep and Deep IPA",
                quantity: 12,
                sale: false
            );

            Product createdItem = await container.CreateItemAsync<Product>(newItem);

            Console.WriteLine($"Created item:\t{createdItem.id}\t[{createdItem.categoryName}]");
        }
	}
}
```

## Query Data

Now that we have the beer inventory loaded in Cosmos Db, let's query them and display under a new tab in the website. First, let's define a new method to query the cosmos db and retrieve all entries in the "brews" container.

``` csharp title="Controllers/InventoryController.cs"
        [HttpGet]
        public async Task<IActionResult> GetInventory()
        {
            var container = _cosmosClient.GetContainer("CascadeBrewsDb", "brews");
            try
            {
                // Create query using a SQL string and parameters
                var query = new QueryDefinition(
                    query: "SELECT * FROM c"
                );

                using FeedIterator<Product> feed = container.GetItemQueryIterator<Product>(
                    queryDefinition: query
                );
                List<Product> products = new List<Product>();
                while (feed.HasMoreResults)
                {
                    FeedResponse<Product> response = await feed.ReadNextAsync();
                    foreach (Product item in response)
                    {
                        products.Add(item);
                        Console.WriteLine($"Found item:\t{item.name}");
                    }
                }
                
                return View(products);
            }
            catch
            {
                throw new Exception($"No Brews Today");
            }

        }


```

Next let's create a new View to display this data.

``` csharp title="Views/Inventory/GetInventory.cshtml"
@model List<CascadeBrewingCo.Models.Product>

@{
    ViewData["Title"] = "Brews On Tap";
}
<h1>@ViewData["Title"]</h1>


@foreach (var item in Model)
{
    <li>@item.name</li>
}
```

Let's update the `_Layout` view to include a link in the header to this new view. Add a link to `On Tap` that points to the Inventory controller and calls the `GetInventory` action.

``` csharp title="Views/Shared/_Layout.cshtml"
                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <a class="nav-link text-dark" asp-area="" asp-controller="Home" asp-action="Index">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" asp-area="" asp-controller="Inventory" asp-action="GetInventory">On Tap</a>
                        </li>
                    </ul>
                </div>
```

In Visual Studio, press the `Play` button to build the solution. This will launch the application in your browser (localhost:7090). Navigate to the localhost:7090/inventory/addinventory to execute the above code and add an entry in the db.

## Final Result

Now customers can see the list of available Brews with an updated online list of beer on tap.

![Cascade Brewing Co. Web App with Cosmos Db ](/img/docs/samples/CosmosOnTap.png)


## Learn more about Cosmos Db CRUD Operations in .NET
Follow this tutorial [Azure SQL How To: Connect and Query Dotnet Visual Studio](https://learn.microsoft.com/en-us/azure/azure-sql/database/connect-query-dotnet-visual-studio?view=azuresql)