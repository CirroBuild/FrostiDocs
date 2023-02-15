---
title: Application Insights
sidebar_label: App Insights
description:
  Overview of Azure Application Insights using Frosti
---

## Packages / SDKs
Add these nuget packages via the CLI or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio)
```bash title="Bash / CLI"
dotnet add package Microsoft.ApplicationInsights.AspNetCore
```

## Connecting to App Insights
```csharp title="Program.cs"
using Microsoft.ApplicationInsights.AspNetCore.Extensions;

// more code here
// more code

//Add the following lines under the add keyvault reference that you should already have in Program.cs
builder.Configuration.AddAzureKeyVault(
    new Uri(builder.Configuration["KV_ENDPOINT"]), 
    new DefaultAzureCredential());

builder.Services.AddApplicationInsightsTelemetry(
    new ApplicationInsightsServiceOptions 
    { 
        ConnectionString = builder.Configuration["AIConnection"] 
    });
```

## Usage
Interact with App Insights using the ILogger and DependencyInjection.

By adding `AddApplicationInsightsTelemetry...` in Program.cs, you've linked the AppInsights to the ILogger, so now usage of your ILogger will show up in AppInsights.

Example: `_logger.LogError("Testing AI");`