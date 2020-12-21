/**
 * initContent
 */
let initContent = () => {

  chrome.extension.onMessage.addListener((message, sender, callback) => {

    if (message.function === 'toggleGridOverlay') {
      toggleGridOverlay()
    }

    if (message.function === 'outlineHeadings') {
      outlineHeadings()
    }

    if (message.function === 'outlineElementAttribute') {
      outlineElementAttribute(message.selector, message.attribute)
    }

    if (message.function === 'insertText') {
      insertText(message.text)
    }
  })
}

/**
 * toggleGridOverlay
 */
let toggleGridOverlay = () => {

  for (let element of document.getElementsByTagName('body')) {

    let rows = []

    for (let i = 0; i < 12; ++i) {
      rows.push(`
<div class="cell small-1 col-sm-1">
  <div data-dirty-little-helper="overlay-background">
    <div data-dirty-little-helper="overlay-column-title">
      ${i + 1}
    </div>
  </div>
</div>`)
    }

    let html = `
<div data-dirty-little-helper="overlay-container" style="height: ${document.body.offsetHeight}px;">
  <div class="grid-container container">
    <div class="grid-x grid-padding-x row">
      ${rows.join('')}
    </div>
  </div>
</div>`

    if (!element.dataset.dirtyLittleHelperToggleGrid) {
      element.dataset.dirtyLittleHelperToggleGrid = 'true'
      element.insertAdjacentHTML('beforeend', html)
    } else {
      delete element.dataset.dirtyLittleHelperToggleGrid
      element.removeChild(document.querySelector(
        '[data-dirty-little-helper="overlay-container"]'))
    }
  }
}

/**
 * outlineHeadings
 */
let outlineHeadings = () => {

  for (let element of document.querySelectorAll('h1, h2, h3, h4, h5, h6')) {

    if (!element.dataset.dirtyLittleHelperHeaderTagName) {
      element.dataset.dirtyLittleHelperHeaderTagName = element.tagName
    } else {
      delete element.dataset.dirtyLittleHelperHeaderTagName
    }
  }
}

/**
 * outlineElementAttribute
 *
 * @param selector
 * @param attribute
 */
let outlineElementAttribute = (selector, attribute) => {

  for (let element of document.querySelectorAll(selector)) {

    let state = 'filled'

    if (!element.hasAttribute(attribute)) {
      state = 'missing'
    } else {
      if (element.getAttribute(attribute) === '') {
        state = 'empty'
      }
    }

    if (!element.dataset.dirtyLittleHelperElementAttribute) {
      element.dataset.dirtyLittleHelperElementAttributeState = state
      element.dataset.dirtyLittleHelperElementAttribute = attribute
    } else {
      delete element.dataset.dirtyLittleHelperElementAttributeState
      delete element.dataset.dirtyLittleHelperElementAttribute
    }
  }
}

/**
 * getActiveElement
 *
 * @param document
 * @returns {Element|boolean}
 */
let getActiveElement = (document) => {

  document = document || window.document
  if (document.body === document.activeElement ||
    document.activeElement.tagName === 'IFRAME') {
    let iframes = document.getElementsByTagName('iframe')
    for (let i = 0; i < iframes.length; i++) {
      let focused = getActiveElement(iframes[i].contentWindow.document)
      if (focused !== false) {
        return focused
      }
    }
  } else {
    return document.activeElement
  }
  return false
}

/**
 * insertIntoValueElement
 *
 * @param element
 * @param text
 * @returns {boolean}
 */
let insertIntoValueElement = (element, text) => {

  let start = element.selectionStart
  let end = element.selectionEnd

  if (!start) start = 0
  if (!end) end = 0

  let prefix = element.value.substring(0, start)
  let suffix = element.value.substring(end, element.value.length)

  element.value = prefix + text + suffix
  start = start + text.length
  element.selectionStart = start
  element.selectionEnd = start
  element.focus()

  return true
}

/**
 * insertText
 *
 * @param text
 */
let insertText = (text) => {

  let element = getActiveElement(document)

  if (!element) {
    return false
  }

  if (typeof (element.value) !== 'undefined') {
    return insertIntoValueElement(element, text)
  }
}

initContent()
