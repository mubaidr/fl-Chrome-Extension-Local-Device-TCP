// chrome.runtime.onInstalled.addListener(async (opt) => {
//   // Check if reason is install or update. Eg: opt.reason === 'install' // If extension is installed.
//   // opt.reason === 'update' // If extension is updated.
//   if (opt.reason === 'install') {
//     await chrome.storage.local.clear()

import type { PrinterObject } from '@/types'

//     chrome.tabs.create({
//       active: true,
//       // Open the setup page and append `?type=install` to the URL so frontend
//       // can know if we need to show the install page or update page.
//       url: chrome.runtime.getURL('./src/setup/index.html?type=install'),
//     })
//   }

//   if (opt.reason === 'update') {
//     chrome.tabs.create({
//       active: true,
//       url: chrome.runtime.getURL('./src/setup/index.html?type=update'),
//     })
//   }
// })

// console.log('hello world from background')

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}

export {}

async function getPrinters(): Promise<PrinterObject[]> {
  // const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  // if (!tab?.id) {
  //   return []
  // }

  // const result = await chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   func: () => (window as any).currentPrinters,
  // })

  // console.log('result', result)

  // return result[0].result || []
  return [
    {
      printerid: '1',
      name: 'Printer 2',
      model: 'Model 1',
      privateipaddress: '172.16.99.01',
      registrationnumber: '0001',
    },
    {
      printerid: '2',
      name: 'Printer 2',
      model: 'Model 2',
      privateipaddress: '172.16.99.02',
      registrationnumber: '0002',
    },
    {
      printerid: '3',
      name: 'Printer 3',
      model: 'Model 3',
      privateipaddress: '172.16.99.03',
      registrationnumber: '0003',
    },
  ]
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getPrinters') {
    getPrinters().then((printers) => {
      sendResponse(printers)
    })
  }

  return true
})
