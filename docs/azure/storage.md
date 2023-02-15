---
title: Azure Storage
sidebar_label: Storage
description:
  Overview of Azure Storage using Frosti
---

## Blob Storage
### Packages / SDKs
Add the nuget package via the CLI or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio)
```bash title="Bash / CLI"
dotnet add package Azure.Storage.Blobs
```

### Usage
```csharp title="Example.cs"
using Azure.Storage.Blobs;

// other code

var blobClient = new BlobServiceClient(_configuration["StorageConnection"]);
var containerClient = blobClient.GetBlobContainerClient("your-blob-name");
var response = await containerClient.CreateIfNotExistsAsync();
```
Learn more about [Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-container-create) Operations

## Queues
### Packages / SDKs
Add the nuget package via the CLI or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio)
```bash title="Bash / CLI"
dotnet add package Azure.Storage.Queues
```

### Usage
```csharp title="Example.cs"
using Azure.Storage.Queues;

// other code

var queueClient = new QueueClient(_configuration["StorageConnection"], "your-queue-name");
await queueClient.CreateIfNotExistsAsync();
```
Learn more about [Queue Storage](https://learn.microsoft.com/en-us/azure/storage/queues/storage-dotnet-how-to-use-queues?tabs=dotnet) Operations

## Data Lake Gen 2
### Packages / SDKs
Add the nuget package via the CLI or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio)
```bash title="Bash / CLI"
dotnet add package Azure.Storage.Files.DataLake
```

### Usage
```csharp title="Example.cs"
using Azure.Storage.Files.DataLake;

// other code

var dataLakeClient = new DataLakeServiceClient(_configuration["StorageConnection"]);
await dataLakeClient.CreateFileSystemAsync("your-file-system");
```
Learn more about [Data Lake Gen2](https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-directory-file-acl-dotnet) Operations

## File Storage
### Packages / SDKs
Add the nuget package via the CLI or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio)
```bash title="Bash / CLI"
dotnet add package Azure.Storage.Files.Shares
```

### Usage
```csharp title="Example.cs"
using Azure.Storage.Files.Shares;

// other code

var share = new ShareClient(_configuration["StorageConnection"], "your-share-name");
await share.CreateIfNotExistsAsync();
```
Learn more about [Files Storage](https://learn.microsoft.com/en-us/azure/storage/files/storage-dotnet-how-to-use-files?tabs=dotnet) Operations

## Table Storage
### Packages / SDKs
Add the nuget package via the CLI or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio)
```bash title="Bash / CLI"
dotnet add package Azure.Data.Tables
```

### Usage
```csharp title="Example.cs"
using Azure.Data.Tables;

// other code

var tableClient = new TableServiceClient(_configuration["StorageConnection"]);
var table = tableClient.CreateTableIfNotExists("yourtablename");
```
Learn more about [Table Storage](https://learn.microsoft.com/dotnet/api/overview/azure/data.tables-readme?view=azure-dotnet) Operations