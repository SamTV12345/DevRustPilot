export const exec = (key:string, channelCallback:string) => window.electron.ipcRenderer.sendMessage('store-retrieve', [key, channelCallback]);
