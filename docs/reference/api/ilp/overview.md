---
title: ILP Overview
sidebar_label: Overview
description: InfluxDB line protocol reference documentation.
---

QuestDB implements the
[InfluxDB line protocol](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/)
to ingest data. QuestDB can listen for line protocol packets both over
[TCP](/docs/reference/api/ilp/tcp-receiver/) and
[UDP](/docs/reference/api/ilp/udp-receiver/).

## Usage

### Syntax

```shell
table_name,symbolset columnset timestamp\n
```

| Element      | Definition                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------ |
| `table_name` | Name of the table where QuestDB will write data.                                           |
| `symbolset`  | A set of `name=value` pairs separated by commas that will be parsed as symbol columns.     |
| `columnset`  | A set of `name=value` pairs separated by commas that will be parsed as non-symbol columns. |
| `timestamp`  | UNIX timestamp. By default in nanoseconds. Can be changed in the configuration.            |

`name` in the `name=value` pair always corresponds to `column name` in the
table.

:::note Each ILP message has to end with new line `\n` character. :::

### Behaviour

- When the `table_name` does not correspond to an existing table, QuestDB will
  create the table on the fly using the name provided. Column types will be
  automatically recognized and assigned based on the data.
- The `timestamp` column is automatically created as
  [designated timestamp](/docs/concept/designated-timestamp/) with the
  [partition strategy](/docs/concept/partitions/) set to `NONE`. If you would
  like to define a partition strategy, you should
  [CREATE](/docs/reference/sql/create-table/) the table beforehand.
- When the timestamp is empty, QuestDB will use the server timestamp.

### Difference from InfluxDB

QuestDB TCP Receiver uses ILP as both serialization and the transport format.
InfluxDB on other hand uses HTTP as the transport and ILP as serialization
format. For this reason the existing InfluxDB client libraries will not work
with QuestDB.

### Generic example

Let's assume the following data:

| timestamp           | city    | temperature | humidity | make      |
| ------------------- | ------- | ----------- | -------- | --------- |
| 1465839830100400000 | London  | 23.5        | 0.343    | Omron     |
| 1465839830100600000 | Bristol | 23.2        | 0.443    | Honeywell |
| 1465839830100700000 | London  | 23.6        | 0.358    | Omron     |

The line protocol syntax for that table is:

```shell
readings,city=London,make=Omron temperature=23.5,humidity=0.343 1465839830100400000\n
readings,city=Bristol,make=Honeywell temperature=23.2,humidity=0.443 1465839830100600000\n
readings,city=London,make=Omron temperature=23.6,humidity=0.348 1465839830100700000\n
```

This would create table similar to this SQL statement and populate it.

```sql
create table readings (timestamp timestamp, city symbol, temperature double, humidity double, make symbol) timestamp(timestamp) partition by DAY;
```

### Irregularly-structured data

InfluxDB line protocol makes it possible to send data under different shapes.
Each new entry may contain certain tags or fields, and others not. QuestDB
supports on-the-fly data structure changes with minimal overhead. Whilst the
example just above highlights structured data, it is possible for InfluxDB line
protocol users to send data as follows:

```shell
readings,city=London temperature=23.2 1465839830100400000\n
readings,city=London temperature=23.6 1465839830100700000\n
readings,make=Honeywell temperature=23.2,humidity=0.443 1465839830100800000\n
```

This would result in the following table:

| timestamp           | city   | temperature | humidity | make      |
| ------------------- | ------ | ----------- | -------- | --------- |
| 1465839830100400000 | London | 23.5        | NULL     | NULL      |
| 1465839830100700000 | London | 23.6        | NULL     | NULL      |
| 1465839830100800000 | NULL   | 23.2        | 0.358    | Honeywell |

:::tip

Whilst we offer this function for flexibility, we recommend that users try to
minimise structural changes to maintain operational simplicity.

:::

### Duplicate column names

If line contains duplicate column names, the value stored in the table will be
that from the first `name=value` pair on each line. For example:

```shell
trade,ticker=USD price=30,price=60 1638202821000000000\n
```

Price `30` is stored, `60` is ignored.

### Name restrictions

Both table name and column names are allowed to have spaces ` `. These spaces
have to be escaped with `\`. For example both of these are valid lines.

```shell
trade\ table,ticker=USD price=30,details="Latest price" 1638202821000000000\n
```

```shell
trade,symbol\ ticker=USD price=30,details="Latest price" 1638202821000000000\n
```

Table name and columns name must not contain any of the forbidden characters:
`.`, `?`,`,`,`:`,`\`,`/`,`\0`,`)`,`(`,`+`,`*`,`~`,`%` and `-`.

### Symbolset

Area of the message that contains comma-separated set of `name=value` pairs for
symbol columns. For example in a message like this:

```shell
trade,ticker=BTCUSD,venue=coinbase price=30,price=60 1638202821000000000\n
```

`symbolset` is `ticker=BTCUSD,venue=coinbase`. Please note the mandatory space
between `symbolset` and `columnset`. Naming rules for columns are subject to
[duplicate rules](#duplicate-column-names) and
[name restrictions](#name-restrictions).

### Symbolset values

`symbolset` values are always interpreted as [SYMBOL](/docs/concept/symbol/).
Parser takes values literally so please beware of accidentally using high
cardinality types such as `9092i` or `1.245667`. This will result in a
significant performance loss due to large mapping tables.

`symbolset` values are not quoted. They are allowed to have special characters,
such as ` ` (space), `,` and `\`, which must be escaped. Example:

```shell
trade,ticker=BTC\\USD\,All,venue=coin\ base price=30 1638202821000000000\n
```

Whenever `symbolset` column does not exist, it will be added on-the-fly with
type `SYMBOL`. On other hand when the column does exist, it is expected to be of
`SYMBOL` type, otherwise the line is rejected.

### Columnset

Area of the message that contains comma-separated set of `name=value` pairs for
non-symbol columns. For example in a message like this:

```shell
trade,ticker=BTCUSD priceLow=30,priceHigh=60 1638202821000000000\n
```

`columnset` is `priceLow=30,priceHigh=60`. Naming rules for columns are subject
to [duplicate rules](#duplicate-column-names) and
[name restrictions](#name-restrictions).

### Columnset values

`columnset` supports several values types, which are used to either derive type
of new column or mapping strategy when column already exists. These types are
limited by existing Influx Line Protocol specification. Wider QuestDB type
system is available by creating table via SQL upfront. The following are
supported value types:
[Integer](/docs/reference/api/ilp/columnset-types/#integer),
[Long256](/docs/reference/api/ilp/columnset-types/#long256),
[Float](/docs/reference/api/ilp/columnset-types/#float),
[String](/docs/reference/api/ilp/columnset-types/#string) and
[Timestamp](/docs/reference/api/ilp/columnset-types/#timestamp)

### Designated timestamp

Designated timestamp is the trailing part of an ILP message. It is optional, and
when present, is a timestamp in Epoch nanoseconds. When the timestamp is
omitted, the server will insert each message using the system clock as the row
timestamp.

:::warning While `columnset` `timestamp` type units are `microseconds`, the
designated timestamp units are `nanoseconds`. These are default units, which can
be overridden via `line.tcp.timestamp` :::

```shell title="Example of ILP message with desginated timestamp value"
tracking,loc=north val=200i 1000000000\n
```

```shell title="Example of ILP message sans timestamp"
tracking,loc=north val=200i\n
```
