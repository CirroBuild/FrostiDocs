---
title: Azure Function App
sidebar_label: Function App
description:
  Overview of Azure FunctionApp using Frosti
---

## Packages / SDKs
Create a new Project via [Visual Studio](https://learn.microsoft.com/en-us/azure/azure-functions/functions-create-your-first-function-visual-studio?tabs=in-process). Ignore the publish to Azure section, Frosti will take care of this!

## Connecting to Function Apps
No need to do anything here. 

Frosti will detect that the project is a function app and automatically provision the function app service. The CI/CD pipeline will automatically deploy your code onto the app service.

Note: App services are not deployed for the dev enviornment as localhost is used instead.