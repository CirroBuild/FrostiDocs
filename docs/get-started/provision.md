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

2. When you are ready to test in your dev environment. Navigate to the **root** directory of your project on the terminal and run `frosti provision`. See full list of command [parameters](/docs/get-started/parameters).

3. This will prompt you with a list of services that will be provisioned for you. 
Note: FunctionApp and WebApp will not appear on here for the Dev enviornment because you will be using your localhost for the dev env. 

4. Enter Y or Yes if the list of services is correct. If a service is showing up incorrectly or missing, please look at your SDKs used in your *.csproj file to see what's missing or there by mistake. Then start again from step 2.
Note: This will create a file frosti.yml, make sure to keep this file. It's needed to create your PPE/Prod environments.

5. After this, simply build and run your project. Hit the Green Play button at the top to test your application locally using cloud resources.

## Deploying to PPE/Production [Requires enrollment in [Beta](/enterprise)]
1. When you ran frosti locally, a frosti.yml file was created for you if you are part of the beta. Push this file up to github if you haven't already. The file is located at .github/frosti.yml. Run `git add .github/*` and commit the new file.

2. This will automatically trigger a workflow that tries to automatically provision your ppe architecture. [Note: This will fail because github is missing your credentials to connect to azure]

3. Run `az ad sp create-for-rbac --name "FrostiApp" --role contributor --sdk-auth --scopes /subscriptions/{sub_id}` on the terminal. Copy the response, including the brackets [{}].

4. Go to Settings tab in your Github project. On the left sidebar, go to "Secrets and variables". Click New repository secret.

5. Add "AZURE_CREDENTIALS" as the name and the copied value from step 3 as the value. Frosti is now ready to deploy.

6. Anytime something is merged to main, frosti will automatically deploy the changes to ppe.

7. To monitor the status of your deployments, go to Actions in your Git Repo, and look at the action "Frosti Provision and Deploy." You can also manually deploy a new deployment by clicking `Run workflow`
