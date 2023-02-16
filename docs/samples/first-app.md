---
title: Create My First Cloud Application
sidebar_label: Create .NET Web App
description:
  This document shows how to launch a starter application to test Frosti.
---

This tutorial will demonstrate building a basic company site using an ASP.NET web application.

## Prerequisites
- [Visual Studio](https://visualstudio.microsoft.com/downloads/)
- The .NET SDK (usually automatically included when Visual Studio installed)
- Install [Frosti](/docs/get-started/homebrew)
- Intall Az CLI 

## Background

Cascade Brewing Co is a craft brewery based out of Seattle, WA. As they set their eyes on expanding nationally, they have decided to revitalize their online presence. To compete with the larger players in the national market, they decided to adopt Azure as their public cloud. This will enable them to build a robust and scalable e-commerce site. They decided to start with a simple .NET Web Applicaiton to build their brand. 

This tutorial will document how Cascade Brewing Co built their landing site.

## Create an ASP.NET web app

1. Open Visual Studio, select ***New*** and search ***Web Application***
2. Select ***Web Application (Model-View-Controller)*** 

## Edit Default View and Deploy Dev Environment
1. Navigate to ***Views/Home/Index.cshtml*** edit the default heading to Cascade Brewing Co

```html title="index.cshtml"
@{
    ViewData["Title"] = "Home Page";
}

<div class="text-center">
    <h1 class="display-4">Cascade Brewing Co</h1>
</div>
```

2. Press the play button to see the application launch and view in localhost

3. Navigate to the **root** directory of your project on the terminal and run `frosti provision`.

## Ready Application to Connect to Azure Services

Frosti always provisions a managed identity and keyvault for secure communication between resources. 

1. Add these nuget packages via the CLI or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio)
```bash title="Bash / CLI"
dotnet add package Azure.Identity
dotnet add package Azure.Extensions.AspNetCore.Configuration.Secrets
```
2. Connect to KeyVault by adding the lines

```csharp title="Program.cs"
using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Azure.Identity
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

## Create Pipeline for Test Environment

1. When you are ready to push your project to a preproduction or production enviornment. Go to [Azure DevOps](https://dev.azure.com) and create a project if you don't have one already.

2. Go to `Repos` in the left navigation bar and copy the command to `Push an existing repository from command line`.

Note: If you receive the authentication failed error, make sure you are using the `Generate Git Credentials` option under `Clone` and not using your Azure account password.


## Azure Service Connection
1. Go to the gear icon in the bottom left corner (Project Settings).

2. Click Service Connections under the Pipelines section.

3. Click New Service Connection in the top right.

4. Choose Azure Resource Manger and then select Service Principal (automatic).

5. Choose the subscription you want to deploy to. (See this [article](https://blog.georgekosmidis.net/troubleshooting-you-dont-appear-to-have-an-active-azure-subscription.html) if you don't see any subs)

6. Name your service connection. This is the name to use in the frosti.yml file above under `YOUR_SERVICE_CONNECTION`

7. Grant access to all pipelines

8. Click save.

## Deploy App to Test Environment 

1. Go to `Pipelines`. Click New Pipeline. Choose Azure Git Repos. Then, select the repo you just pushed your changes to. Next, select Existing Azure Pipelines Yaml File.

2. On the sidebar that pops up, leave Branch as main and select the frost.yml for Path. 

3. Before hitting run, make sure and remove `YOUR_SERVICE_CONNECTION` in the variables section from the file that just got loaded. We will add this back when we add other Azure resources in future tutorials.

4. Just hit run, and you'll have yourself a PPE envionrment provisioned and deployed with your code. To see your website name, find the `AzureRmWebAppDeployment` job under `CodeDeploy`. You'll see the line "App Service Application URL: XX_YOUR_APP_URL_XX" 

