---
title: Azure SQL (Preview)
sidebar_label: SQL (Preview)
description:
  Overview of Azure SQL Db using Frosti
---

## Packages / SDKs
Add these nuget packages via the CLI or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio)
```bash title="Bash / CLI"
dotnet add package System.Data.SqlClient
```

## Usage
Interact with SQL using the SQLClient.

```csharp title="Example.cs"
    using var myConn = new SqlConnection(_configuration["SQLConnection"]);
    var str = "CREATE DATABASE TestDB ( EDITION = 'Basic' )";

    myConn.Open();
    var myCommand = new SqlCommand(str, myConn);
    var result = myCommand.BeginExecuteNonQuery();

    //creating the database does take a second. This is just a quick sample
    while (!result.IsCompleted)
    {
        System.Threading.Thread.Sleep(1000);
    }

    myCommand.EndExecuteNonQuery(result);
    myConn.Close();
```

See [Azure SQL Commands](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-database-transact-sql?view=sql-server-ver15&preserve-view=true&tabs=sqlpool)