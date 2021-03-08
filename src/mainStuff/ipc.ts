import { ipcMain } from 'electron';
import Store from 'electron-store';
import * as canvas from './canvasToken';

const store = new Store();

export default function ipcStuff() {
  ipcMain.handle('storeCanvasUrl', (_, args) => {
    console.log(args);
    store.set('good-day-canvas-Url', args);
  });

  ipcMain.handle('getCanvasUrl', () => {
    return store.get('good-day-canvas-Url');
  });

  ipcMain.handle('storeCanvasToken', async (_, args) => {
    await canvas.storeToken(args);
  });

  ipcMain.handle('getCanvasToken', async () => {
    return canvas.getToken();
  });

  ipcMain.handle('deleteCanvasUrl', () => {
    store.delete('good-day-canvas-Url');
  });

  ipcMain.handle('deleteCanvasToken', async () => {
    return canvas.deleteToken();
  });
}
