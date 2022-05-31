---
title: UPDATE keyword
sidebar_label: UPDATE
description: UPDATE SQL keyword reference documentation.
---

Updates data in a database table.

## Syntax

![Flow chart showing the syntax of the UPDATE keyword](/img/docs/diagrams/update.svg)

:::note

- the same `columnName` cannot be specified multiple times after the SET keyword as it would be ambiguous
- the designated timestamp column cannot be updated as it would lead to altering history of the time series data

:::

## Examples

```questdb-sql title="Update with constant"
UPDATE trades SET price = 125.34 WHERE symbol = 'AAPL';
```

```questdb-sql title="Update with function"
UPDATE book SET mid = (bid + ask)/2 WHERE symbol = 'AAPL';
```

```questdb-sql title="Update with join"
UPDATE spreads s SET s.spread = p.ask - p.bid FROM prices p WHERE s.symbol = p.symbol;
```

```questdb-sql title="Update with multiple joins"
UPDATE spreads s 
SET s.spread = p.ask - p.bid 
FROM prices p 
JOIN instruments i ON p.symbol = i.symbol
WHERE s.timestamp = p.timestamp AND i.type = 'BOND';
```

```questdb-sql title="Update with Common Table Expression"
WITH up AS (
    SELECT symbol, spread
    FROM temp_spreads
    WHERE timestamp between '2022-01-02' and '2022-01-03' 
)
UPDATE spreads s 
SET s.spread = up.spread
FROM up
WHERE s.timestamp = up.timestamp AND s.symbol = up.symbol;
```
