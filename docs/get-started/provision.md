---
title: Deploy Azure Resources with Frosti
sidebar_label: Provision
description:
  This document describes how to deploy resources to Azure using
  the Frosti developer platform.
---

See Develop section for an easy example on getting started with Frosti.

## Prerequisites

- An [Azure](https://portal.azure.com) account and subscription
- Followed the Installation doc

## Deploying to Local Enviornment

1. Use the clouds service providers SDKs to write your desired application code/ business logic. 

2. When you are ready to test in your dev environment. Navigate to the **root** directory of your project on the terminal and run `frosti provision -s [YOUR_SUBSCRIPTION_ID]`.

3. This will prompt you with a list of services that will be provisioned for you. 
Note: FunctionApp and WebApp will not appear on here for the Dev enviornment because you will be using your localhost for the dev env. 

4. Enter Y or Yes if the list of services is correct. If a service is showing up incorrectly or missing, please look at your SDKs used in your *.csproj file to see what's missing or there by mistake. Then start again from step 2.
Note: This will create a file frosti.yml, make sure to keep this file. It's needed to create your PPE/Prod environments.

5. After this, simply build and run your project. Hit the Green Play button at the top to test your application locally using cloud resources.

## Deploying to PPE/Production
1. When you are ready to push your project to a preproduction or production enviornment. Go to [Azure DevOps](https://dev.azure.com) and create a project if you don't have one already.

2. Go to `Repos` in the left navigation bar and push your project to Azure Repos via git.

3. Go to `Pipelines`. Click New Pipeline. Choose Azure Git Repos. Then, select the repo you just pushed your changes to. Next, select Existing Azure Pipelines Yaml File.

4. On the sidebar that pops up, leave Branch as main and select the frost.yml for Path. 

5. Before hitting run, make sure to update `YOUR_SERVICE_CONNECTION` in the variables section from the file that just got loaded. See below on how to create/reference a service connection.

6. Just hit run, and you'll have yourself a PPE envionrment provisioned and deployed with your code. Prod coming soon. To see your website name, find the `AzureRmWebAppDeployment` job under `CodeDeploy`. You'll see the line "App Service Application URL: XX_YOUR_APP_URL_XX" 

## Azure Service Connection
1. Go to the gear icon in the bottom left corner (Project Settings).
2. Click Service Connections under the Pipelines section.
3. Click New Service Connection in the top right.
4. Choose Azure Resource Manger and then select Service Principal (automatic).
5. Choose the subscription you want to deploy to. (See this [article](https://blog.georgekosmidis.net/troubleshooting-you-dont-appear-to-have-an-active-azure-subscription.html) if you don't see any subs)
6. Name your service connection. This is the name to use in the frosti.yml file above under `YOUR_SERVICE_CONNECTION`
7. Click save.