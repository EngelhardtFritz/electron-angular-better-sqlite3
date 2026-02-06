#!/usr/bin/env node

const spawn = require('child_process').spawn;
const chokidar = require('chokidar');
const kill = require('tree-kill');
const path = require('path');

class ElectronForgeWatcher {
  static launch = () => {
    this.args = process.argv;
    this.command = this.args[2];
    this.cwd = process.cwd();
    this.watchPaths = [
      path.join(this.cwd, './workspaces/electron-app/src/**/*.ts'),
      path.join(this.cwd, './workspaces/shared-lib/dist/**/*.ts'),
    ];
    this.ignoredPaths = '**/node_modules/*';

    ElectronForgeWatcher.watch();
    ElectronForgeWatcher.reload();
  };

  static reload = () => {
    if (this.childProcess) kill(this.childProcess.pid);
    this.childProcess = spawn('npm run start:electron', [], {
      shell: true,
      stdio: 'inherit',
    });
  };

  static watch = () => {
    chokidar
      .watch(this.watchPaths, {
        ignored: this.ignoredPaths,
        ignoreInitial: true,
      })
      .on('all', () => {
        this.reload();
      });
  };
}

ElectronForgeWatcher.launch();
