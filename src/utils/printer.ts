import type { PrinterObject, PrinterWebCommand } from '@/types'

export async function getAllPrinters() {
  const { printers } = (await chrome.storage.local.get('printers')) as {
    printers: Array<PrinterObject> | null
  }

  return printers
}

export async function getPrinterById(
  id: string | number,
  printers: Array<PrinterObject> | null = null
) {
  if (!printers) {
    printers = await getAllPrinters()
  }

  if (!printers || printers.length === 0) {
    return
  }

  // eslint-disable-next-line eqeqeq
  return printers.find((printer) => printer.printerid == id)
}

export async function processPrinterCommands(
  commands: Array<PrinterWebCommand>
) {
  const results: Array<
    | {
        printerid: string | number
        commandid: string | number
        data: any
      }
    | {
        printerid: string | number
        commandid: string | number
        error: {
          message: string
          stack?: string
        }
      }
  > = []

  for (let i = 0; i < commands.length; i++) {
    const {
      printerid,
      commandid,
      headers,
      body,
      method = 'POST',
      path,
    } = commands[i]
    const printer = await getPrinterById(printerid)

    if (!printer) {
      results.push({
        printerid,
        commandid,
        error: {
          message: `Printer with ${printerid} not found`,
          stack:
            'Please make sure, printer config is set. You can set it using "CONFIG" command.',
        },
      })
      continue
    }

    const { privateipaddress, ssl = true } = printer
    const normalizedPath = path.charAt(0) === '/' ? path : `/${path}`
    const url = `http${ssl ? 's' : ''}://${privateipaddress}${normalizedPath}`

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
        signal: AbortSignal.timeout(5000),
      })

      if (response.status === 200) {
        results.push({
          printerid,
          commandid,
          data: await response.text(),
        })
        continue
      }

      results.push({
        printerid,
        commandid,
        error: {
          message: response.statusText,
          stack: response.url,
        },
      })
    } catch (err) {
      console.error(err)

      const { message, stack } = err as Error

      results.push({
        printerid,
        commandid,
        error: {
          message,
          stack,
        },
      })
    }
  }

  return results
}
