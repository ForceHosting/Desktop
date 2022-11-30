const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getWebTitle: (args) => ipcRenderer.invoke('get-web-name', args)
});