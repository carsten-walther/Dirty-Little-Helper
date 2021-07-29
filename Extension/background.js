/**
 * onInstalled
 */
chrome.runtime.onInstalled.addListener((details) => {

  let reason = details.reason === 'chrome_update' ? 'update' : details.reason

  /**
   * open new tab after install/update
   */
  chrome.tabs.create({
    url: `chrome-extension://${chrome.runtime.id}/html/${reason}.html`
  })
})

/**
 * setUserAgent
 *
 * @param device
 * @param tab
 * @param callback
 */
let setUserAgent = (device, tab, callback) => {
  chrome.tabs.query({
    active: !0,
    currentWindow: !0
  }, (tabs) => {
    openPopupWindow(device.width, device.height, tabs[0].url, device.userAgent)
  })
  if (callback && typeof callback == 'function') {
    callback()
  }
}

/**
 * openPopupWindow
 *
 * @param windowWidth
 * @param windowHeight
 * @param url
 * @param userAgent
 */
let openPopupWindow = (windowWidth, windowHeight, url, userAgent) => {
  let width = windowWidth + 10
  let height = windowHeight + 28
  let left = Math.round(screen.width / 2 - width / 2)
  let top = Math.round(screen.height / 2 - height / 2)
  chrome.windows.create({
    url: url,
    type: 'popup',
    width: width,
    height: height,
    left: left,
    top: top,
    focused: !0
  }, (info) => {
    addListener(info, userAgent)
    chrome.tabs.insertCSS(info.tabs[0].id, {
      runAt: 'document_start',
      code: '::-webkit-scrollbar{width:9px!important;height:9px!important}::-webkit-scrollbar-button:start:decrement,::-webkit-scrollbar-button:end:increment{height:0;width:0;display:none}::-webkit-scrollbar-track-piece{margin:1px;padding:0;width:6px!important;height:5px!important;background:rgba(255,255,255,0.3)}::-webkit-scrollbar:hover{background:rgba(128,128,128,0.2)}::-webkit-scrollbar-thumb{margin:1px!important;border:2px solid transparent;width:5px!important;background-color:rgba(0,0,0,0.4)!important;z-index:9999;-webkit-border-radius:12px;background-clip:content-box}::-webkit-scrollbar-corner{background:rgba(255,255,255,0.3);border:1px solid transparent}::-webkit-scrollbar-thumb:hover{background-color:rgba(0,0,0,0.8)!important;border:2px solid transparent}::-webkit-scrollbar-thumb:active{background-color:rgba(0,0,0,0.6)!important;border:2px solid transparent}',
    })
  })
}

/**
 * addListener
 *
 * @param info
 * @param userAgent
 */
let addListener = (info, userAgent) => {
  chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
    for (let i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        details.requestHeaders[i].value = userAgent
        break
      }
    }
    return {
      requestHeaders: details.requestHeaders
    }
  }, {
    urls: ['<all_urls>'],
    windowId: info.id
  }, [
    'blocking',
    'requestHeaders'
  ])
}
