/**
 * onInstalled
 */
chrome.runtime.onInstalled.addListener((details) => {

  loadDevicesFromStorage()

  loadTextsFromStorage()

  loadValidatorsFromStorage()

  /**
   * open new tab after install/update
   */
  chrome.tabs.create({
    url: `chrome-extension://${chrome.runtime.id}/background/html/${details.reason}.html`
  }, (tab) => {

  })
})
