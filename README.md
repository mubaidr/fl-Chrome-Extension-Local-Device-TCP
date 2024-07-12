# System Documentation

This documentation provides an overview of the build process, test process, publish and input/output interfaces of our system, focusing on interactions between the background and content scripts. It aims to help users understand how to interact with the system, what data to send, and what responses to expect.

## How to Build

### Prerequisites

- Node.js 20+
- npm 8+
- pnpm 9+

### Installation

To install the dependencies, execute the following commands in your terminal:

```bash
npm install -g pnpm
pnpm i
```

### Build Process

To build the project, execute the following commands in your terminal:

```bash
# for both chrome and firefox
pnpm build

# for chrome
pnpm build:chrome

# for firefox
pnpm build:firefox
```

This will generate the compiled files in the `dist` folder. The compiled files can be found in the:

- `dist/chrome` folder for Chrome, Edge, Opera, and other Chromium-based browsers.
- `dist/firefox` for Firefox

### Running the Project in Development Mode

To run the project in development mode, execute the following commands in your terminal:

```bash
pnpm dev
```

## How to Test the Extension

### Build Process

To build the extension, execute the following commands in your terminal:

```bash
pnpm install
pnpm run build
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

#### Check Config Status

You can check if the extension is loaded and ready to receive messages by sending a test message:

```typescript
{
  target: 'bookingfor-extension-v900', // this must be the target name of the extension, currently name is "bookingfor-extension-v900"
  type: 'STATUS',
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

In case of `STATUS` call, the response will be:

```typescript
{
  target: 'bookingfor-extension-v900', // this must be the target name of the extension, currently name is "bookingfor-extension-v900"
  type: 'STATUS_RESULT',
  data: Array<PrinterObject>
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

### Check Config Status

You can check if the extension is loaded and ready to receive messages by sending a test message:

```javascript
window.postMessage(
  {
    target: 'bookingfor-extension-v900', // this must be the target name of the extension, currently name is "bookingfor-extension-v900"
    type: 'STATUS',
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

## How to Modify

### Flow

The extension follows a simple flow:

1. The content script listens for messages from the webpage.
2. The content script forwards the messages to the background script.
3. The background script processes the messages and sends back the results.
4. The content script receives the results and forwards them to the webpage.

### Background Script

The background script is responsible for managing the extension's state and handling messages from the content script. You can modify the background script by editing the `src/background/index.ts` file.

### Content Script

The content script is responsible for relaying messages from the webpage to the background script. You can modify the content script by editing the `src/content/index.ts` file.

### Popup Script

The popup script is responsible for managing the extension's popup window. You can modify the popup script by editing the `src/popup/pages/index.vue` for the popup window content.

## How to Publish

### Chrome

1. Zip the `dist/chrome` folder.
2. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
3. Click on the "Add new item" button.
4. Upload the zip file.
5. Fill in the required details.
6. Click on the "Publish" button.

### Firefox

1. Zip the `dist/firefox` folder.
2. Go to the [Firefox Add-ons Developer Hub](https://addons.mozilla.org/en-US/developers/).
3. Click on the "Submit a New Add-on" button.
4. Upload the zip file.
5. Fill in the required details.
6. Click on the "Submit Version" button.

### Other Chromium Based Browsers

1. Zip the `dist/chrome` folder.
2. Go to the browser's extension store.
3. Upload the zip file.
4. Fill in the required details.
5. Click on the "Publish" button.

## Support

This concludes the documentation. Should you have any further questions or require additional assistance, please do not hesitate to contact.
