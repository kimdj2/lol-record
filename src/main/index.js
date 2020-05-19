'use strict'

import { app, BrowserWindow, Menu, Tray } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
const iconPath = path.join(__dirname, 'build/icons/icon.ico');

let mainWindow, tray
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)
  mainWindow.setMenuBarVisibility(false)

  mainWindow.on('closed', () => {
    mainWindow.minimize();
  })
  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '설정',
      click: function () {
        mainWindow.minimize();
      }
    },
    {
      label: '종료',
      click: function () {
        app.quit()
      }
    }
  ])
  tray.setToolTip('트레일아이콘')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    mainWindow.maximize();
    mainWindow.setAlwaysOnTop(true);
  })
  tray.on('right-click', () => {
    tray.popUpContextMenu();
  })
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
