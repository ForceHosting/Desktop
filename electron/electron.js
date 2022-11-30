const path = require('path');
const { app, BrowserWindow, remote, ipcMain } = require('electron');
const isDev = require('electron-is-dev');


let mainWindow;
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true,
      preload: isDev
        ? path.join(app.getAppPath(), './public/preload.js')
        : path.join(app.getAppPath(), './build/preload.js'),
    },
    
  });
  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
console.log(BrowserWindow.getAllWindows())


const DiscordRPC = require('discord-rpc')
// Set this to your Client ID.
const clientId = '895694315492343832';
// Only needed if you want to use spectate, join, or ask to join
DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

async function setActivity(status) {
  // You'll need to have snek_large and snek_small assets uploaded to
  // https://discord.com/developers/applications/<application_id>/rich-presence/assets
  rpc.setActivity({
    details: `${status}`,
    state: `v3 ALPHA`,
    largeImageKey: 'force',
    largeImageText: 'Force Host DAv3',
    instance: false,
    buttons: [
      { label: 'Start Hosting Today!', url: 'https://my.forcehost.net'},
      { label: '🎄Merry Christmas', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
    ]
  });
}

ipcMain.handle('get-web-name', (event, args) => {
  setActivity(args)
})

rpc.on('ready', () => {
  setTimeout(() => {
    setActivity(`Initializing`)}, 5000
  )
});

rpc.login({ clientId }).catch(console.error);