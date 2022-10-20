---
title: Symbol
sidebar_label: Symbol
description:
  Documentation for usage of the symbol data type in QuestDB. This type is used
  to store repetitive strings in order to enable optimizations on storage and
  search.
---

QuestDB introduces a data type called `symbol`; a data structure used to store
repetitive strings. Internally, `symbol` types are stored as a table of integers
and their corresponding string values.

This page presents the concept, optional setting, and their indication for
`symbol` types.

The [CREATE TABLE](/docs/reference/sql/create-table) documentation specifies the
correct syntax to use. Further details on indexes are described on the
[index documentation](/docs/concept/indexes).

## Advantages of `symbol` types

- Greatly improved query performance as string operations compare and write
  `int` types instead of `string`.
- Greatly improved storage efficiency as `int` maps to `string` types.
- Unobtrusive to the user because SQL execution has the same result as handling
  string values.
- Reduced complexity of database schemas by removing the need for explicit
  additional tables or joins.

## Properties

- Symbol tables are stored separately from column data.
- Fast conversion from `string` to `int` and vice-versa when reading or writing
  data.
- Columns defined as `symbol` types support indexing.
- By default, QuestDB caches `symbol` types in memory for improved query speed
  and ILP ingestion speed. The setting is configurable.

## Usage of `symbols`

### `Symbol` columns

Columns can be specified as `SYMBOL` during table creation similar to other
types:

```questdb-sql title="Create table with a SYMBOL type"
CREATE TABLE my_table
  (symb SYMBOL CAPACITY 128 NOCACHE, price DOUBLE, ts TIMESTAMP)
timestamp(ts);
```

The following additional symbol settings are defined, either globally as part of
the [server configuration](/docs/reference/configuration) or locally when a
table is created:

- **Symbol capacity**: Optional setting used to indicate how many distinct
  values this column is expected to have. Based on the value used, the data
  structures will resize themselves when necessary, to allow QuestDB to function
  correctly. Underestimating the symbol value count may result in drop of
  performance whereas over-estimating may result in higher disk space and memory
  consumption. Symbol capacity is also used to set the initial symbol cache size
  when the cache is enabled.

  - Server-wide setting: `cairo.default.symbol.capacity` with a default of `256`
  - Column-wide setting: The
    [`CAPACITY` option](/docs/reference/sql/create-table/#symbol-capacity) for
    `CREATE TABLE`

- **Cache**: Optional setting specifying whether a symbol should be cached. When
  a `symbol` column is cached, QuestDB will use a Java heap-based hash table to
  resolve symbol values and keys. When a column has a large number of distinct
  symbol values (over 100,000, for example), the heap impact might be
  significant and may cause OutOfMemory errors, depending on the heap size. Not
  caching leverages a memory-mapped structure which can deal with larger value
  counts but is slower.

  - Server-wide setting: `cairo.default.symbol.cache.flag` with a default of
    `true`
  - Column-wide setting when a table is created: The
    [`CACHE | NOCACHE` keyword](/docs/reference/sql/create-table/#symbol-caching)
    for `CREATE TABLE`
  - Column-wide setting to change existing table setting: The
    [`ALTER COLUMN CACHE | NOCACHE` keyword](/docs/reference/sql/alter-table-alter-column-cache/)

### Symbols for column indexing

`Symbols` may also be [indexed](/docs/concept/indexes) for faster query
execution in the following ways:

- When creating a table,
  [CREATE TABLE](/docs/reference/sql/create-table/#column-indexes):

```questdb-sql
CREATE TABLE my_table(symb SYMBOL INDEX, price DOUBLE, ts TIMESTAMP)
  timestamp(ts);
```

- Altering an existing `symbol` column in a table,
  [ALTER TABLE COLUMN ADD INDEX](/docs/reference/sql/alter-table-alter-column-add-index):

```questdb-sql title="Adding an index"
ALTER TABLE trades ALTER COLUMN instrument ADD INDEX;
```

When a symbol column is indexed, an additional **index capacity** can be defined
to specify how many row IDs to store in a single storage block on disk:

- Server-wide setting: `cairo.index.value.block.size` with a default of `256`
- Column-wide setting: The
  [`index` option](/docs/reference/sql/create-table/#column-indexes) for
  `CREATE TABLE`.

An example of `CREATE TABLE` command creating a table with an index capacity of
128:

```questdb-sql
CREATE TABLE my_table(symb SYMBOL, price DOUBLE, ts TIMESTAMP),
  INDEX (symb CAPACITY 128) timestamp(ts);
-- equivalent to
CREATE TABLE my_table(symb SYMBOL INDEX CAPACITY 128, price DOUBLE, ts TIMESTAMP),
  timestamp(ts);
```

:::note

- The **index capacity** and **symbol capacity** are different settings.
- The index capacity value should not be changed, unless an user is aware of all
  the implications.

:::

Fewer blocks used to store row IDs achieves better performance. At the same time
over-sizing the setting will result in higher than necessary disk space usage.

Consider an example table with 200 unique stock symbols and 1,000,000,000
records over time. The index will have to store 1,000,000,000 / 200 row IDs for
each symbol, i.e. 5,000,000 per symbol.

- If the index capacity is set to 1,048,576 in this case, QuestDB will use 5
  blocks to store the row IDs
- If the index capacity is set to 1,024 in this case, the block count will be
  4,883
