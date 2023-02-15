---
title: Azure Overview
sidebar_label: Overview
description:
  Overview of Azure Development using Frosti
---

## Packages / SDKs
Use the recommended [Azure SDKs](https://learn.microsoft.com/dotnet/api/overview/azure/?view=azure-dotnet) and Frosti will provision the optimal resources for the enviornment. 

i.e. `Microsoft.Azure.Cosmos`

## Service Connections
Frosti always provisions a managed identity and keyvault for secure communication between resources. 

1. Add these nuget packages via the CLI or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio)
```bash title="Bash / CLI"
dotnet add package Azure.Identity
dotnet add package Azure.Extensions.AspNetCore.Configuration.Secrets
```
2. Connect to KeyVault by adding the lines

```csharp title="Program.cs"
using Azure.Extensions.AspNetCore.Configuration.Secrets;
// more using References

//Add the following lines under the builder that already exists in Program.cs
var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddJsonFile("appsettings.frosti.json");
}

builder.Configuration.AddAzureKeyVault(new Uri(builder.Configuration["KV_ENDPOINT"]), new DefaultAzureCredential());
```
3. For local development: make sure you are logged into Visual Studio on the account that has access to the subscription used by Frosti to deploy resources.

4. Now just follow our docs for the a quick and secure connection onto the resources that were automatically created by frosti. 

## Frosti
Simply run `frosti provision` to create the dev infrastructure. Connect it using the methods mentioned in the service specific docs and you're all set.

When you're ready to go to Test or Prod enviornments. Create your CI/CD Pipeline using the frosti.yml file that was created when you ran frosti locally. 