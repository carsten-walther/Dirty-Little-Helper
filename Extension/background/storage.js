let texts = []
let devices = []
let validators = []

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
 * loadDevicesFromStorage
 */
let loadDevicesFromStorage = () => {
  if (typeof localStorage.devices === 'undefined') {
    localStorage.devices = JSON.stringify(userAgentsList)
  }
  let devicesStorage = localStorage.devices
  devices = chrome.extension.getBackgroundPage().devices
  if (typeof devicesStorage !== 'undefined') {
    devices = JSON.parse(devicesStorage)
  }
}

/**
 * loadValidatorsFromStorage
 */
let loadValidatorsFromStorage = () => {
  if (typeof localStorage.validators === 'undefined') {
    localStorage.validators = JSON.stringify(validatorsList)
  }
  let validatorsStorage = localStorage.validators
  validators = chrome.extension.getBackgroundPage().validators
  if (typeof validatorsStorage !== 'undefined') {
    validators = JSON.parse(validatorsStorage)
  }
}
