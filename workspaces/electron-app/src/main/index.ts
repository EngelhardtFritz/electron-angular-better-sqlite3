import 'reflect-metadata';
import { app } from 'electron';
import { container } from 'tsyringe';
import { Main } from './windows/main';
import { StartupService } from './base/startup/startup.service';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const main = container.resolve(Main);
main.init();

const startupService = container.resolve(StartupService);
startupService.doWork();
