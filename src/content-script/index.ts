import './index.scss'

const src = chrome.runtime.getURL('src/content-script/iframe/index.html')

const iframe = new DOMParser().parseFromString(
  `<iframe class="crx-iframe" src="${src}"></iframe>`,
  'text/html'
).body.firstElementChild

if (iframe) {
  document.body?.append(iframe)
}

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}

console.log('hello world from content-script')

export {}

window.addEventListener('message', async (event) => {
  const { target, type } = event.data as {
    target: string
    type: string
  }

  if (target !== __NAME__ || type === 'RESULT') {
    return
  }

  const result = await chrome.runtime.sendMessage(event.data)

  if (!result) {
    return
  }

  window.postMessage({
    type: 'RESULT',
    data: result,
  })
})
