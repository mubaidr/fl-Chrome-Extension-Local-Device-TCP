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
          type: 'EXECUTE_COMMAND'
          data: {
            commands: Array<PrinterWebCommand>
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

    if (type === 'EXECUTE_COMMAND') {
      console.log('COMMAND received from content-script', data)
      const { commands } = data

      if (!data || !commands || commands.length === 0) {
        return sendResponse()
      }

      const result = await processPrinterCommands(commands)

      return sendResponse(result)
    }

    return sendResponse()
  })()

  return true
})
