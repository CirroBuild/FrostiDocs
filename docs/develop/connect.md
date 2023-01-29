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

2. Add the Azure.Security.KeyVault.Secrets and Azure.Identity NuGet packages to the .NET project. In Visual Studio, use the package manager or use the below command prompts with dotnet CLI. 

```bash title=".NET CLI"
dotnet add package Azure.Security.KeyVault.Secrets
dotnet add package Azure.Identity
```

3. From the project directory, open the Program.cs file. In your editor, add a using directive for Azure.Security.KeyVault.Secrets and Azure.Identity.

```csharp title="Program.cs"
using Azure.Security.KeyVault.Secrets;
using Azure.Identity;
```

3. In Program.cs (or Startup.cs if it exists). Add the following code below the line where builder is defined: 

```csharp title="Program.cs"
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddJsonFile("appsettings.frosti.json");
}

var client = new SecretClient(new Uri(builder.Configuration["KV_ENDPOINT"]), new DefaultAzureCredential());
```

4. Navigate to the **root** directory of your project and run the provision command. This will prompt you with a list of services that will be provisioned for you. 

```bash
frosti provision
```

5. See subsequent articles to add service specific logic. For example, updating client to reference connection string in Key Vault referenced above.

Note:
SQLConnection is the KV secret for SQL
StorageConnection is the KV secret for Storage



