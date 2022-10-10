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