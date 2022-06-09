# Insert data

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

This page shows how to insert data into QuestDB using different programming
languages and tools.

[InfluxDB Line Protocol](#influxdb-line-protocol) is the recommended primary
ingestion method in QuestDB and is recommended for high-performance
applications.

For operational (ad-hoc) data ingestion the [Web Console](#web-console) makes it
easy to upload CSV files and insert via SQL statements. You can also perform
these same actions via the [HTTP REST API](#http-rest-api).

Applications that intend to insert via SQL programmatically should prefer the
[PostgreSQL wire protocol](#postgresql-wire-protocol) as it provides
parameterized querys which avoid SQL injection issues.

In summary, these are the different options:

* [Web Console](#web-console)
  * CSV upload.
  * SQL `INSERT` statements.
* [InfluxDB Line Protocol](#influxdb-line-protocol)
  * High performance.
  * Optional automatic timestamps.
  * Optional integrated authentication.
  * Client libraries in various programming languages.
* [PostgreSQL wire protocol](#postgresql-wire-protocol)
  * SQL `INSERT` statements, including parameterized queries.
  * Use `psql` on the command line.
  * Interoperability with third-party tools and libraries.
* [HTTP REST API](#http-rest-api)
  * CSV upload.
  * SQL `INSERT` statements.
  * Use `curl` on the command line.

## Web Console

QuestDB ships with an embedded [Web Console](/docs/develop/web-console) running
by default on port `9000`.

```questdb-sql title='Creating a table and inserting some data'

CREATE TABLE takeaway_order (ts TIMESTAMP, id SYMBOL, status SYMBOL)
  TIMESTAMP(ts);

INSERT INTO takeaway_order VALUES (now(), 'order1', 'placed');
INSERT INTO takeaway_order VALUES (now(), 'order2', 'placed');
```

SQL statements can be written in the code editor and executed by clicking the
**Run** button. Note that the web console runs a single statement at a time.
You can also use the Web Console to upload CSV.

## InfluxDB Line Protocol

The InfluxDB Line Protocol (ILP) is a text protocol over TCP or UDP on port
9009.

It is a one-way protocol to insert data, focusing on simplicity
and performance.

Here is a summary table is how it compares with ways to insert data that we
support:

|Protocol                 |Record Insertion Reporting       |Data Insertion Performance |
|:------------------------|:--------------------------------|:--------------------------|
|InfluxDB Line Protocol   |Server logs; Disconnect on error | **Best**                  |
|CSV upload via HTTP REST |Configurable                     | Very Good                 |
|SQL `INSERT` statements  |Transaction-level                | Good                      |

This interface is the preferred ingestion method as it provides the following
benefits:

- high-throughput ingestion
- robust ingestion from multiple sources into tables with dedicated systems for
  reducing congestion
- configurable commit-lag for out-of-order data via
  [server configuration](/docs/reference/configuration#influxdb-line-protocol-tcp)
  settings

With sufficient client-side validation, the lack of errors to the client and
confirmation isn't necessarily a concern: QuestDB will log out any issues
and disconnect on error. The database will process any valid lines up to that
point and insert rows.

On the [InfluxDB line protocol](/docs/reference/api/ilp/overview) page, you may
find additional details on the message format, ports and authentication.

The [Telegraf guide](/docs/third-party-tools/telegraf) helps you configure a
Telegraf agent to collect and send metrics to QuestDB via ILP.

### ILP Client Libraries

We have client libraries for a growing number of languages:

* **C and C++**: [https://github.com/questdb/c-questdb-client](https://github.com/questdb/c-questdb-client)

* **Java**: [https://search.maven.org/artifact/org.questdb/questdb](https://search.maven.org/artifact/org.questdb/questdb)

* **C#**: [https://github.com/questdb/net-questdb-client](https://github.com/questdb/net-questdb-client)

* For other languages, we have examples and a [protocol reference](/docs/reference/api/ilp/overview).

### Examples

These examples send a few rows of input. These use client libraries for C++, C#,
Java and C, and raw TCP socket connections for NodeJS, Go and Python.

<Tabs defaultValue="cpp" values={[
  { label: "C++", value: "cpp" },
  { label: "Java", value: "java" },
  { label: "C#", value: "csharp" },
  { label: "C", value: "c" },
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
  { label: "Python", value: "python" }
]}>


<TabItem value="cpp">

```cpp
// https://github.com/questdb/c-questdb-client

#include <questdb/ilp/line_sender.hpp>
#include <iostream>

using namespace questdb::ilp::literals;

int main()
{
    try
    {
        questdb::ilp::line_sender sender{"localhost", 9009};

        // We prepare all our table names and colum names in advance.
        // If we're inserting multiple rows, this allows us to avoid
        // re-validating the same strings over and over again.
        auto table_name = "trades"_name;
        auto name_name = "name"_name;
        auto value_name = "value"_name;

        sender
            .table(trades_name)
            .symbol(name_name, "test_ilp1"_utf8)
            .column(value_name, 12.4)
            .at_now();
        sender
            .table(trades_name)
            .symbol(name_name, "test_ilp2"_utf8)
            .column(value_name, 11.4)
            .at_now();

        sender.flush();

        return 0;
    }
    catch (const questdb::ilp::line_sender_error& err)
    {
        std::cerr
            << "Error running example: "
            << err.what()
            << std::endl;

        return 1;
    }
}

```

</TabItem>

<TabItem value="java">


```java
/*
    https://search.maven.org/artifact/org.questdb/questdb

    Maven:
        <dependency>
            <groupId>org.questdb</groupId>
            <artifactId>questdb</artifactId>
            <version>6.2.1</version>
        </dependency>

    Gradle:
        compile group: 'org.questdb', name: 'questdb', version: '6.2.1'
*/

import io.questdb.cutlass.line.LineTcpSender;
import io.questdb.network.Net;
import io.questdb.std.Os;

public class LineTCPSenderMain {
    public static void main(String[] args) {
        int host = Net.parseIPv4("127.0.0.1");
        int port = 9009;
        int bufferCapacity = 256 * 1024;

        try (LineTcpSender sender = new LineTcpSender(host, port, bufferCapacity)) {
            sender
                    .metric("trades")
                    .tag("name", "test_ilp1")
                    .field("value", 12.4)
                    .$(Os.currentTimeNanos());
            sender
                    .metric("trades")
                    .tag("name", "test_ilp2")
                    .field("value", 11.4)
                    .$(Os.currentTimeNanos());

            sender.flush();
        }
    }
}
```

</TabItem>

<TabItem value="csharp">

```csharp
// https://github.com/questdb/net-questdb-client

using QuestDB;

namespace QuestDBDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            var address = IPAddress.Loopback.ToString();
            using var sender = new LineTcpSender(address, 9009);

            sender
                .Table("trades")
                .Symbol("name", "test_ilp1")
                .Column("value", 12.4)
                .AtNow();
            sender
                .Table("trades")
                .Symbol("name", "test_ilp2")
                .Column("value", 11.4)
                .AtNow();
            sender.flush();
        }
    }
}

```

</TabItem>

<TabItem value="c">

```c
// https://github.com/questdb/c-questdb-client

#include <questdb/ilp/line_sender.h>
#include <stdio.h>

int main()
{
    line_sender_error* err = NULL;
    line_sender* sender = NULL;

    sender = line_sender_connect(
        "0.0.0.0",    // bind to all outbound network interfaces
        "localhost",  // QuestDB host
        "9009",       // QuestDB port
        &err);
    if (!sender)
        goto on_error;

    // We prepare all our table names and colum names in advance.
    // If we're inserting multiple rows, this allows us to avoid
    // re-validating the same strings over and over again.
    line_sender_name table_name;
    if (!line_sender_name_init(&table_name, 6, "trades", &err))
      goto on_error;

    line_sender_name name_name;
    if (!line_sender_name_init(&name_name, 4, "name", &err))
        goto on_error;

    line_sender_name value_name;
    if (!line_sender_name_init(&value_name, 5, "value", &err))
        goto on_error;


    line_sender_utf8 test_ilp3_utf8;
    if (!line_sender_utf8_init(&test_ilp2_utf8, 9, "test_ilp2", &err))
        goto on_error;

    // Prepare the first row.
    if (!line_sender_table(sender, table_name, &err))
        goto on_error;

    line_sender_utf8 test_ilp1_utf8;
    if (!line_sender_utf8_init(&test_ilp1_utf8, 9, "test_ilp1", &err))
        goto on_error;

    if (!line_sender_symbol(sender, name_name, test_ilp1_utf8, &err))
        goto on_error;

    if (!line_sender_column_f64(sender, value_name, 12.4, &err))
        goto on_error;

    if (!line_sender_at_now(sender, &err))
        goto on_error;


    // Prepare second row.
    if (!line_sender_table(sender, table_name, &err))
        goto on_error;

    line_sender_utf8 test_ilp2_utf8;
    if (!line_sender_utf8_init(&test_ilp2_utf8, 9, "test_ilp2", &err))
        goto on_error;

    if (!line_sender_symbol(sender, name_name, test_ilp2_utf8, &err))
        goto on_error;

    if (!line_sender_column_f64(sender, value_name, 11.4, &err))
        goto on_error;

    if (!line_sender_at_now(sender, &err))
        goto on_error;


    // Send.
    if (!line_sender_flush(sender, &err))
        goto on_error;

    line_sender_close(sender);

    return true;

on_error: ;
    size_t err_len = 0;
    const char* err_msg = line_sender_error_msg(err, &err_len);
    fprintf(stderr, "Error running example: %.*s\n", (int)err_len, err_msg);
    line_sender_error_free(err);
    if (sender)
        line_sender_close(sender);
    return 0;
}
```

</TabItem>

<TabItem value="nodejs">


```javascript
// Raw socket connection with no validation and string quoting logic.
// Refer to protocol description:
// http://questdb.io/docs/reference/api/ilp/overview

"use strict"

const net = require("net")

const client = new net.Socket()

const HOST = "localhost"
const PORT = 9009

function run() {
  client.connect(PORT, HOST, () => {
    const rows = [
      `trades,name=test_ilp1 value=12.4 ${Date.now() * 1e6}`,
      `trades,name=test_ilp2 value=11.4 ${Date.now() * 1e6}`,
    ]

    function write(idx) {
      if (idx === rows.length) {
        client.destroy()
        return
      }

      client.write(rows[idx] + "\n", (err) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }
        write(++idx)
      })
    }

    write(0)
  })

  client.on("error", (err) => {
    console.error(err)
    process.exit(1)
  })

  client.on("close", () => {
    console.log("Connection closed")
  })
}

run()
```

</TabItem>


<TabItem value="go">


```go
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	qdb "github.com/questdb/go-questdb-client"
)

func main() {
	ctx := context.TODO()
	// Connect to QuestDB running on 127.0.0.1:9009
	sender, err := qdb.NewLineSender(ctx)
	if err != nil {
		log.Fatal(err)
	}
	// Make sure to close the sender on exit to release resources.
	defer sender.Close()
	// Send a few ILP messages.
	err = sender.
		Table("trades").
		Symbol("name", "test_ilp1").
		Float64Column("value", 12.4).
		At(ctx, time.Now().UnixNano())
	if err != nil {
		log.Fatal(err)
	}
	err = sender.
		Table("trades").
		Symbol("name", "test_ilp2").
		Float64Column("value", 11.4).
		At(ctx, time.Now().UnixNano())
	if err != nil {
		log.Fatal(err)
	}
	// Make sure that the messages are sent over the network.
	err = sender.Flush(ctx)
	if err != nil {
		log.Fatal(err)
	}
}
```

</TabItem>

<TabItem value="python">

```python
# Raw socket connection with no validation and string quoting logic.
# Refer to protocol description:
# http://questdb.io/docs/reference/api/ilp/overview

import time
import socket
import sys

HOST = 'localhost'
PORT = 9009
# For UDP, change socket.SOCK_STREAM to socket.SOCK_DGRAM
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

def send_utf8(msg):
    sock.sendall(msg.encode())

try:
    sock.connect((HOST, PORT))
    # Single record insert
    send_utf8(f'trades,name=client_timestamp value=12.4 {time.time_ns()}\n')
    # Omitting the timestamp allows the server to assign one
    send_utf8('trades,name=server_timestamp value=12.4\n')
    # Streams of readings must be newline-delimited
    send_utf8('trades,name=ilp_stream_1 value=12.4\n' +
              'trades,name=ilp_stream_2 value=11.4\n')

except socket.error as e:
    sys.stderr.write(f'Got error: {e}')

sock.close()
```

</TabItem>

</Tabs>

### Timestamps

Providing a timestamp is optional. If one isn't provided, the server will
automatically assign the server's system time as the row's timestamp value.

Timestamps are interpreted as the number of nanoseconds from 1st Jan 1970 UTC,
unless otherwise configured. See `cairo.timestamp.locale` and
`line.tcp.timestamp` [configuration options](/docs/reference/configuration).

### ILP Datatypes and Casts

#### Strings vs Symbols
Strings may be recorded as either the `STRING` type or the `SYMBOL` type.

Inspecting a sample ILP we can see how a space `' '` separator splits
`SYMBOL` columns to the left from the rest of the columns.

```text
table_name,col1=symbol_val1,col2=symbol_val2 col3="string val",col4=10.5
                                            ┬ 
                                            ╰───────── separator
```

In this example, columns `col1` and `col2` are strings written to the database
as `SYMBOL`s, whilst `col3` is written out as a `STRING`.

`SYMBOL`s are strings with which are automatically
[interned](https://en.wikipedia.org/wiki/String_interning) by the database on a
per-column basis.
You should use this type if you expect the string to be re-used over and over,
such as is common with identifiers.

For one-off strings use `STRING` columns which aren't interned.

#### Casts

QuestDB types are a superset of those supported by ILP.
This means that when sending data you should be aware of the performed
conversions.

See:
* [QuestDB Types in SQL](/docs/reference/sql/datatypes)
* [ILP types and cast conversion tables](/docs/reference/api/ilp/columnset-types)

### Constructing well-formed messages

Different library implementations will perform different degrees content
validation upfront before sending messages out. To avoid encoutering issues
follow these guidelines.

* **All strings must be UTF-8 encoded.**

* **Columns should only appear once per row.**

* **Symbol columns must be written out before other columns.**

* **Table and column names can't have invalid characters.**
  These should not contain `?`, `.`,`,`, `'`, `"`, `\`,
  `/`, `:`, `(`, `)`, `+`, `-`, `*`, `%`, `~`,`' '` (space),
  `\0` (nul terminator),
  [ZERO WIDTH NO-BREAK SPACE](https://unicode-explorer.com/c/FEFF).

* **Write timestamp column via designated API**, or at the end of the message
  if you are using raw sockets. If you have multiple timestamp columns
  write additional ones as column values.

* **Don't change column type between rows.**

* **Supply timestamps in order.** These need to be at least equal to previous
  ones in the same table, unless using the out of order feature.
  This is not necessary if you use the
  [out-of-order](/docs/guides/out-of-order-commit-lag) feature.

### Errors in Server Logs

QuestDB will always log any ILP errors in its
[server logs](/docs/concept/root-directory-structure#log-directory).

From version 6.3, QuestDB will disconnect on the first error encountered on a
given TCP ILP connection.

Here is an example error from the server logs caused when a line attempted to
insert a `STRING` into a `SYMBOL` column.

```text
2022-04-13T13:35:19.784654Z E i.q.c.l.t.LineTcpConnectionContext [3968] could not process line data [table=bad_ilp_example, msg=cast error for line protocol string [columnWriterIndex=0, columnType=SYMBOL], errno=0]
2022-04-13T13:35:19.784670Z I tcp-line-server scheduling disconnect [fd=3968, reason=0]
```

### Inserting NULL values

To insert a NULL value, skip the column (or symbol) for that row.

For example:

```text
table1 a=10.5 1647357688714369403
table1 b=1.25 1647357698714369403
```

Will insert as:

|a     |b     |timestamp                  |
|:-----|:-----|---------------------------|
|10.5  |*NULL*|2022-03-15T15:21:28.714369Z|
|*NULL*|1.25  |2022-03-15T15:21:38.714369Z|

### If you don't immediately see data

If you don't see your inserted data, this is usually down to one of two things:

* You prepared the messages, but forgot to call `.flush()` or similar in your
  client library, so no data was sent.

* The internal timers and buffers within QuestDB did not commit the data yet.
  For development (and development only), you may want to tweak configuration
  settings to commit data more frequently.
  ```ini title=server.conf
  cairo.max.uncommitted.rows=1
  line.tcp.maintenance.job.interval=100
  ```
  Refer to
  [ILP's commit strategy](/docs/reference/api/ilp/tcp-receiver/#commit-strategy)
  documentation for more on these configuration settings.

### Authentication

ILP can additionally provide authentication. This is an optional feature
which is documented [here](/docs/reference/api/ilp/authenticate).

### Third-party Library Compatibility

Use our own client libraries and/or protocol documentation: Clients intended to
work with InfluxDB will not work with QuestDB.

## PostgreSQL wire protocol

QuestDB also supports the same wire protocol as PostgreSQL, allowing you to
connect and query the database with various third-party pre-existing client
libraries and tools.

You can connect to TCP port `8812` and use both `INSERT` and `SELECT` SQL
queries.

:::tip

[InfluxDB Line Protocol](#influxdb-line-protocol) is the recommended primary
ingestion method in QuestDB. SQL `INSERT` statements over the PostgreSQL offer
feedback and error reporting, but have worse overall performance.

:::

Here are a few examples demonstrating SQL `INSERT` queries:

<Tabs defaultValue="psql" values={[
  { label: "psql", value: "psql" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
]}>

<TabItem value="psql">

Create the table:

```shell
psql -h localhost -p 8812 -U admin -d qdb \
    -c "CREATE TABLE IF NOT EXISTS t1 (name STRING, value INT);"
```

Insert row:

```shell
psql -h localhost -p 8812 -U admin -d qdb -c "INSERT INTO t1 VALUES('a', 42)"
```

Query back:

```shell
psql -h localhost -p 8812 -U admin -d qdb -c "SELECT * FROM t1"
```

Note that you can also run `psql` from Docker without installing the client
locally:
```
docker run -it --rm --network=host -e PGPASSWORD=quest \
    postgres psql ....
```

</TabItem>

<TabItem value="python">

This example uses the [psycopg2](https://github.com/psycopg/psycopg2) database
adapter, which does not support prepared statements (bind variables). This
functionality is on the roadmap for the antecedent
[psychopg3](https://github.com/psycopg/psycopg3/projects/1) adapter.

```python
import psycopg2 as pg
import datetime as dt

connection = None
cursor = None
try:
    connection = pg.connect(
        user='admin',
        password='quest',
        host='127.0.0.1',
        port='8812',
        database='qdb')
    cursor = connection.cursor()

    # text-only query
    cursor.execute('''CREATE TABLE IF NOT EXISTS trades (
        ts TIMESTAMP, date DATE, name STRING, value INT)
        timestamp(ts);''')

    # insert 10 records
    for x in range(10):
        now = dt.datetime.utcnow()
        date = dt.datetime.now().date()
        cursor.execute('''
            INSERT INTO trades
            VALUES (%s, %s, %s, %s);
            ''',
            (now, date, 'python example', x))

    # commit records
    connection.commit()

    cursor.execute('SELECT * FROM trades;')
    records = cursor.fetchall()
    for row in records:
        print(row)

finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()
    print('Postgres connection is closed.')
```

</TabItem>

<TabItem value="java">

```java
package com.myco;

import java.sql.*;
import java.util.Properties;

class App {
  public static void main(String[] args) throws SQLException {
    Properties properties = new Properties();
    properties.setProperty("user", "admin");
    properties.setProperty("password", "quest");
    properties.setProperty("sslmode", "disable");

    final Connection connection = DriverManager.getConnection(
      "jdbc:postgresql://localhost:8812/qdb", properties);
    connection.setAutoCommit(false);

    final PreparedStatement statement = connection.prepareStatement(
      "CREATE TABLE IF NOT EXISTS trades (" +
      "    ts TIMESTAMP, date DATE, name STRING, value INT" +
      ") timestamp(ts);");
    statement.execute();

    try (PreparedStatement preparedStatement = connection.prepareStatement(
        "INSERT INTO TRADES  VALUES (?, ?, ?, ?)")) {
      preparedStatement.setTimestamp(
        1,
        new Timestamp(io.questdb.std.Os.currentTimeMicros()));
      preparedStatement.setDate(2, new Date(System.currentTimeMillis()));
      preparedStatement.setString(3, "abc");
      preparedStatement.setInt(4, 123);
      preparedStatement.execute();
    }
    System.out.println("Done");
    connection.close();
  }
}
```

</TabItem>

<TabItem value="nodejs">

This example uses the [`pg` package](https://www.npmjs.com/package/pg) which
allows for quickly building queries using Postgres wire protocol. Details on the
use of this package can be found on the
[node-postgres documentation](https://node-postgres.com/).

This example uses naive `Date.now() * 1000` inserts for Timestamp types in
microsecond resolution. For accurate microsecond timestamps, the
[process.hrtime.bigint()](https://nodejs.org/api/process.html#processhrtimebigint) call can be used.

```javascript
"use strict"

const { Client } = require("pg")

const start = async () => {
  const client = new Client({
    database: "qdb",
    host: "127.0.0.1",
    password: "quest",
    port: 8812,
    user: "admin",
  })
  await client.connect()

  const createTable = await client.query(
    "CREATE TABLE IF NOT EXISTS trades (" +
    "    ts TIMESTAMP, date DATE, name STRING, value INT" +
    ") timestamp(ts);",
  )
  console.log(createTable)

  let now = new Date().toISOString()
  const insertData = await client.query(
    "INSERT INTO trades VALUES($1, $2, $3, $4);",
    [now, now, "node pg example", 123],
  )
  await client.query("COMMIT")

  console.log(insertData)

  for (let rows = 0; rows < 10; rows++) {
    // Providing a 'name' field allows for prepared statements / bind variables
    now = new Date().toISOString()
    const query = {
      name: "insert-values",
      text: "INSERT INTO trades VALUES($1, $2, $3, $4);",
      values: [now, now, "node pg prep statement", rows],
    }
    await client.query(query)
  }
  await client.query("COMMIT")

  const readAll = await client.query("SELECT * FROM trades")
  console.log(readAll.rows)

  await client.end()
}

start()
  .then(() => console.log("Done"))
  .catch(console.error)
```

</TabItem>

<TabItem value="go">

This example uses the [pgx](https://github.com/jackc/pgx) driver and toolkit for
PostgreSQL in Go. More details on the use of this toolkit can be found on the
[GitHub repository for pgx](https://github.com/jackc/pgx/wiki/Getting-started-with-pgx).

```go
package main

import (
  "context"
  "fmt"
  "log"
  "time"

  "github.com/jackc/pgx/v4"
)

var conn *pgx.Conn
var err error

func main() {
  ctx := context.Background()
  conn, _ = pgx.Connect(ctx, "postgresql://admin:quest@localhost:8812/qdb")
  defer conn.Close(ctx)

  // text-based query
  _, err := conn.Exec(ctx,
    ("CREATE TABLE IF NOT EXISTS trades (" +
     "    ts TIMESTAMP, date DATE, name STRING, value INT" +
     ") timestamp(ts);"))
  if err != nil {
    log.Fatalln(err)
  }

  // Prepared statement given the name 'ps1'
  _, err = conn.Prepare(ctx, "ps1", "INSERT INTO trades VALUES($1,$2,$3,$4)")
  if err != nil {
    log.Fatalln(err)
  }

  // Insert all rows in a single commit
  tx, err := conn.Begin(ctx)
  if err != nil {
    log.Fatalln(err)
  }

  for i := 0; i < 10; i++ {
    // Execute 'ps1' statement with a string and the loop iterator value
    _, err = conn.Exec(
      ctx,
      "ps1",
      time.Now(),
      time.Now().Round(time.Millisecond),
      "go prepared statement",
      i + 1)
    if err != nil {
      log.Fatalln(err)
    }
  }

  // Commit the transaction
  err = tx.Commit(ctx)
  if err != nil {
    log.Fatalln(err)
  }

  // Read all rows from table
  rows, err := conn.Query(ctx, "SELECT * FROM trades")
  fmt.Println("Reading from trades table:")
  for rows.Next() {
    var name string
    var value int64
    var ts time.Time
    var date time.Time
    err = rows.Scan(&ts, &date, &name, &value)
    fmt.Println(ts, date, name, value)
  }

  err = conn.Close(ctx)
}
```

</TabItem>

<TabItem value="rust">

The following example shows how to use parameterized queries and prepared
statements using the [rust-postgres](https://docs.rs/postgres/0.19.0/postgres/)
client.

```rust
use postgres::{Client, NoTls, Error};
use chrono::{Utc};
use std::time::SystemTime;

fn main() -> Result<(), Error> {
    let mut client = Client::connect("postgresql://admin:quest@localhost:8812/qdb", NoTls)?;

    // Basic query
    client.batch_execute(
      "CREATE TABLE IF NOT EXISTS trades ( \
          ts TIMESTAMP, date DATE, name STRING, value INT \
      ) timestamp(ts);")?;

    // Parameterized query
    let name: &str = "rust example";
    let val: i32 = 123;
    let utc = Utc::now();
    let sys_time = SystemTime::now();
    client.execute(
        "INSERT INTO trades VALUES($1,$2,$3,$4)",
        &[&utc.naive_local(), &sys_time, &name, &val],
    )?;

    // Prepared statement
    let mut txn = client.transaction()?;
    let statement = txn.prepare("INSERT INTO trades VALUES ($1,$2,$3,$4)")?;
    for value in 0..10 {
        let utc = Utc::now();
        let sys_time = SystemTime::now();
        txn.execute(&statement, &[&utc.naive_local(), &sys_time, &name, &value])?;
    }
    txn.commit()?;

    println!("import finished");
    Ok(())
}
```

</TabItem>

</Tabs>

## HTTP REST API

QuestDB exposes a REST API for compatibility with a wide range of libraries and
tools. The REST API is accessible on port `9000` and has the following
insert-capable entrypoints:

|Entrypoint                                |HTTP Method|Description                            |API Docs                                                    |
|:-----------------------------------------|:----------|:--------------------------------------|:-----------------------------------------------------------|
|[`/imp`](#imp-uploading-tabular-data)     |POST       |Import CSV data                        |[Reference](/docs/reference/api/rest#imp---import-data)     |
|[`/exec?query=..`](#exec-sql-insert-query)|GET        |Run SQL Query returning JSON result set|[Reference](/docs/reference/api/rest#exec---execute-queries)|

For details such as content type, query parameters and more, refer to the
[REST API](/docs/reference/api/rest) docs.

### `/imp`: Uploading Tabular Data

:::tip

[InfluxDB Line Protocol](#influxdb-line-protocol) is the recommended primary
ingestion method in QuestDB. CSV uploading offers insertion feedback and error
reporting, but has worse overall performance.

See `/imp`'s [`atomicity`](/docs/reference/api/rest#url-parameters) query
parameter to customize behavior on error.

:::

Let's assume you want to upload the following data via the `/imp` entrypoint:

<Tabs defaultValue="csv" values={[
  { label: "CSV", value: "csv" },
  { label: "Table", value: "table" },
]}>

<TabItem value="csv">

```csv title=data.csv
col1,col2,col3
a,10.5,True
b,100,False
c,,True
```

</TabItem>

<TabItem value="table">

|col1|col2  |col3   |
|:---|:-----|:------|
|a   |10.5  |*true* |
|b   |100   |*false*|
|c   |*NULL*|*true* |

</TabItem>

</Tabs>

You can do so via the command line using `cURL` or programmatically via HTTP
APIs in your scripts and applications.

By default, the response is designed to be human-readable.
Use the `fmt=json` query argument to obtain a response in JSON.
You can also specify the schema explicitly.
See the second example in Python for these features.

<Tabs defaultValue="curl" values={[
  { label: "cURL", value: "curl" },
  { label: "Python", value: "python" },
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
]}>

<TabItem value="curl">


This example imports a CSV file with automatic schema detection.

```shell title="Basic import with table name"
curl -F data=@data.csv http://localhost:9000/imp?name=table_name
```

This example overwrites an existing table and specifies a timestamp format and a
designated timestamp column. For more information on the optional parameters to
specify timestamp formats, partitioning and renaming tables, see the
[REST API documentation](/docs/reference/api/rest#examples).

```bash title="Providing a user-defined schema"
curl \
-F schema='[{"name":"ts", "type": "TIMESTAMP", "pattern": "yyyy-MM-dd - HH:mm:ss"}]' \
-F data=@weather.csv 'http://localhost:9000/imp?overwrite=true&timestamp=ts'
```

</TabItem>


<TabItem value="python">

This first example shows uploading the `data.csv` file with automatic schema
detection.

```python
import sys
import requests

csv = {'data': ('my_table', open('./data.csv', 'r'))}
host = 'http://localhost:9000'

try:
    response = requests.post(host + '/imp', files=csv)
    print(response.text)
except requests.exceptions.RequestException as e:
    print(f'Error: {e}', file=sys.stderr)
```

The second example creates a CSV buffer from Python objects and uploads them
with a custom schema. Note UTF-8 encoding.

The `fmt=json` parameter allows us to obtain a parseable response, rather than a
tabular response designed for human consumption.

```python
import io
import csv
import requests
import pprint
import json


def to_csv_str(table):
    output = io.StringIO()
    csv.writer(output, dialect='excel').writerows(table)
    return output.getvalue().encode('utf-8')


def main():
    table_name = 'example_table2'
    table = [
        ['col1', 'col2', 'col3'],
        ['a',    10.5,   True],
        ['b',    100,    False],
        ['c',    None,   True]]

    table_csv = to_csv_str(table)
    print(table_csv)
    schema = json.dumps([
        {'name': 'col1', 'type': 'SYMBOL'},
        {'name': 'col2', 'type': 'DOUBLE'},
        {'name': 'col3', 'type': 'BOOLEAN'}])
    response = requests.post(
        'http://localhost:9000/imp',
        params={'fmt': 'json'},
        files={
            'schema': schema,
            'data': (table_name, table_csv)}).json()

    # You can parse the `status` field and `error` fields
    # of individual columns. See Reference/API/REST docs for details.
    pprint.pprint(response)


if __name__ == '__main__':
    main()
```

</TabItem>

<TabItem value="nodejs">


```javascript
const fetch = require("node-fetch")
const FormData = require("form-data")
const fs = require("fs")
const qs = require("querystring")

const HOST = "http://localhost:9000"

async function run() {
  const form = new FormData()

  form.append("data", fs.readFileSync(__dirname + "/data.csv"), {
    filename: fileMetadata.name,
    contentType: "application/octet-stream",
  })

  try {
    const r = await fetch(`${HOST}/imp`, {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    })

    console.log(r)
  } catch (e) {
    console.error(e)
  }
}

run()
```

</TabItem>

<TabItem value="go">


```go
package main

import (
  "bytes"
  "fmt"
  "io"
  "io/ioutil"
  "log"
  "mime/multipart"
  "net/http"
  "net/url"
  "os"
)

func main() {
  u, err := url.Parse("http://localhost:9000")
  checkErr(err)
  u.Path += "imp"
  url := fmt.Sprintf("%v", u)
  fileName := "/path/to/data.csv"
  file, err := os.Open(fileName)
  checkErr(err)

  defer file.Close()

  buf := new(bytes.Buffer)
  writer := multipart.NewWriter(buf)
  uploadFile, _ := writer.CreateFormFile("data", "data.csv")
  _, err = io.Copy(uploadFile, file)
  checkErr(err)
  writer.Close()

  req, err := http.NewRequest(http.MethodPut, url, buf)
  checkErr(err)
  req.Header.Add("Content-Type", writer.FormDataContentType())

  client := &http.Client{}
  res, err := client.Do(req)
  checkErr(err)

  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  checkErr(err)

  log.Println(string(body))
}

func checkErr(err error) {
  if err != nil {
    panic(err)
  }
}
```

</TabItem>

</Tabs>

### `/exec`: SQL `INSERT` Query

The `/exec` entrypoint takes a SQL query and returns results as JSON.

We can use this for quick SQL inserts too, but note that there's no support
for parameterized queries that are necessary to avoid SQL injection issues.

:::tip

Prefer the [PostgreSQL interface](#postgresql-wire-protocol) if you are
generating sql programmatically.

Prefer [ILP](#influxdb-line-protocol) if you need high-performance inserts.

:::

<Tabs defaultValue="curl" values={[
  { label: "cURL", value: "curl" },
  { label: "Python", value: "python" },
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
]}>

<TabItem value="curl">


```shell
# Create Table
curl -G \
  --data-urlencode "query=CREATE TABLE IF NOT EXISTS trades(name STRING, value INT)" \
  http://localhost:9000/exec

# Insert a row
curl -G \
  --data-urlencode "query=INSERT INTO trades VALUES('abc', 123456)" \
  http://localhost:9000/exec
```

</TabItem>


<TabItem value="python">


```python
import sys
import requests
import json

host = 'http://localhost:9000'

def run_query(sql_query):
    query_params = {'query': sql_query, 'fmt' : 'json'}
    try:
        response = requests.get(host + '/exec', params=query_params)
        json_response = json.loads(response.text)
        print(json_response)
    except requests.exceptions.RequestException as e:
        print(f'Error: {e}', file=sys.stderr)

# create table
run_query("CREATE TABLE IF NOT EXISTS trades (name STRING, value INT)")
# insert row
run_query("INSERT INTO trades VALUES('abc', 123456)")
```

</TabItem>


<TabItem value="nodejs">


The `node-fetch` package can be installed using `npm i node-fetch`.

```javascript
const fetch = require("node-fetch")
const qs = require("querystring")

const HOST = "http://localhost:9000"

async function createTable() {
  try {
    const queryData = {
      query: "CREATE TABLE IF NOT EXISTS trades (name STRING, value INT)",
    }

    const response = await fetch(`${HOST}/exec?${qs.encode(queryData)}`)
    const json = await response.json()

    console.log(json)
  } catch (error) {
    console.log(error)
  }
}

async function insertData() {
  try {
    const queryData = {
      query: "INSERT INTO trades VALUES('abc', 123456)",
    }

    const response = await fetch(`${HOST}/exec?${qs.encode(queryData)}`)
    const json = await response.json()

    console.log(json)
  } catch (error) {
    console.log(error)
  }
}

createTable().then(insertData)
```

</TabItem>


<TabItem value="go">


```go
package main

import (
  "fmt"
  "io/ioutil"
  "log"
  "net/http"
  "net/url"
)

func main() {
  u, err := url.Parse("http://localhost:9000")
  checkErr(err)

  u.Path += "exec"
  params := url.Values{}
  params.Add("query", `
    CREATE TABLE IF NOT EXISTS
      trades (name STRING, value INT);
    INSERT INTO
      trades
    VALUES(
      "abc",
      123456
    );
  `)
  u.RawQuery = params.Encode()
  url := fmt.Sprintf("%v", u)

  res, err := http.Get(url)
  checkErr(err)

  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  checkErr(err)

  log.Println(string(body))
}

func checkErr(err error) {
  if err != nil {
    panic(err)
  }
}
```

</TabItem>

</Tabs>
