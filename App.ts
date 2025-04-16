import {app, BrowserWindow, Menu, MenuItem, shell} from 'electron'
import * as path from 'path';

const menu = new Menu()
menu.append(new MenuItem({
    label: 'Electron',
    submenu: [
        {
            role: 'fileMenu',
        },
        {
            role: 'help',
            label: 'Open Gmail',
            accelerator: process.platform === 'darwin' ? 'Cmd+M' : 'Ctrl+M',
            click: () => { createWindow('https://mail.google.com') }
        },
        {
            role: 'help',
            label: 'Open Youtube Studio',
            accelerator: process.platform === 'darwin' ? 'Cmd+Y' : 'Ctrl+Y',
            click: () => { createWindow('https://studio.youtube.com') }
        },
    ]
}))

Menu.setApplicationMenu(menu)

function createWindow(url?: string) {
    const window = new BrowserWindow()

    if (url === undefined) {
        console.log(`Opening an empty window.`)
        window.loadFile(path.join(__dirname, 'new-window.html'))
    }
    else {
        console.log(`Opening URL in a new window: ${url}`)
        window.loadURL(url)
        window.maximize()
        window.webContents.setWindowOpenHandler(({url}) => {
            if (url.includes('google.com') && !url.startsWith('https://www.google.com/url')) {
                createWindow(url)
                return { action: 'deny' }
            } else {
                console.log(`Opening URL in default web browser: ${url}`)
                shell.openExternal(url)
                    .then(() => {})
                return { action: 'deny' }
            }
        })
    }

    return window
}

app.on('window-all-closed', () => {
    app.quit()
})

app.whenReady().then(() => {
    createWindow()
})
