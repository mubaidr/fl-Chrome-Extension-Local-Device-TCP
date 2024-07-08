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

  if (target !== __NAME__ || type.includes('RESULT')) {
    return
  }

  const { data } = await chrome.runtime.sendMessage(event.data)

  window.postMessage(
    {
      target: __NAME__,
      type: `${type}_RESULT`,
      data,
    },
    '*'
  )
})
