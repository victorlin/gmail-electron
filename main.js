const { app, BrowserWindow, session } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1300,
    height: 900,
    title: 'Gmail',
    webPreferences: {
      nodeIntegration: true,
    },
  })

  win.loadURL('https://www.gmail.com')
}

app.whenReady().then(createWindow).catch(e => console.log(e))

app.on('ready', async () => {
  try {
    await session.defaultSession.loadExtension('./extensions/simplify_gmail/')
  } catch(e) {
    console.log(e)
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
