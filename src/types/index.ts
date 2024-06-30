export interface PrinterObject {
  printerid: string
  name: string
  model: string
  privateipaddress: string
  registrationnumber: string
}

export interface PrinterCommand {
  // id: string
  // source?: string
  printerid: string
  command: string
}

export interface PrinterWebCommand extends PrinterCommand {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  headers?: Record<string, string>
  body?: {
    [key: string]: any
  }
}
