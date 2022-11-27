import { shell, app } from "electron"
import { ALLOWED_HOSTS, deviceBusyRead, deviceBusyWrite, setShouldShowWindow, windows } from "./globalState"
import { queueIpcEvent } from "./helpers/utils"
import { stopTcpBridge } from "./tcpBridge"
import { skipUpdateCheckCompleted } from "./updaterListeners"

export const startWindowListeners = () => {
    windows.mainWindow?.removeAllListeners('closed')
    windows.mainWindow?.removeAllListeners('ready-to-show')

    windows.mainWindow?.on('closed', () => {
        if (windows.mainWindow) {
            windows.mainWindow.destroy()
            windows.mainWindow = undefined
        }
    })

    windows.mainWindow?.on('close', async (e) => {
        setInterval( async () => {
            await stopTcpBridge()
            app.quit()
        }, 1000)

        queueIpcEvent('appClosing', {})
        return e.preventDefault()
    })

    windows.mainWindow?.once('ready-to-show', () => {
        setShouldShowWindow(true)
        if (skipUpdateCheckCompleted) windows.mainWindow?.show()
    })

    windows.mainWindow?.webContents.setWindowOpenHandler(({ url }) => {
        let urlObj = new URL(url)
        let urlHost = urlObj.hostname;
        if (ALLOWED_HOSTS.includes(urlHost)) return { action: 'allow' }
        shell.openExternal(url)
        return { action: 'deny' }
    })

    windows.mainWindow?.webContents.on("will-navigate", (event, url) => {
        let urlObj = new URL(url);
        let urlHost = urlObj.hostname;
        if (!ALLOWED_HOSTS.includes(urlHost)) {
            event.preventDefault()
            shell.openExternal(url)
        }
    })
}