import type { PrinterObject } from '@/types'

export async function sendPrinterCommands(
  printer: PrinterObject,
  commands: Array<string>
) {
  const { privateipaddress, model } = printer

  // TODO: confirm type of communication required

  // const results = await sendWebCommands(printer, commands)
  const results = await sendTcpCommands(printer, commands)

  return results
}
