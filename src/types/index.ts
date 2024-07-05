export interface PrinterObject {
  printerid: string | number
  name: string
  model: string
  privateipaddress: string
  registrationnumber: string
  ssl?: boolean
}

export interface PrinterCommand {
  // id: string
  // source?: string
  printerid: string | number
  command: string
}

export interface PrinterWebCommand extends PrinterCommand {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  headers?: Record<string, string>
  body?: {
    [key: string]: any
  }
}
