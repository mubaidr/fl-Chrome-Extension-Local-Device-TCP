import type { PrinterObject } from '@/types'

export {}

async function connectToTcpServer() {
  // chrome.sockets.tcp.create({}, function (createInfo) {
  //   chrome.sockets.tcp.connect(
  //     createInfo.socketId,
  //     IP,
  //     PORT,
  //     onConnectedCallback
  //   )
  // })
}

export async function sendCommandsToTcpServer(
  printer: PrinterObject,
  commands: Array<string>
) {
  const { privateipaddress } = printer

  // TODO: send tcp command to printer
}
