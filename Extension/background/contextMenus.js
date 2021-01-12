/**
 * renderGridOverlayContextMenu
 */
let renderGridOverlayContextMenu = () => {
  let columns = [1,2,3,4,5,6,7,8,9,10,11,12]

  chrome.contextMenus.create({
    id: 'toggleGridOverlayRoot',
    title: 'Toggle Grid',
    type: 'normal',
    contexts: ['all'],
    onclick: (info, tab) => {
      chrome.tabs.query({
        'active': true,
        'currentWindow': true
      }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          function: 'toggleGridOverlay'
        })
      })
    }
  })
  columns.forEach(column => {
    chrome.contextMenus.create({
      id: 'toggleGridOverlay_' + column,
      title: (column === 1) ? column + ' column' : column + ' columns',
      type: 'normal',
      parentId: 'toggleGridOverlayRoot',
      contexts: ['all'],
      onclick: (info, tab) => {
        chrome.tabs.query({
          'active': true,
          'currentWindow': true,
        }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
            function: 'toggleGridOverlay',
            columns: column
          })
        })
      },
    })
  })
}

/**
 * renderToggleFocusContextMenu
 */
let renderToggleFocusContextMenu = () => {
  chrome.contextMenus.create({
    id: 'toggleFocusRoot',
    title: 'Toggle Focus',
    type: 'normal',
    contexts: ['all'],
    onclick: (info, tab) => {
      chrome.tabs.query({
        'active': true,
        'currentWindow': true
      }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          function: 'toggleFocus'
        })
      })
    }
  })
}

/**
 * renderOutlineContextMenu
 */
let renderOutlineContextMenu = () => {
  chrome.contextMenus.create({
    id: 'outlinesRoot',
    title: 'Outline',
    type: 'normal',
    contexts: ['all']
  })
  chrome.contextMenus.create({
    id: 'outlineHeadings',
    title: 'Headings',
    type: 'normal',
    parentId: 'outlinesRoot',
    contexts: ['all'],
    onclick: (info, tab) => {
      chrome.tabs.query({
        'active': true,
        'currentWindow': true
      }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          function: 'outlineHeadings'
        })
      })
    }
  })
  chrome.contextMenus.create({
    id: 'outlineImageAlt',
    title: 'Image Alternative Attributes',
    type: 'normal',
    parentId: 'outlinesRoot',
    contexts: ['all'],
    onclick: (info, tab) => {
      chrome.tabs.query({
        'active': true,
        'currentWindow': true
      }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          function: 'outlineElementAttribute',
          selector: 'img',
          attribute: 'alt'
        })
      })
    }
  })
  chrome.contextMenus.create({
    id: 'outlineAnchorTitle',
    title: 'Anchor Title Attributes',
    type: 'normal',
    parentId: 'outlinesRoot',
    contexts: ['all'],
    onclick: (info, tab) => {
      chrome.tabs.query({
        'active': true,
        'currentWindow': true
      }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          function: 'outlineElementAttribute',
          selector: 'a',
          attribute: 'title'
        })
      })
    }
  })
  chrome.contextMenus.create({
    id: 'outlineButtonTitle',
    title: 'Button Title Attributes',
    type: 'normal',
    parentId: 'outlinesRoot',
    contexts: ['all'],
    onclick: (info, tab) => {
      chrome.tabs.query({
        'active': true,
        'currentWindow': true
      }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          function: 'outlineElementAttribute',
          selector: 'button',
          attribute: 'title'
        })
      })
    }
  })
}

/**
 * renderDevicesContextMenu
 */
let renderDevicesContextMenu = () => {
  if (typeof devices !== 'undefined' && devices.length > 0) {
    chrome.contextMenus.create({
      id: 'simulate',
      title: 'Simulate',
      type: 'normal',
      contexts: ['all']
    })
    devices.forEach(group => {
      if (typeof group.userAgents !== 'undefined' && group.userAgents.length > 0) {
        chrome.contextMenus.create({
          id: 'group_' + group.id,
          title: group.name,
          type: 'normal',
          parentId: 'simulate',
          contexts: ['all'],
        })
        chrome.contextMenus.create({
          id: 'group_all_' + group.id,
          title: 'Open All Sizes',
          type: 'normal',
          parentId: 'group_' + group.id,
          contexts: ['all'],
          onclick: () => {
            group.userAgents.forEach(userAgent => {
              setUserAgent(userAgent, 'ContextMenu')
            })
          },
        })
        chrome.contextMenus.create({
          type: 'separator',
          parentId: 'group_' + group.id,
          contexts: ['all'],
        })
        group.userAgents.forEach(userAgent => {
          chrome.contextMenus.create({
            id: 'group_' + group.id + '_device_' + userAgent.id,
            title: userAgent.name + ' (' + userAgent.width + 'x' + userAgent.height + ')',
            type: 'normal',
            parentId: 'group_' + group.id,
            contexts: ['all'],
            onclick: () => {
              setUserAgent(userAgent, 'ContextMenu')
            }
          })
        })
      }
    })
  }
}

/**
 * renderTextsContextMenu
 */
let renderTextsContextMenu = () => {
  if (typeof texts !== 'undefined' && texts.length > 0) {
    chrome.contextMenus.create({
      id: 'insertText',
      title: 'Insert Text',
      type: 'normal',
      contexts: ['editable']
    })
    texts.forEach(text => {
      chrome.contextMenus.create({
        id: 'text_' + text.id,
        title: text.name,
        type: 'normal',
        parentId: 'insertText',
        contexts: ['editable'],
        onclick: (info, tab) => {
          chrome.tabs.query({
            'active': true,
            'currentWindow': true,
          }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
              function: 'insertText',
              text: text.content,
            })
          })
        },
      })
    })
  }
}

/**
 * renderValidatorsContextMenu
 */
let renderValidatorsContextMenu = () => {
  if (typeof validators !== 'undefined' && validators.length > 0) {
    chrome.contextMenus.create({
      id: 'validators',
      title: 'Validation',
      type: 'normal',
      contexts: ['all']
    })
    validators.forEach(validator => {
      chrome.contextMenus.create({
        id: 'validator_' + validator.id,
        title: validator.name,
        type: 'normal',
        parentId: 'validators',
        contexts: ['all'],
        onclick: (info, tab) => {
          chrome.tabs.query({
            active: true,
            currentWindow: true
          }, (tabs) => {
            chrome.tabs.create({ url: validator.url + tabs[0].url })
          })
        }
      })
    })
  }
}

/**
 * initContextMenu
 */
let renderContextMenu = () => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.removeAll()
    renderGridOverlayContextMenu()
    renderToggleFocusContextMenu()
    renderOutlineContextMenu()
    renderDevicesContextMenu()
    renderTextsContextMenu()
    renderValidatorsContextMenu()
  })
}

renderContextMenu()
