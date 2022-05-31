---
title: VACUUM TABLE
sidebar_label: VACUUM TABLE
description: VACUUM TABLE SQL keyword reference documentation
---

The `VACUUM TABLE` command triggers partition and column version cleanup.

When a table is appended Out of Order, a new version of a partition can be
written to the disk. The old partition version directory is deleted once it is
not read by SELECT queries. In the event of file system errors, physical deletion of
old files can be interrupted and an outdated partition version may be left behind
consuming the disk space.

In a similar manner executing `UPDATE` SQL statement copies column files. 
Old column files are automitically deleted but in some limited circumstances can be left behind.
In this case `VACUUM TABLE` will re-trigger delete process of updated column files.

The `VACUUM TABLE` command starts a new scan over table partitions directories and
and column files. It detects redundant, unused files consuming the disk space and deletes them.
`VACUUM` executes asynchronously e.g. it may keep scanning and deleting files after their response 
is returned to the SQL client.

This command has to be executed rarely and provides a manual mechanism to reclaim the disk space.
The implementation scans file system catalogs to detect duplicate directories and files and may be
relatively expensive to run too often.

## Syntax

<!--- "VacuumQuery ::= 'VACUUM' 'TABLE' tableName" -->

![Flow chart showing Vacuum Table syntax](/img/docs/diagrams/vacuumTable.svg)

## Example

```questdb-sql
VACUUM TABLE trades
```
