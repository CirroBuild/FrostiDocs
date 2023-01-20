---
title: Deploy Azure Resources
sidebar_label: Provisioning with Frosti
description:
  This document describes how to deploy resources to Azure using
  the Frosti developer platform.
---

TBD Talk about provisioning to Azure

## Prerequisites

- An [Azure](https://portal.azure.com) account

## Deploy with Frosti

1. If Az command line tool is not already installed, download Az with homebrew.

```bash
brew install az
```

2. Login to your Azure account.

```bash
az login
```

3. Navigate to the **root** directory of your project and run the provision command. This will prompt you with a list of services that will be provisioned for you. Name prefix should be between 6-10 characters.

```bash
frosti -n {namePrefix}
```

Note: FunctionApp and WebApp will not appear on here for the Dev enviornment because you will be using your localhost for the dev env. 

4. Enter Y or Yes if this is correct. If a service is showing up incorrectly or missing, please look at your SDKs used in your *.csproj file and match it against our list here to see what's missing or there by mistake. Then start again from step 3.

5. Check Azure portal to see your deployed resources. Provisioning is complete!

