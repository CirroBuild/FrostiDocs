# Frosti Docs

[This website](https://frostibuild.com) is built using
[Docusaurus 2](https://v2.docusaurus.io/). Pages & components are written in
TypeScript, the styles in vanilla CSS with variables using
[CSS Modules](https://github.com/css-modules/css-modules).

The doc site was forked from [QuestDb](https://github.com/questdb/questdb.io). Thanks!

## Installation

```script
yarn
```

Note. On Linux you may have to install `autoconf` package to have a successful
installation. On Ubuntu it should be enough to run
`sudo apt-get install autoconf` command to install the package.

## Local development

```script
yarn start
```

This command starts a local development server and open up a browser window.
Most changes are reflected live without having to restart the server.

## Build for production

```script
yarn build
```

This command generates static content into the `build` directory and can be
served using any static contents hosting service. For that purpose, you can also
use:

```script
yarn serve
```

## Legal Notice

When contributing to this project, you must agree that you have authored 100% of
the content, that you have the necessary rights to the content and that the
content you contribute may be provided under the project license.
