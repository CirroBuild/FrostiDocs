---
title: Connect a Dotnet WebApp to Deployed Azure Services
sidebar_label: Easily Connect to Deployed Services
description:
  This document describes how to connect your application to the resources
  deployed in Azure for local testing.
---

## Configuration for Local Development Testing

1. Find the file **Dev.Keyvault.json** which got created in the directory where you ran the earlier command. Open the file and add it to the **appsettings.frosti.json** in your project. It should look like this "KV_Endpoint: "your_specific_keyvault" Consider adding **appsettings.local.json** to your .gitignore for a production facing app. 

2. add nuget pckg: Azure.Security.KeyVault.Secrets if its not there already

3. After the line var configuration = builder.Configuration; in Program.cs (or Startup.cs if it exists). Add the following lines: 

```csharp title="Program.cs"
if (builder.Environment.IsDevelopment())
{
    configuration.AddJsonFile("appsettings.frosti.json");
}

var options = new SecretClientOptions()
{
    Retry =
    {
        Delay= TimeSpan.FromSeconds(2),
        MaxDelay = TimeSpan.FromSeconds(16),
        MaxRetries = 5,
        Mode = RetryMode.Exponential
    }
};
var client = new SecretClient(new Uri(configuration["KV_ENDPOINT"]), new DefaultAzureCredential(), options);
```

4. Last thing. Add any service specific logic you need underneath the lines you just added. You can just copy paste it! See here to find out what to add and how to reference the services in your code with the azure sdks. Need using statement updates as well. For example, here's cosmos db: 

```csharp title="Program.cs"
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
Note:
SQLConnection is the KV secret for SQL
StorageConnection is the KV secret for Storage



