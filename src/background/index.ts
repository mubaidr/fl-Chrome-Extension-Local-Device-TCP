import type { PrinterObject } from '@/types'

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}

console.log('hello world from background')

export {}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  ;(async () => {
    const { type, data } = request as
      | {
          type: 'GET_PRINTERS'
          data: null
        }
      | {
          type: 'CONFIG'
          data: {
            printers: Array<PrinterObject>
          }
        }
      | {
          type: 'COMMAND'
          data: {
            commands: Array<string>
            printerid: string
          }
        }

    if (type === 'GET_PRINTERS') {
      const printers = (await chrome.storage.local.get(
        'printers'
      )) as Array<PrinterObject> | null

      return sendResponse(printers)
    }

    if (type === 'CONFIG') {
      console.log('CONFIG received from content-script', data)
      await chrome.storage.local.set({ printers: data.printers })

      return sendResponse()
    }

    if (type === 'COMMAND') {
      console.log('COMMAND received from content-script', data)
      const { commands, printerid } = data
      const printers = (await chrome.storage.local.get(
        'printers'
      )) as Array<PrinterObject> | null

      if (!printers || printers.length === 0) {
        return sendResponse()
      }

      const printer = printers.find(
        (printer) => printer.printerid === printerid
      )

      if (!printer) {
        return sendResponse()
      }

      const result = await sendPrinterCommands(printer, commands)

      return sendResponse(result)
    }

    sendResponse()
  })()

  return true
})
