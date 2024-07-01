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
          data?: any
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

    if (type === 'TEST') {
      return sendResponse(data || 'ok')
    }

    if (type === 'CONFIG') {
      console.log('CONFIG received from content-script', data)
      await chrome.storage.local.set({ printers: data.printers })

      return sendResponse('ok')
    }

    if (type === 'EXECUTE_COMMAND') {
      console.log('COMMAND received from content-script', data)
      const { commands } = data

      if (!data || !commands || commands.length === 0) {
        return sendResponse(new Error('Invalid command'))
      }

      const result = await processPrinterCommands(commands)

      return sendResponse(result)
    }

    return sendResponse()
  })()

  return true
})
