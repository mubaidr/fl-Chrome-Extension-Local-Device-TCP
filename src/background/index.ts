import type { PrinterObject, PrinterWebCommand } from '@/types'

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
          type: 'TEST'
          data: undefined
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
            commands: Array<PrinterWebCommand>
          }
        }

    if (type === 'TEST') {
      return sendResponse({
        data: 'OK',
      })
    }

    if (type === 'CONFIG') {
      await chrome.storage.local.set({ printers: data.printers })

      return sendResponse({
        data: 'OK',
      })
    }

    if (type === 'COMMAND') {
      const { commands } = data

      const result = await processPrinterCommands(commands)

      return sendResponse({
        data: result,
      })
    }

    return sendResponse()
  })()

  return true
})
