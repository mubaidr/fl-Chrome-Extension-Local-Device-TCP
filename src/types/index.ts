export interface PrinterObject {
  printerid: string | number
  name: string
  model: string
  privateipaddress: string
  registrationnumber: string
  ssl?: boolean
}

export interface PrinterCommand {
  printerid: string | number
  commandid: string | number
}

export interface PrinterWebCommand extends PrinterCommand {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  headers?: Record<string, string>
  body?: any
}
