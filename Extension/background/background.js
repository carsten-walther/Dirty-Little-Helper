/**
 * onInstalled
 */
chrome.runtime.onInstalled.addListener((details) => {

  /**
   * open new tab after install/update
   */
  chrome.tabs.create({
    url: `chrome-extension://${chrome.runtime.id}/background/html/${details.reason}.html`
  }, (tab) => {

  })
})
