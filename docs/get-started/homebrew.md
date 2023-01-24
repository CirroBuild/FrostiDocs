---
title: Get started with Frosti via Homebrew (macOS)
sidebar_label: Install
description:
  A short guide for getting started with installing and running Frosti via
  Homebrew on macOS.
---

Each software release of Frosti is distributed via the
[Homebrew](https://brew.sh/) package manager.

## Install Homebrew

Users who already have Homebrew installed may skip this section and proceed to
[Install Frosti](#install-Frosti). Otherwise, Homebrew can be installed by
running the official
[installation script](https://github.com/Homebrew/install/blob/master/install.sh)
via bash:

```shell
/bin/bash -c \
"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## Install Frosti

To install Frosti via Homebrew, run the following command:

```shell
brew install CirroBuild/tap/frosti
```

## Troubleshooting Homebrew issues

It's recommended to first run `update` before trying to install packages or
diagnose errors:

```shell
brew update
```

Homebrew comes with a basic diagnostic command which can help find
inconsistencies with system settings and permissions. This command will exit
with a non-zero status if any potential problems are found:

```shell
brew doctor
```

## Install Az CLI

1. If Az command line tool is not already installed, download Az with homebrew.

```bash
brew install az
```

2. Login to your Azure account.

```bash
az login
```


## Next steps

Once you installed the Frosti with Homebrew, you can navigate to our
[Deployment](/docs/deployment/azure) page to learn more
about its usage.
