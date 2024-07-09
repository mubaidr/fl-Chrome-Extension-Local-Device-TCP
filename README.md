# System Documentation

This documentation provides an overview of the input/output interfaces of our system, focusing on interactions between the background and content scripts. It aims to help users understand how to interact with the system, what data to send, and what responses to expect.

## How to Test the Extension

### Build Process

To build the extension, execute the following commands in your terminal:

```bash
npm install
npm run build
```

### Running the Extension

To run the extension in your Chrome browser:

1. Open Chrome.
2. Navigate to the extension manager (`chrome://extensions/`).
3. Enable Developer Mode.
4. Click on "Load unpacked".
5. Select the `dist/chrome` folder in your project directory.

Note: `dist/firefox` for firefox browser

## How It Works

It listens for messages from the window object and forwards them to the background script for processing. The content script communicates with the background script to relay messages and receive results.

### Input Event Data

#### Check Extension Status

You can check if the extension is loaded and ready to receive messages by sending a test message:

```typescript
{
  target: 'bookingfor-extension-v900', // this must be the target name of the extension, currently name is "bookingfor-extension-v900"
  type: 'TEST',
}
```

#### Printer Configuration

This will save the printer configuration in the extension. The configuration will be used to execute commands on the printers.

```typescript
{
  target: 'bookingfor-extension-v900', // this must be the target name of the extension, currently name is "bookingfor-extension-v900"
  type: 'CONFIG',
  data: {
    printers: Array<PrinterObject>
  }
}
```

#### Execute Commands

This will execute the commands on the printers. The commands will be executed in the order they are received.

```typescript
{
  target: 'bookingfor-extension-v900', // this must be the target name of the extension, currently name is "bookingfor-extension-v900"
  type: 'COMMAND',
  data: {
    commands: Array<PrinterWebCommand>
  }
}
```

### Output Event Data

The background script will respond with results encapsulated in the following structure:

```typescript
{
  target: 'bookingfor-extension-v900', // this must be the target name of the extension, currently name is "bookingfor-extension-v900"
  type: 'COMMAND_RESULT',
  data: { // result from the background script
    results: Array<
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
  >
  }
}
```

In case of `TEST`/ `CONFIG` call, the response will be:

```typescript
{
  target: 'bookingfor-extension-v900', // this must be the target name of the extension, currently name is "bookingfor-extension-v900"
  type: 'TEST_RESULT' | 'CONFIG_RESULT',
  data: 'OK'
}
```

## Types

### PrinterObject

Represents a printer with its details.

```typescript
export interface PrinterObject {
  printerid: string | number
  name: string
  model: string
  privateipaddress: string
  registrationnumber: string
  ssl?: boolean // true or missing => https otherwsie http
}
```

### PrinterCommand

Represents a command to be executed on a printer.

```typescript
export interface PrinterCommand {
  printerid: string | number
  commandid: string | number
}
```

### PrinterWebCommand

Extends `PrinterCommand` with additional web-specific fields.

```typescript
export interface PrinterWebCommand extends PrinterCommand {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' // default POST
  path: string
  headers?: Record<string, string>
  body?: any
}
```

## Example Usage

### Check Extension Status

You can check if the extension is loaded and ready to receive messages by sending a test message:

```javascript
window.postMessage(
  {
    target: 'bookingfor-extension-v900', // this must be the target name of the extension, currently name is "bookingfor-extension-v900"
    type: 'TEST',
  },
  '*'
)
```

### Configuring Printers

You can send printer configurations to the extension using the `window.postMessage` method from your webpage:

```javascript
window.postMessage(
  {
    target: 'bookingfor-extension-v900', // this must be the target name of the extension, currently name is "bookingfor-extension-v900"
    type: 'CONFIG',
    data: {
      printers: [
        {
          printerid: '1',
          name: 'Printer 1',
          model: 'Epson',
          privateipaddress: '172.16.1.1',
          registrationnumber: '123',
          ssl: true, // optional, default true
        },
        {
          printerid: '2',
          name: 'Printer 2',
          model: 'Epson Oty',
          privateipaddress: '172.16.1.2',
          registrationnumber: '124',
          ssl: false,
        },
      ],
    },
  },
  '*'
)
```

### Executing Commands

You can execute commands on the printers using the `window.postMessage` method:

```javascript
window.postMessage(
  {
    target: 'bookingfor-extension-v900', // this must be the target name of the extension, currently name is "bookingfor-extension-v900"
    type: 'COMMAND',
    data: {
      commands: [
        {
          printerid: '1',
          commandid: '1001',
          method: 'POST', // optional, default POST
          path: '/print',
          headers: {
            'Content-Type': 'application/json',
          },
          body: 'Hello, World!', // any data matching the content-type header
        },
      ],
    },
  },
  '*'
)
```

Note: By default, a 5 sec timeout has been set for commands execution.

### Receiving Results

The extension will respond with the results of the executed commands:

```javascript
window.addEventListener('message', (event) => {
  if (
    event.data.target === 'bookingfor-extension-v900' &&
    event.data.type.includes('RESULT')
  ) {
    console.log('Result:', event.data.data) // in case of status check, this will log 'Result: 'OK''
    // you need to handle responses here
    // this is array of results for each command
    // if error is present, it means command failed
    // commandid is the id you sent in the command
    // printerid is the id of the printer on which command was executed
  }
})
```

---

This concludes the documentation. Should you have any further questions or require additional assistance, please do not hesitate to contact.
