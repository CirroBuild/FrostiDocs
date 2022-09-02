---
title: ALTER TABLE ATTACH PARTITION
sidebar_label: ATTACH PARTITION
description: ATTACH PARTITION SQL keyword reference documentation.
---

Restores one or more partitions to the table where they have been detached from by using the SQL [ALTER TABLE DETACH PARTITION](alter-table-detach-partition) keyword. The operation scans the table partition files and rename the selected partition directories, so that these partitions become accessible.

This feature is part of the manual S3/cold storage solution, allowing restoring data manually.

## Syntax

![Flow chart showing the syntax of ALTER TABLE with ATTACH PARTITION keyword](/img/docs/diagrams/alterTableAttachPartition.svg)

## Example

Assuming the QuestDB data directory is `/var/lib/questdb/db`, for a table `x` with AWS S3 for cold storage:

1. Copy files from S3:

    ```bash
    cd /var/lib/questdb/db/x
    # Table x is the original table where the partition were detached from.
    
    mkdir 2019-02-01.attachable && aws s3 cp s3://questdb-internal/blobs/20190201.tar.gz - | tar xvfz - -C 2019-02-01.attachable --strip-components 1
    mkdir 2019-02-02.attachable && aws s3 cp s3://questdb-internal/blobs/20190202.tar.gz - | tar xvfz - -C 2019-02-01.attachable --strip-components 1
    ```

2. Execute the SQL `ALTER TABLE ATTACH PARTITION` command:

    ```questdb-sql
    ALTER TABLE x ATTACH PARTITION LIST '2019-02-01', '2019-02-02';
    ```
3. After the SQL is executed, the partitions will be available to reads.

:::info

- The SQL reference to the partitions does not include the suffix `.attachable`.
- The `WHERE` clause is not supported when attaching partitions.

:::

## Limitation

- S3/Cold storage interaction is manual.
- Partition can only be attached to the same table it was detached from. The table name must be the same. Moving partitions between tables or database instances is not supported. 
- The operation will fail if a partition already exists. We are working on a functionality to allow merging data in the same partition for attaching.
