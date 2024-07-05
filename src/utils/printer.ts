import type { PrinterObject, PrinterWebCommand } from '@/types'

export async function getAllPrinters() {
  const { printers } = (await chrome.storage.local.get('printers')) as {
    printers: Array<PrinterObject> | null
  }

  return printers
}

export async function getPrinterById(
  id: string,
  printers: Array<PrinterObject> | null = null
) {
  if (!printers) {
    printers = await getAllPrinters()
  }

  if (!printers || printers.length === 0) {
    return
  }

  return printers.find((printer) => printer.printerid === id)
}

export async function processPrinterCommands(
  commands: Array<PrinterWebCommand>
) {
  const results: Array<
    | { data: any }
    | {
        error: {
          name?: string
          message: string
          stack?: string
        }
      }
  > = []

  for (let i = 0; i < commands.length; i++) {
    try {
      const { printerid, command, headers, body, method, path } = commands[i]
      const printer = await getPrinterById(printerid)

      if (!printer) {
        results.push({
          error: {
            message: `Printer with ${printerid} not found`,
            stack:
              'Please make sure, printer config is set. You can set it using "CONFIG" command.',
          },
        })
        continue
      }

      const { privateipaddress, registrationnumber } = printer
      const normalizedPath = path.charAt(0) === '/' ? path : `/${path}`
      const url = `http://${privateipaddress}${normalizedPath}`

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Registration-Number': registrationnumber,
          ...headers,
        },
        body: JSON.stringify({
          ...body,
          command,
          registrationnumber,
        }),
        signal: AbortSignal.timeout(5000),
      })

      if (response.status === 200) {
        results.push({
          data: await response.json(),
        })
        continue
      }

      results.push({
        error: {
          message: response.statusText,
          stack: response.url,
        },
      })
    } catch (err) {
      console.error(err)

      const { name, message, stack } = err as Error

      results.push({
        error: {
          name,
          message,
          stack,
        },
      })
    }
  }

  return results
}
