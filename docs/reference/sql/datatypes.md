---
title: Data types
sidebar_label: Data types
description: Data types reference documentation.
---

The type system is derived from Java types.

| Type Name         | Storage bits | Nullable | Description                                                                                                                                                                                                                                                         |
| ----------------- | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `boolean`         | `1`          | No       | Boolean `true` or `false`.                                                                                                                                                                                                                                          |
| `byte`            | `8`          | No       | Signed integer `-128` to `127`.                                                                                                                                                                                                                                     |
| `short`           | `16`         | No       | Signed integer `-32768` to `32767`.                                                                                                                                                                                                                                 |
| `char`            | `16`         | No       | `unicode` character.                                                                                                                                                                                                                                                |
| `int`             | `32`         | Yes      | Signed integer `0x80000000` to `0x7fffffff`.                                                                                                                                                                                                                        |
| `float`           | `32`         | Yes      | Single precision IEEE 754 floating point value.                                                                                                                                                                                                                     |
| `symbol`          | `32`         | Yes      | Symbols are stored as 32-bit signed indexes from symbol table. Each index will have a corresponding `string` value. Translation from index to string value is done automatically when data is being written or read. Symbol table is stored separately from column. |
| `string`          | `32+n*16`    | Yes      | Length-prefixed sequence of UTF-16 encoded characters whose length is stored as signed 32-bit integer with maximum value of `0x7fffffff`.                                                                                                                           |
| `long`            | `64`         | Yes      | Signed integer `0x8000000000000000L` to `0x7fffffffffffffffL`.                                                                                                                                                                                                      |
| `date`            | `64`         | Yes      | Signed offset in **milliseconds** from [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time).                                                                                                                                                                       |
| `timestamp`       | `64`         | Yes      | Signed offset in **microseconds** from [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time).                                                                                                                                                                       |
| `double`          | `64`         | Yes      | Double precision IEEE 754 floating point value.                                                                                                                                                                                                                     |
| `binary`          | `64+n*8`     | Yes      | Length-prefixed sequence of bytes whose length is stored as signed 64-bit integer with maximum value of `0x7fffffffffffffffL`.                                                                                                                                      |
| `long256`         | `256`        | Yes      | Unsigned 256-bit integer. Does not support arbitrary arithmetic operations, but only equality checks. Suitable for storing hash code, such as crypto public addresses.                                                                                              |
| `geohash(<size>)` | `8`-`64`     | Yes      | Geohash with precision specified as a number followed by `b` for bits, `c` for chars. See [the geohashes documentation](/docs/concept/geohashes) for details on use and storage.                                                                                   |

## Variable-sized type limitations

`BINARY` field size is limited either by 64-Bit signed int (8388608 peta bytes)
or disk size, whichever is smaller.

`STRING` field size is limited by either 32-bit signed int (1073741824
characters) or disk size, whichever is smaller.

## Type nullability

Numeric nullable types, such as `int` or `double`, use a special number to mark
`NULL` values. Signed integer types use the minimal number from the allowed
range to mark a `NULL`. Here are the values used for `NULL` in numeric types:

- **`int`:** `0x80000000`
- **`long`:** `0x8000000000000000L`
- **`float`:** `NaN`
- **`double`:** `NaN`

As an important consequence, `NULL` values of nullable types still occupy disk
space.
