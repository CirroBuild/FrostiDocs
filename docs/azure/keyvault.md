---
title: Azure KeyVault
sidebar_label: KeyVault
description:
  Overview of Azure KeyVault using Frosti
---

## Packages / SDKs
Add these nuget packages via the CLI or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio)
```bash title="Bash / CLI"
dotnet add package Azure.Extensions.AspNetCore.Configuration.Secrets
```

## Connecting to KeyVault
```csharp title="Program.cs"
using Azure.Extensions.AspNetCore.Configuration.Secrets;
// more using references

//Add the following lines under the var builder... line that already exists in Program.cs
var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddJsonFile("appsettings.frosti.json");
}

builder.Configuration.AddAzureKeyVault(
    new Uri(builder.Configuration["KV_ENDPOINT"]), 
    new DefaultAzureCredential());
```

## Usage
Interact with KeyVault using the IConfiguration and DependencyInjection.

By adding `AddAzureKeyVault...` in Program.cs, you've linked the KeyVault to the IConfiguration, so now a lookup in IConfiguration also looks up the secret in KeyVault.

Example: `var secretValue = _configuration["YOUR_SECRET_NAME"];`