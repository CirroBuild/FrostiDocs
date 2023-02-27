---
title: FAQ
description: FAQ for Frosti troubleshooting.
---

The following document contains common hardware and software configuration
issues met when running Frosti, as well as solutions to them.

## Frosti provision can't access my subscription?

Run Az Account List and make sure you see the subscription you intend to use. If you see a different set of subscriptions, you may be signed in to a different Azure tenant / directory. Use az login to sign in to the right one.

## PPE pipeline fails on first run with "resource doesn't exist error"

Wait 10 minutes and make another commit to run the pipeline. Sometimes resources take awhile to be created.

