/**
 * initContent
 */
let initContent = () => {

  chrome.extension.onMessage.addListener((message, sender, callback) => {

    if (message.function === 'toggleGridOverlay') {
      toggleGridOverlay(message.columns)
    }

    if (message.function === 'toggleFocus') {
      toggleFocus()
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
 *
 * @param columns
 */
let toggleGridOverlay = (columns) => {

  if (typeof columns === 'undefined') {
    columns = 12
  }

  for (let element of document.getElementsByTagName('body')) {

    let rows = []

    for (let i = 1; i <= columns; ++i) {

      rows.push(`
        <div class="cell auto col">
          <div data-dirty-little-helper="overlay-background">
            <div data-dirty-little-helper="overlay-column-title">
              ${i}
            </div>
          </div>
        </div>
      `)
    }

    let html = `
      <div data-dirty-little-helper="overlay-container" style="height: ${document.body.offsetHeight}px;">
        <div class="grid-container container">
          <div class="grid-x grid-padding-x row">
            ${rows.join('')}
          </div>
        </div>
      </div>
    `

    if (typeof element.dataset.dirtyLittleHelperColumns !== 'undefined') {
      // update grid
    } else {
      // remove grid
    }

    if (!element.dataset.dirtyLittleHelperToggleGrid) {
      element.dataset.dirtyLittleHelperToggleGrid = 'true'
      element.dataset.dirtyLittleHelperColumns = columns
      element.insertAdjacentHTML('beforeend', html)
    } else {
      delete element.dataset.dirtyLittleHelperToggleGrid
      delete element.dataset.dirtyLittleHelperColumns
      element.removeChild(document.querySelector('[data-dirty-little-helper="overlay-container"]'))
    }
  }
}

/**
 * toggleFocus
 */
let toggleFocus = () => {

  let html = `
<style data-dirty-little-helper="focus-css">
*:focus {
  outline: 4px solid var(--red-dark) !important;
  outline-offset: 0 !important;
  box-shadow: 0 0 5px 6px var(--red-dark) !important;
}
</style>`

  for (let element of document.getElementsByTagName('body')) {
    if (!element.dataset.dirtyLittleHelperToggleFocus) {
      element.dataset.dirtyLittleHelperToggleFocus = 'true'
      element.insertAdjacentHTML('beforeend', html)
    } else {
      delete element.dataset.dirtyLittleHelperToggleFocus
      element.removeChild(document.querySelector('[data-dirty-little-helper="focus-css"]'))
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

      wrapElement(element, state, attribute)
    } else {
      delete element.dataset.dirtyLittleHelperElementAttributeState
      delete element.dataset.dirtyLittleHelperElementAttribute

      unWrapElement(element)
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

/**
 * wrapElement
 *
 * @param element
 * @param state
 * @param attribute
 */
let wrapElement = (element, state, attribute) => {
  let wrapper = document.createElement('div')
  wrapper.dataset.dirtyLittleHelperElementWrapper = ''
  wrapper.dataset.dirtyLittleHelperElementWrapperState = state
  wrapper.dataset.dirtyLittleHelperElementWrapperAttribute = attribute
  element.parentNode.appendChild(wrapper)
  wrapper.appendChild(element)
}

/**
 * unWrapElement
 *
 * @param element
 */
let unWrapElement = (element) => {
  let wrapper = element.parentElement
  wrapper.replaceWith(element)
}

initContent()
