---
title: Add Storage to ASP.NET web application
sidebar_label: Add Storage
description:
  This tutorial will walk through the process of updating an existing ASP.NET web application to connect with storage to store static content (images of inventory).
---

## Prerequisites
- Completed "Add Cosmos Db"

## Background
Cascade Brewing Co now has a site that shows off an up to date list of brews on tap; however, they don't want to just list the beers but show pictures of the beautiful brews. Let's add Azure Storage to store images of their inventory.

## Add the Package

Add the Microsoft.Azure.Storage.Blobs NuGet package to the .NET project. In Visual Studio, use the package manager or use the below command prompt with dotnet CLI. 

```bash title=".NET CLI"
dotnet add package Azure.Storage.Blobs
```

## Connecting to Storage

From the project directory, open the Program.cs file. In your editor, add a using directive for Microsoft.Azure.Cosmos.

```csharp title="Program.cs"
using Microsoft.Azure.Cosmos;
```

Define a new instance of the Blob Service Client and create a container.

```csharp title="Program.cs"
using Azure.Storage.Blobs;

// other code

// <storage_endpoint_key> 
// New instance of BlobServiceClient class using an endpoint and key string
var blobServiceClient = new BlobServiceClient(builder.Configuration["StorageConnection"]);
// </storage_endpoint_key>

// <create_container>
// New instance of Container class referencing the server-side container
builder.Services.AddSingleton(s =>
{
    return blobServiceClient;
});

// Create the container and return a container client object
string containerName = "brews98109";
BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);
builder.Services.AddSingleton(s =>
{
    return containerClient;
});
// </create_container>
```

## Frosti
Run `frosti provision`. This is all that's required to provision the storage infrastructure. The following steps demonstrate general Azure best practices for interacting with storage in your application code.

## Creating a Container

Now that we have the blobcontainerclient, let's create a container to store images. We'll create a new controller class called `ImageController`.

Let's define a method `GetBlob` that will create the container if it does not exist and return all images that are stored in the container if it exists.

``` csharp title="Controllers/ImageController.cs"
using System;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Options;
using System.Threading;

namespace CascadeBrewingCo.Controllers
{
    public class ImageController : Controller
    {
        private readonly ILogger<InventoryController> _logger;
        private readonly CosmosClient _cosmosClient;
        private readonly BlobContainerClient _containerClient;
        private readonly IConfiguration _configuration;

        public ImageController(ILogger<InventoryController> logger, CosmosClient cosmosClient, BlobContainerClient containerClient, IConfiguration configuration)
        {
            _logger = logger;
            _cosmosClient = cosmosClient;
            _containerClient = containerClient;
            _configuration = configuration;
        }


        public async Task<ActionResult> GetBlob()
        {
            //Create a unique name for the container
          
            await _containerClient.CreateIfNotExistsAsync(PublicAccessType.Blob);

            // Retreive blobs
            List<Uri> allBlobs = new List<Uri>();
            foreach (BlobItem blob in _containerClient.GetBlobs())
            {
                Console.WriteLine(blob.Name);
                if (blob.Properties.BlobType == BlobType.Block)
                    allBlobs.Add(_containerClient.GetBlobClient(blob.Name).Uri);
            }
            return View(allBlobs);

        }
        
    }
}
```

To display the images, let's create a new view.

``` csharp title="Views/Image/GetBlob.cshtml"
@model List<Uri>

@{
    ViewData["Title"] = "Images";
}

@if (Model != null && Model.Count > 0)
{
    foreach (var item in Model)
    {
        <div class="imageBlock">
            <a href="@item" target="_blank"><img class="thumb" src="@item" alt="images" /></a>
        </div>
    }
}
```

Finally, let's update the `_Layout` view to include a link in the header to this new view. Add a link to `Photos` that points to the Inventory controller and calls the `GetBlob` action.

``` csharp title="Views/Shared/_Layout.cshtml"
<li class="nav-item">
    <a class="nav-link text-dark" asp-area="" asp-controller="Image" asp-action="GetBlob">Photos</a>
</li>
```

## Final Result

Now customers can see the list of available Brews with images of each beer on tap.

![Cascade Brewing Co. Web App with Cosmos Db ](/img/docs/samples/StorageOnTap.png)

## Learn more about Cosmos Db CRUD Operations in .NET
Follow this tutorial [Quickstart: Azure Blob Storage client library for .NET](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-dotnet?tabs=visual-studio%2Cmanaged-identity%2Croles-azure-portal%2Csign-in-azure-cli%2Cidentity-visual-studio)