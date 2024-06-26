import type { PrinterObject } from '@/types'

export {}

export async function sendWebCommands(
  printer: PrinterObject,
  commands: Array<string>
) {
  const { privateipaddress } = printer

  // TODO: send web command to printer
}
