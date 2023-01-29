---
title: Get started by Installing Frosti
sidebar_label: Install
description:
  A short guide for getting started with installing and running Frosti via
  Homebrew on macOS or Scoop on windows.
---

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"


<Tabs defaultValue="mac" values={[
  { label: "Mac", value: "mac" },
  { label: "Windows", value: "windows" },
]}>

<TabItem value="mac">

<br />

## Install Homebrew

Users who already have [Homebrew](https://brew.sh/) installed may skip this section and proceed to
[Install Frosti](#install-Frosti). Otherwise, Homebrew can be installed by
running the official
[installation script](https://github.com/Homebrew/install/blob/master/install.sh)
via the terminal:

```shell
/bin/bash -c \
"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## Install Frosti

To install Frosti via Homebrew, run the following command:

```shell
brew install CirroBuild/tap/frosti
```

## Install the Azure CLI

1. If Az command line tool is not already installed, download Az with homebrew.

```bash
brew install az
```

2. Login to your Azure account.

```bash
az login
```

</TabItem>


<TabItem value="windows">

<br />

## Install Scoop

Users who already have [Scoop](https://https://scoop.sh/) installed may skip this section and proceed to
[Install Frosti](#install-Frosti). Otherwise, Scoop via powershell.

```shell
> Set-ExecutionPolicy RemoteSigned -Scope CurrentUser # Optional: Needed to run a remote script the first time
> irm get.scoop.sh | iex
```

Respond 'Yes' to the execution poilcy risk.

<br />

## Install Frosti

To install Frosti via Homebrew, run the following command:

```shell
scoop bucket add frosti https://github.com/CirroBuild/frosti-bucket
scoop install frosti
```

<br />

## Install the Azure CLI

1. Download and install the [azure cli](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli) if you don't have it already.

2. Login to your Azure account.

```bash
az login
```

</TabItem>
</Tabs>


## Next steps

Once you installed the Frosti with Homebrew, you can navigate to our
[Deployment](/docs/deployment/azure) page to learn more
about its usage.
