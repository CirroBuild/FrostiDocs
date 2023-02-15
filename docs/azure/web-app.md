---
title: Azure Web Application
sidebar_label: Web App
description:
  Overview of Azure WebApp using Frosti
---

## Packages / SDKs
Create a new Project via [Visual Studio](https://learn.microsoft.com/en-us/azure/app-service/quickstart-dotnetcore?tabs=net60&pivots=development-environment-vs). Ignore the publish to Azure section, Frosti will take care of this!

## Connecting to Web Apps
No need to do anything here. 

Frosti will detect that the project is a web application and automatically provision the web app service. The CI/CD pipeline will automatically deploy your code onto the app service.

Note: App services are not deployed for the dev enviornment as localhost is used instead.