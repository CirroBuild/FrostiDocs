---
title: LATEST BY keyword
sidebar_label: LATEST BY
description:
  Reference documentation for using LATEST BY keywords with examples for
  illustration.
---

`LATEST BY` is used as part of a [SELECT statement](/docs/reference/sql/select/)
for returning the most recent records per unique column value, commonly on
`STRING` and `SYMBOL` column types.

To illustrate how `LATEST BY` is intended to be used, we can consider the
`trips` table [in the QuestDB demo instance](https://demo.questdb.io/). This
table has a `payment_type` column as `SYMBOL` type which specifies the method of
payment per trip. We can find the most recent trip for each unique method of
payment with the following query:

```questdb-sql
SELECT payment_type, pickup_datetime, trip_distance
FROM trips
LATEST BY payment_type;
```

| payment_type | pickup_datetime             | trip_distance |
| ------------ | --------------------------- | ------------- |
| Dispute      | 2014-12-31T23:55:27.000000Z | 1.2           |
| Voided       | 2019-06-27T17:56:45.000000Z | 1.9           |
| Unknown      | 2019-06-30T23:57:42.000000Z | 3.9           |
| No Charge    | 2019-06-30T23:59:30.000000Z | 5.2           |
| Cash         | 2019-06-30T23:59:54.000000Z | 2             |
| Card         | 2019-06-30T23:59:56.000000Z | 1             |

:::note

To use `LATEST BY`, a column needs to be specified as a **designated
timestamp**. More information can be found in the
[designated timestamp](/docs/concept/designated-timestamp/) page for specifying
this at table creation or at query time.

:::

## Examples

For these examples, we can create a table called `balances` with the following
SQL:

```questdb-sql
CREATE TABLE balances (
    cust_id SYMBOL,
    balance_ccy SYMBOL,
    balance DOUBLE,
    ts TIMESTAMP
) TIMESTAMP(ts) PARTITION BY DAY

insert into balances values ('1', 'USD', 600.5, '2020-04-22T16:03:43.504432Z');
insert into balances values ('2', 'USD', 950, '2020-04-22T16:08:34.404665Z');
insert into balances values ('2', 'EUR', 780.2, '2020-04-22T16:11:22.704665Z');
insert into balances values ('1', 'USD', 1500, '2020-04-22T16:11:32.904234Z');
insert into balances values ('1', 'EUR', 650.5, '2020-04-22T16:11:32.904234Z');
insert into balances values ('2', 'USD', 900.75, '2020-04-22T16:12:43.504432Z');
insert into balances values ('2', 'EUR', 880.2, '2020-04-22T16:18:34.404665Z');
insert into balances values ('1', 'USD', 330.5, '2020-04-22T16:20:14.404997Z');
```

This provides us with a table with the following content:

| cust_id | balance_ccy | balance | ts                          |
| ------- | ----------- | ------- | --------------------------- |
| 1       | USD         | 600.5   | 2020-04-22T16:01:22.104234Z |
| 2       | USD         | 950     | 2020-04-22T16:03:43.504432Z |
| 2       | EUR         | 780.2   | 2020-04-22T16:08:34.404665Z |
| 1       | USD         | 1500    | 2020-04-22T16:11:22.704665Z |
| 1       | EUR         | 650.5   | 2020-04-22T16:11:32.904234Z |
| 2       | USD         | 900.75  | 2020-04-22T16:12:43.504432Z |
| 2       | EUR         | 880.2   | 2020-04-22T16:18:34.404665Z |
| 1       | USD         | 330.5   | 2020-04-22T16:20:14.404997Z |

### Single column

When `LATEST BY` is provided a single column is of type `SYMBOL`, the query will
end as soon as all distinct symbol values have been found.

```questdb-sql title="Latest records by customer ID"
SELECT * FROM balances
LATEST BY cust_id;
```

The query returns two rows with the most recent records per unique `cust_id`
value:

| cust_id | balance_ccy | balance | ts                          |
| ------- | ----------- | ------- | --------------------------- |
| 2       | EUR         | 880.2   | 2020-04-22T16:18:34.404665Z |
| 1       | USD         | 330.5   | 2020-04-22T16:20:14.404997Z |

### Multiple columns

When multiple columns are specified in `LATEST BY` queries, the returned results
are the most recent **unique combinations** of the column values. This example
query returns `LATEST BY` customer ID and balance currency:

```questdb-sql title="Latest balance by customer and currency"
SELECT cust_id, balance_ccy, balance
FROM balances
LATEST BY cust_id, balance_ccy;
```

The results return the most recent records for each unique combination of
`cust_id` and `balance_ccy`.

| cust_id | balance_ccy | balance | inactive | ts                          |
| ------- | ----------- | ------- | -------- | --------------------------- |
| 1       | EUR         | 650.5   | FALSE    | 2020-04-22T16:11:32.904234Z |
| 2       | USD         | 900.75  | FALSE    | 2020-04-22T16:12:43.504432Z |
| 2       | EUR         | 880.2   | FALSE    | 2020-04-22T16:18:34.404665Z |
| 1       | USD         | 330.5   | FALSE    | 2020-04-22T16:20:14.404997Z |

:::info

For single `SYMBOL` columns, QuestDB will know all distinct values upfront and
stop scanning table contents once the latest entry has been found for each
distinct symbol value. When `LATEST BY` is provided multiple columns, QuestDB
has to scan the entire table to find distinct combinations of column values.
Although scanning is fast, performance will degrade on hundreds of millions of
records. If there are multiple columns in the `LATEST BY` clause, this will
result in a full table scan.

:::

### Execution order

The following queries illustrate how to change the execution order in a query by
using brackets.

### WHERE first

```questdb-sql
SELECT * FROM balances LATEST BY cust_id
WHERE balance > 800;
```

This query executes `WHERE` before `LATEST BY` and returns the most recent
balance which is above 800. The execution order is as follows:

- filter out all balances below 800
- find the latest balance by `cust_id`

| cust_id | balance_ccy | balance | ts                          |
| ------- | ----------- | ------- | --------------------------- |
| 1       | USD         | 1500    | 2020-04-22T16:11:22.704665Z |
| 2       | EUR         | 880.2   | 2020-04-22T16:18:34.404665Z |

### LATEST BY first

```questdb-sql
(SELECT * FROM balances LATEST BY cust_id) --note the brackets
WHERE balance > 800;
```

This query executes `LATEST BY` before `WHERE` and returns the most recent
records , then filters out those below 800. The steps are

- Find the latest balances by customer ID
- Filter out balances below 800. Since the latest balance for customer 1 is
  equal to 330.5, it is filtered out in this step.

| cust_id | balance_ccy | balance | inactive | ts                          |
| ------- | ----------- | ------- | -------- | --------------------------- |
| 2       | EUR         | 880.2   | FALSE    | 2020-04-22T16:18:34.404665Z |

## Syntax

![Flow chart showing the syntax of the LATEST BY keyword](/img/docs/diagrams/latestBy.svg)
