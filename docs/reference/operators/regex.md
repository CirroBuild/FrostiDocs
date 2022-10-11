---
title: Regex operators
sidebar_label: Regex
description: Regex operators reference documentation.
---

This page describes the available operators to assist with performing pattern
matching via regular expressions.

## ~ (match)

`string ~ regex` - matches `string` value to regex

`symbol ~ regex` - matches `symbol` value to regex

[java.util.regex](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Pattern.html)

## !~ (does not match)

`string !~ regex` - checks if `string` value does not match regex

`symbol !~ regex` - checks if `symbol` value does not match regex

## LIKE / ILIKE

`(string) LIKE (pattern)` - returns true if the `string` value matches `pattern`, otherwise returns false (case sensitive match).

`(string) ILIKE (pattern)` - returns true if the `string` value matches `pattern`, otherwise returns false (case-insensitive match).

### Arguments

`string` is an expression that evaluates to the `string` data type.

`pattern` is a pattern which can contain wildcards like `_` and `%`.

### Return value

Return value type is `boolean`.

### Description

If the pattern doesn't contain wildcards, then the pattern represents the string itself.

The wildcards which can be used in pattern are interpreted as follows:
- `_` - matches any single character.
- `%` - matches any sequence of zero or more characters.

Wildcards can be used as follows:

|            query              | result  |
| ----------------------------- | ------- |
| SELECT 'quest' LIKE 'quest'   |  true   |
| SELECT 'quest' LIKE 'ques_'   |  true   |
| SELECT 'quest' LIKE 'que%'    |  true   |
| SELECT 'quest' LIKE '\_ues_'  |  true   |
| SELECT 'quest' LIKE 'q_'      |  false  |

`ILIKE` performs a case-insensitive match as follows:

|            query              | result  |
| ----------------------------- | ------- |
| SELECT 'quest' ILIKE 'QUEST'  |  true   |
| SELECT 'qUeSt' ILIKE 'QUEST'  |  true   |
| SELECT 'quest' ILIKE 'QUE%'   |  true   |
| SELECT 'QUEST' ILIKE '\_ues_' |  true   |

### Examples

#### LIKE

```questdb-sql 
SELECT * FROM trades
WHERE symbol LIKE '%-USD'
LATEST ON timestamp PARTITION BY symbol;
```

| symbol | side | price | amount | timestamp |
| --- | --- | --- | --- | --- |
| ETH-USD | sell | 1348.13 | 3.22455108 | 2022-10-04T15:25:58.834362Z |
| BTC-USD | sell | 20082.08 | 0.16591219 | 2022-10-04T15:25:59.742552Z |

#### ILIKE

```questdb-sql 
SELECT * FROM trades
WHERE symbol ILIKE '%-usd'
LATEST ON timestamp PARTITION BY symbol;
```

| symbol | side | price | amount | timestamp |
| --- | --- | --- | --- | --- |
| ETH-USD | sell | 1348.13 | 3.22455108 | 2022-10-04T15:25:58.834362Z |
| BTC-USD | sell | 20082.08 | 0.16591219 | 2022-10-04T15:25:59.742552Z |

## regexp_replace

`regexp_replace ( value1, text , value2 )` - provides substitution of new text for substrings that match regular expression patterns.We use Java regex syntax here.

**Arguments:**

- `value1` is any `string` value.
- `text` is  any regular expression pattern.
- `value2` is any `string` value.

**Return value:**

The source string is returned unchanged if there is no match to the pattern. If there is a match, the source string is returned with the replacement string substituted for the matching substring.

**Examples:**

```questdb-sql title="Example description -  regexp_replace"
SELECT REGEXP_REPLACE ('MYSQL is a great database', '^(\S*)', 'QuestDB');
```

```
QuestDB is a great database
```
