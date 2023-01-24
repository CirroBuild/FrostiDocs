---
title: Connect ASP.NET App to Other Azure Services
sidebar_label: Connect Other Azure Services
description:
  This document describes how to connect your application to the resources
  deployed in Azure for local testing.
---

## Prerequisites
- Run "frosti provision" command atleast once

## Configuration of Connection Strings for Local Development Testing

1. Find the file **Dev.frosti.json** which got created in the directory where you ran the **Frosti provision** command. Open the file and see the KeyVault endpoint created ("KV_Endpoint: "your_specific_keyvault"). Consider adding **appsettings.local.json** to your .gitignore for a production facing app. 

2. Open program.c and add nuget pckg: Azure.Security.KeyVault.Secrets if its not there already

3. In Program.cs (or Startup.cs if it exists). Add the following lines: 

```csharp title="Program.cs"
if (builder.Environment.IsDevelopment())
{
    builder.configuration.AddJsonFile("appsettings.frosti.json");
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
var client = new SecretClient(new Uri(builder.configuration["KV_ENDPOINT"]), new DefaultAzureCredential(), options);
```

4. See subsequent articles to add service specific logic. For example, updating client to reference connection string in Key Vault referenced above.

Note:
SQLConnection is the KV secret for SQL
StorageConnection is the KV secret for Storage



