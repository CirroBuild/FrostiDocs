---
title: Create My First Cloud Application
sidebar_label: First Web App
description:
  This document shows how to launch a starter application to test Frosti.
---

The goal of this guide is to to create your first ASP.NET web app.

## Prerequisites

- The .NET SDK (includes runtime and CLI). [Install the latest .NET 7.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/)

```bash title=".NET CLI"
brew install dotnet
```

## Create an ASP.NET web app

1. Open a terminal window on your machine to a working directory. Create a new .NET web app using the dotnet new webapp command, and then change directories into the newly created app.


```bash title=".NET CLI"
dotnet new webapp -n MyFirstAzureWebApp --framework net7.0
cd MyFirstAzureWebApp
```

2. From the same terminal session, run the application locally using the dotnet run command.

```bash title=".NET CLI"
dotnet run --urls=https://localhost:5001/
```

3. Open a web browser, and navigate to the app at https://localhost:5001.


