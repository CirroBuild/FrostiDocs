---
title: Connect ASP.NET App to Other Azure Services
sidebar_label: Connect to Azure Services
description:
  This document describes how to connect your application to the resources
  deployed in Azure for local testing.
---

## Connecting other services via KeyVault

1. On the terminal, navigate to the **root** directory of your project. Run `frosti provision -s [YOUR_SUB_ID]`.

2. Add the Azure.Security.KeyVault.Secrets and Azure.Identity NuGet packages to the .NET project. In Visual Studio, use the package manager or use the below command prompts with dotnet CLI. 

```bash title=".NET CLI"
dotnet add package Azure.Security.KeyVault.Secrets
dotnet add package Azure.Identity
```

3. From the project directory, open the Program.cs file. In your editor, add a using directive for Azure.Security.KeyVault.Secrets and Azure.Identity at the top of the file.

```csharp title="Program.cs"
using Azure.Security.KeyVault.Secrets;
using Azure.Identity;
```

4. In Program.cs. Add the following code under the line begginig with `var builder = ...`

```csharp title="Program.cs"
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddJsonFile("appsettings.frosti.json");
}

var client = new SecretClient(new Uri(builder.Configuration["KV_ENDPOINT"]), new DefaultAzureCredential());
```

6. Run `frosti provision` from the **root** directory again.

7. See subsequent articles to add service specific logic. For example, the next article show how to connect to cosmos in just a couple lines.



