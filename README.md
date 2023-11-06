![Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2FEngelhardtFritz%2Fmanga-reader%2Fraw%2Fmain%2Fpackage.json&query=%24.version)
![Release](https://github.com/EngelhardtFritz/manga-reader/actions/workflows/release.yml/badge.svg)
![Semantic Release](https://github.com/EngelhardtFritz/manga-reader/actions/workflows/release.yml/badge.svg)

# YourElectronApp

This is a template repository for desktop app creation with [electron (v27)](https://www.electronjs.org/de/), [angular (v16)](https://angular.io/) and [better-sqlite3 (v8)](https://github.com/WiseLibs/better-sqlite3).

It includes a fully (opinionated) pre configured project setup with the following:
| Package | Usage | Available Commands (check/fixup) |
| ----------- | ----------- | ----------- |
| [prettier](https://prettier.io/) | Checks and formats all `.js`,`.jsx`,`.ts`,`.tsx`,`.json`,`.html`,`.md` files | `npm run prettier` /<br/> `npm run prettier:fix` |
| [stylelint](https://stylelint.io/) | Checks and fixes all `.ts` files. | `npm run stylelint` /<br/> `npm run stylelint:fix` |
| [eslint](https://eslint.org/) | Checks and fixes all `.css`,`.scss`,`.sass` files. | `npm run lint` /<br/> `npm run lint:fix` |

## Quickstart

The most important scripts to run the app are listed in the _`DEV SCRIPTS`_ and the _`PROD SCRIPTS`_ sections.

Using the `start` script all code will be compiled in watch mode so the app recompiles on any code changes.

### Workspaces

The app provides a set of three pre-defined workspaces:

1. The `workspaces/angular-app` contains the main frontend application code.
2. The `workspaces/electron-app` contains all code relevant for electron and the main and renderer and IPC communication.
3. The `workspaces/shared-lib` includes all code relevant for both the angular and the electron workspace.

## How To's

### How to Release

To create new releases the workflow defined in _.github/workflows/semantic-release-main.yml_ has to be executed.
