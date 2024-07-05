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
      const {
        printerid,
        command,
        headers,
        body = {},
        method = 'POST',
        path,
      } = commands[i]
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

      const { privateipaddress, registrationnumber, ssl = true } = printer
      const normalizedPath = path.charAt(0) === '/' ? path : `/${path}`
      const url = `http${ssl ? 's' : ''}://${privateipaddress}${normalizedPath}`

      const formData = new FormData()

      // formData.append('command', command)
      // formData.append('registrationnumber', command)

      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const response = await fetch(url, {
        method,
        headers: {
          Accept: 'text/*',
          // 'X-Registration-Number': registrationnumber,
          ...headers,
        },
        body: formData,
        signal: AbortSignal.timeout(5000),
      })

      if (response.status === 200) {
        results.push({
          data: await response.text(),
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
