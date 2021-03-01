import { ipcMain } from 'electron';
import * as canvas from './canvasToken';

export default function ipcStuff() {
  ipcMain.handle('storeCanvasToken', async (_, args) => {
    await canvas.storeToken(args);
  });

  ipcMain.handle('getCanvasToken', async () => {
    return canvas.getToken();
  });

  ipcMain.handle('deleteCanvasToken', async () => {
    return canvas.deleteToken();
  });
}
