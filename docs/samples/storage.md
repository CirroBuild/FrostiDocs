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

var blobClient = new BlobServiceClient(_configuration["StorageConnection"]);
var containerClient = blobClient.GetBlobContainerClient("your-blob-name");
var response = await containerClient.CreateIfNotExistsAsync();
```

## Frosti
Run `frosti provision`. This is all that's required to provision the storage infrastructure. The following steps demonstrate general Azure best practices for interacting with storage in your application code.

## Learn more about Cosmos Db CRUD Operations in .NET
Follow this tutorial [Quickstart: Azure Blob Storage client library for .NET](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-dotnet?tabs=visual-studio%2Cmanaged-identity%2Croles-azure-portal%2Csign-in-azure-cli%2Cidentity-visual-studio)