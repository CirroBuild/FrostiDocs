---
title: ALTER TABLE SET PARAM
sidebar_label: SET PARAM
description: SET PARAM SQL keyword reference documentation.
---

`ALTER TABLE SET PARAM` sets table parameters via SQL.

:::note

**Deprecated content**

- For QuestDB 6.5.5 and earlier versions, the following keywords are useful for
  configuring out-of-order ILP data ingestion on a per-table basis. For more
  information on more details and when to apply them, see the documentation for
  [out-of-order data commits](/docs/guides/out-of-order-commit-lag) and
  [ILP commit strategy](/docs/reference/api/ilp/tcp-receiver#commit-strategy).

- From QuestDB 6.6 onwards, the database adjusts relevant settings automatically
  and provides maximum ingestion speed.

- Checking table metadata can be done via the `tables()` and `table_columns()`
  functions, as described in the [meta functions](/docs/reference/function/meta)
  documentation page.

:::

## Syntax

![Flow chart showing the syntax of the ALTER TABLE keyword](/img/docs/diagrams/alterTable.svg)
![Flow chart showing the syntax of the ALTER TABLE RENAME COLUMN keywords](/img/docs/diagrams/alterTableSetParam.svg)

The following two sections describe table parameters relating to out-of-order
ingestion. For context on commit lag and max uncommitted rows, see the guide for
[configuring commit lag of out-of-order data](/docs/guides/out-of-order-commit-lag)
and [ILP commit strategy](/docs/reference/api/ilp/tcp-receiver#commit-strategy).

### commitLag

`commitLag` allows for specifying the expected maximum _lag_ of late-arriving
records when ingesting out-of-order data. The purpose of specifying a commit lag
per table is to reduce the occurrences of resource-intensive commits when
ingesting out-of-order data. Incoming records will be kept in memory until for
the duration specified in _lag_, then all records up to the boundary will be
ordered and committed.

`commitLag` expects a value with a modifier to specify the unit of time for the
value:

| unit | description  |
| ---- | ------------ |
| us   | microseconds |
| s    | seconds      |
| m    | minutes      |
| h    | hours        |
| d    | days         |

To specify `commitLag` value to 20 seconds:

```questdb-sql
ALTER TABLE my_table SET PARAM commitLag = 20s
```

### maxUncommittedRows

`maxUncommittedRows` allows for specifying the maximum number of uncommitted
rows per-table to keep in memory before triggering a commit. The purpose of
specifying maximum uncommitted rows per table is to reduce the occurrences of
resource-intensive commits when ingesting out-of-order data.

## Example

The values for **maximum uncommitted rows** and a time range for **commit lag**
can changed per each table with the following SQL:

```questdb-sql title="Altering out-of-order parameters via SQL"
ALTER TABLE my_table SET PARAM maxUncommittedRows = 10000
ALTER TABLE my_table SET PARAM commitLag = 20s
```

Checking the values per-table may be done using the `tables()` function:

```questdb-sql title="List table metadata"
SELECT id, name, maxUncommittedRows, commitLag FROM tables();
```

| id  | name     | maxUncommittedRows | commitLag |
| --- | -------- | ------------------ | --------- |
| 1   | my_table | 10000              | 20000000  |

:::info

`commitLag` is returned in _microseconds_

:::

For more details on retrieving table and column information, see the
[meta functions documentation](/docs/reference/function/meta).
