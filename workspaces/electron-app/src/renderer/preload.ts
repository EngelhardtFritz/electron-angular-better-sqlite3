// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { WindowApiConst } from 'shared-lib';

contextBridge.exposeInMainWorld('api', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  send: <In>(channel: string, input: In) => {
    if (WindowApiConst.SENDING_SAFE_CHANNELS.includes(channel)) {
      ipcRenderer.send(channel, input);
    }
  },
  receive: <Out>(channel: string, callback: (output: Out) => void) => {
    // Strip event as it includes `sender`
    ipcRenderer.on(channel, (_event: IpcRendererEvent, ...parameters: any[]) =>
      callback(parameters[0])
    );
  },
  invoke: <In>(channel: string, input: In) => {
    if (WindowApiConst.INVOKING_SAFE_CHANNELS.includes(channel)) {
      return ipcRenderer.invoke(channel, input);
    }
    return null;
  },
  // Exposing variables and functions is possible
});

console.log('[Preload.ts] The preload script has been loaded successfully.');
