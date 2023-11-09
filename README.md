![Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2FEngelhardtFritz%2Fmanga-reader%2Fraw%2Fmain%2Fpackage.json&query=%24.version)
![Release](https://github.com/EngelhardtFritz/manga-reader/actions/workflows/release.yml/badge.svg)
![Semantic Release](https://github.com/EngelhardtFritz/manga-reader/actions/workflows/semantic-release-main.yml/badge.svg)

# YourElectronApp

This is a template repository for desktop app creation with [electron (v27)](https://www.electronjs.org/de/), [angular (v16)](https://angular.io/) and [better-sqlite3 (v8)](https://github.com/WiseLibs/better-sqlite3).

It includes a fully (opinionated) pre configured project setup with the following:
| Package | Usage | Available Commands (check/fixup) |
| ----------- | ----------- | ----------- |
| [prettier](https://prettier.io/) | Checks and formats all `.js`,`.jsx`,`.ts`,`.tsx`,`.json`,`.html`,`.md` files | `npm run prettier` /<br/> `npm run prettier:fix` |
| [stylelint](https://stylelint.io/) | Checks and fixes all `.ts` files. | `npm run stylelint` /<br/> `npm run stylelint:fix` |
| [eslint](https://eslint.org/) | Checks and fixes all `.css`,`.scss`,`.sass` files. | `npm run lint` /<br/> `npm run lint:fix` |

### Workspaces

The app provides a set of three pre-defined workspaces:

1. The `workspaces/angular-app` contains the main frontend application code.
2. The `workspaces/electron-app` contains all code relevant for electron including main, renderer and IPC communication.
3. The `workspaces/shared-lib` includes all code relevant for both the angular and the electron workspace.

## Debugging the App

The angular-app template includes the [@ngrx](https://ngrx.io/) dependencies for reactive state management.

To debug the @ngrx state the [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=de) are required.
This tool has to be downloaded and the extension should be copied to `workspaces/electron-app/plugins`. Create the folder if it does not exist yet.

Adjust the path to the plugin in `workspaces/electron-app/src/main/windows/main.ts` where all plugins can be loaded. _**Important**_: Extensions should only be used in development for debugging purposes as they are out of scope for electron!

## Quickstart

Important scripts to run the app are listed in the _`DEV SCRIPTS`_ and the _`PROD SCRIPTS`_ sections.

Using the `start` script all code will be compiled in watch mode so the app recompiles on any code changes. The script `scripts/electron-forge-watcher.js` watches changes in the _shared-lib_ and _electron-app_ and recompiles the electron application.

## GitHub Workflow Templates

This repository includes two prepared workflows capable of creating releases for the Linux and Windows platforms.

### Semantic Release

[Semantic Release](https://github.com/semantic-release/semantic-release) is used to define the next app version to release. The `.releaserc.json` file includes the plugin configuration.
(Note: The initial version will always be _1.0.0_ so in case you need a release <_1.0.0_ you should use other plugins.)

To utilize Semantic Release your commits should follow the [Conventional Commit Guidelines](https://www.conventionalcommits.org/en/v1.0.0/).
When using this schema the workflows will automatically create/updage the `CHANGELOG.md` file depending on the commits included in a release.

Semantic Release will create a tag including the new version by following the [Semantic Versioning](https://semver.org/).

### Release

The release workflow currently executes the _package:prod_ script to build portable apps for the matrix of Linux and Windows.

The resulting folders are zipped and uploaded as a release directly to GitHub.
The release directly includes the relevant changelog parts as release notes taken from the release commit message.

## How To's

### How to Release

To create new releases the workflow defined in _.github/workflows/semantic-release-main.yml_ has to be executed. (Note: A new version is only created if the changes affect the semantic version of the app.)
