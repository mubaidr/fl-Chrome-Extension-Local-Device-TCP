import type { PrinterObject } from '@/types'

export {}

export async function sendTcpCommands(
  printer: PrinterObject,
  commands: Array<string>
) {
  const { privateipaddress } = printer

  // TODO: send tcp command to printer
}
