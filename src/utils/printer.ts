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
  const results: Array<Response | Error> = []

  for (let i = 0; i < commands.length; i++) {
    try {
      const { printerid, command, headers, body, method, path } = commands[i]
      const printer = await getPrinterById(printerid)

      if (!printer) {
        results.push(new Error('Printer not found'))
        continue
      }

      const { privateipaddress, registrationnumber } = printer
      const url = `http://${privateipaddress}/${path}`

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
        results.push(await response.json())
        continue
      }

      results.push(new Error(response.statusText))
    } catch (err) {
      console.error(err)
      results.push(err as Error)
    }
  }

  return results
}
