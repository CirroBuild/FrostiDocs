---
title: Introduction
slug: /
description:
  QuestDB is a relational column-oriented database designed for real-time
  analytics on time series data.
---

QuestDB is a relational column-oriented database designed for time series and
event data. It uses SQL with extensions for time series to assist with real-time
analytics. These pages cover core concepts of QuestDB, including setup steps,
usage guides, and reference documentation for syntax, APIs and configuration.

## Get Started

This section explains how to install and run QuestDB using one of the following
methods:

- [Docker](/docs/get-started/docker) for repeatable, portable and scalable
  installations
- [Binaries](/docs/get-started/binaries) for direct downloads to run on Linux,
  macOS or Windows
- [Homebrew](/docs/get-started/homebrew) for running QuestDB on macOS

Once QuestDB is running, a guide is provided to
[create your first database](/docs/get-started/first-database).

## Develop

This section describes how to connect to QuestDB using a variety of tools and
programming languages through our various network endpoints.

- [Connect](/docs/develop/connect) to the database through our various
  endpoints. Learn which protocol is best for different use cases.
- [Insert data](/docs/develop/insert-data) using the InfluxDB Line Protocol,
  PostgreSQL wire protocol or our HTTP REST API.
- [Query data](/docs/develop/query-data) with SQL queries via the PostgreSQL
  Wire Protocol or exported to JSON or CSV via our HTTP REST API.
- [Web Console](/docs/develop/web-console) for quick SQL queries, charting and
  CSV upload/export functionality.

## Guides

- [Large CSV import (COPY SQL)](/docs/guides/importing-data)
- [Small CSV import (REST API)](/docs/guides/importing-data-rest)
- [Modifying Data](/docs/guides/modifying-data)
- [Out-of-order commit lag](/docs/guides/out-of-order-commit-lag)
- [Timestamps and time zones](/docs/guides/working-with-timestamps-timezones)

## Deployment

- [AWS Marketplace AMI](/docs/deployment/aws-official-ami)
- [Kubernetes](/docs/deployment/kubernetes)
- [Google Cloud Platform](/docs/deployment/google-cloud-platform)
- [DigitalOcean Droplet](/docs/deployment/digitalocean)

## Operations

This section contains resources for managing QuestDB instances and has dedicated
pages for the following topics:

- [Capacity planning](/docs/operations/capacity-planning) for configuring
  server settings and system resources for common scenarios and edge cases
- [Data retention](/docs/operations/data-retention) strategy to delete old data
  and save disk space
- [Health monitoring](/docs/operations/health-monitoring) endpoint for
  determining the status of the instance
- [Backup and restore](/docs/operations/backup) using filesystem and
  point-in-time backup functionality. Notes for cloud providers.

## Third-party tools

This section describes how to integrate QuestDB with third-party tools and
utilities for collecting metrics and visualizing data:

- [Prometheus](/docs/third-party-tools/prometheus) monitoring and alerting.
- [Grafana](/docs/third-party-tools/grafana) instructions for connecting
  QuestDB as a datasource for building visualizations and dashboards
- [Kafka](/docs/third-party-tools/kafka) guide for ingesting data from topics
  into QuestDB by means of Kafka Connect
- [Telegraf](/docs/third-party-tools/telegraf) guide for collecting system
  metrics, specifying QuestDB as an output and visualizing the results

## Concepts

This section describes the architecture of QuestDB, how it stores and queries
data, and introduces features and capabilities unique to the system.

- [Storage model](/docs/concept/storage-model) describes how QuestDB stores
  records and partitions within tables
- [Designated timestamp](/docs/concept/designated-timestamp) is a core feature
  that enables time-oriented language capabilities and partitioning
- [SQL extensions](/docs/concept/sql-extensions) allow performant time series
  analysis with a concise syntax
- [JIT compiler](/docs/concept/jit-compiler) to speed up queries
- [Partitions](/docs/concept/partitions) can be used for significant
  performance benefits on calculations and queries
- [Symbol](/docs/concept/symbol) type makes storing and retrieving repetitive
  strings efficient
- [Indexes](/docs/concept/indexes) can be used for faster read access on
  specific columns
- [Geospatial data](/docs/concept/geohashes) with geohashes
- [Root directory](/docs/concept/root-directory-structure) describes the
  directory contents of QuestDB for storage and configuration

## Reference

This section contains the reference documentation for the following categories:

### APIs

- [REST](/docs/reference/api/rest)
- [Postgres](/docs/reference/api/postgres)
- [InfluxDB](/docs/reference/api/ilp/overview)
- [Java (embedded)](/docs/reference/api/java-embedded)

### Command-line options

The following resource provides info on options that may be passed to QuestDB
when starting services:

- [Command-line options](/docs/reference/command-line-options) for starting and
  running QuestDB from an executable

### Configuration

The [configuration](/docs/reference/configuration) page shows all the
properties that can be used to customize QuestDB.

### ILP Client libraries

- [Clients overview](/docs/reference/clients/overview)
- [Java ILP client](/docs/reference/clients/java_ilp)

### Data Types

The [data types](/docs/reference/sql/datatypes) page lists the datatypes that
can be used in QuestDB.

### Functions

- [Aggregate](/docs/reference/function/aggregation)
- [Boolean](/docs/reference/function/boolean)
- [Conditional](/docs/reference/function/conditional)
- [Date and time](/docs/reference/function/date-time)
- [Meta](/docs/reference/function/meta)
- [Numeric](/docs/reference/function/numeric)
- [Random value generator](/docs/reference/function/random-value-generator)
- [Row generator](/docs/reference/function/row-generator)
- [Spatial](/docs/reference/function/spatial)
- [Text](/docs/reference/function/text)
- [Timestamp generator](/docs/reference/function/timestamp-generator)
- [Timestamp](/docs/reference/function/timestamp)

### Operators

- [Bitwise](/docs/reference/operators/bitwise)
- [Regex](/docs/reference/operators/regex)
- [Spatial](/docs/reference/operators/spatial)


### SQL

- [SQL Execution order](/docs/reference/sql/datatypes)
- [Data types](/docs/reference/sql/datatypes)
- [ALTER TABLE ADD COLUMN](/docs/reference/sql/alter-table-add-column)
- [ALTER TABLE ALTER COLUMN ADD INDEX](/docs/reference/sql/alter-table-alter-column-add-index)
- [ALTER TABLE ALTER COLUMN DROP INDEX](/docs/reference/sql/alter-table-alter-column-drop-index)
- [ALTER TABLE RENAME COLUMN](/docs/reference/sql/alter-table-rename-column)
- [ALTER TABLE DROP COLUMN](/docs/reference/sql/alter-table-drop-column)
- [ALTER TABLE ATTACH PARTITION](/docs/reference/sql/alter-table-attach-partition)
- [ALTER TABLE DETACH PARTITION](/docs/reference/sql/alter-table-detach-partition)
- [ALTER TABLE DROP PARTITION](/docs/reference/sql/alter-table-drop-partition)
- [ALTER TABLE SET PARAM](/docs/reference/sql/alter-table-set-param)
- [BACKUP](/docs/reference/sql/backup)
- [CASE](/docs/reference/sql/case)
- [CAST](/docs/reference/sql/cast)
- [COPY](/docs/reference/sql/copy)
- [CREATE TABLE](/docs/reference/sql/create-table)
- [DISTINCT](/docs/reference/sql/distinct)
- [FILL](/docs/reference/sql/fill)
- [DROP TABLE](/docs/reference/sql/drop)
- [GROUP BY](/docs/reference/sql/group-by)
- [INSERT](/docs/reference/sql/insert)
- [JOIN](/docs/reference/sql/join)
- [LATEST ON](/docs/reference/sql/latest-on)
- [LIMIT](/docs/reference/sql/limit)
- [ORDER BY](/docs/reference/sql/order-by)
- [REINDEX](/docs/reference/sql/reindex)
- [RENAME TABLE](/docs/reference/sql/rename)
- [SAMPLE BY](/docs/reference/sql/sample-by)
- [SELECT](/docs/reference/sql/select)
- [SHOW](/docs/reference/sql/show)
- [SNAPSHOT](/docs/reference/sql/snapshot)
- [TRUNCATE TABLE](/docs/reference/sql/truncate)
- [UNION EXCEPT INTERSECT](/docs/reference/sql/union-except-intersect)
- [VACUUM TABLE](/docs/reference/sql/vacuum-table)
- [WHERE](/docs/reference/sql/where)
- [WITH](/docs/reference/sql/with)

## Support

For hints on diagnosing common configuration issues, see the following
resources:

- [Troubleshooting FAQ](/docs/troubleshooting/faq) guide with solutions for
  various HW & SW configuration issues
- [List of OS error codes](/docs/troubleshooting/os-error-codes) page with the
  list of Operating System error codes

We are happy to help with any question you may have, particularly to help you
optimize the performance of your application. Feel free to reach out using the
following channels:

- [Raise an issue on GitHub]({@githubUrl@}/issues)
- [Join the Community Slack]({@slackUrl@})
- [QuestDB on Stack Overflow]({@stackoverflowUrl@})
- or send us an email at [hello@questdb.io](mailto:hello@questdb.io)
