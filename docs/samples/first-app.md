---
title: Create My First Cloud Application
sidebar_label: Create .NET Web App
description:
  This document shows how to launch a starter application to test Frosti.
---

The goal of this guide is to to create your first ASP.NET web app.

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

## Create an ASP.NET web app
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

## Deploy App to Test Environment

## Deploying to PPE/Production
1. When you are ready to push your project to a preproduction or production enviornment. Go to [Azure DevOps](https://dev.azure.com) and create a project if you don't have one already.

2. Go to `Repos` in the left navigation bar and copy the command to `Push an existing repository from command line`.

```bash 
git remote add origin https://strubelkai@dev.azure.com/strubelkai/CascadeBrewingCo/_git/CascadeBrewingCo
git push -u origin --all
```

3. Go to `Pipelines`. Click New Pipeline. Choose Azure Git Repos. Then, select the repo you just pushed your changes to. Next, select Existing Azure Pipelines Yaml File.

4. On the sidebar that pops up, leave Branch as main and select the frost.yml for Path. 

5. Before hitting run, make sure to update `YOUR_SERVICE_CONNECTION` in the variables section from the file that just got loaded. See below on how to create/refernece a service connection.

6. Just hit run, and you'll have yourself a PPE envionrment provisioned and deployed with your code. To see your website name, find the `AzureRmWebAppDeployment` job under `CodeDeploy`. You'll see the line "App Service Application URL: XX_YOUR_APP_URL_XX" 

