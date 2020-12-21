let texts = []
let userAgents = []

/**
 * loadTextsFromStorage
 */
let loadTextsFromStorage = () => {
  if (typeof localStorage.texts === 'undefined') {
    localStorage.texts = JSON.stringify(textsList)
  }
  let textsStorage = localStorage.texts
  texts = chrome.extension.getBackgroundPage().texts
  if (typeof textsStorage !== 'undefined') {
    texts = JSON.parse(textsStorage)
  }
}

/**
 * loadUserAgentsStorageData
 */
let loadUserAgentsFromStorage = () => {
  if (typeof localStorage.userAgents === 'undefined') {
    localStorage.userAgents = JSON.stringify(userAgentsList)
  }
  let userAgentsStorage = localStorage.userAgents
  userAgents = chrome.extension.getBackgroundPage().userAgents
  if (typeof userAgentsStorage !== 'undefined') {
    userAgents = JSON.parse(userAgentsStorage)
  }
}
