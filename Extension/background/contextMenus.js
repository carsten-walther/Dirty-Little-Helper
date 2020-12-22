/**
 * renderGridOverlayContextMenu
 */
let renderGridOverlayContextMenu = () => {

  chrome.contextMenus.create({
    id: 'toggleGridOverlayRoot',
    title: 'Toggle Grid Overlay',
    type: 'normal',
    contexts: ['all'],
    onclick: (info, tab) => {
      chrome.tabs.query({
        'active': true,
        'currentWindow': true,
      }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          function: 'toggleGridOverlay',
        })
      })
    },
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
    contexts: ['all'],
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
        'currentWindow': true,
      }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          function: 'outlineHeadings',
        })
      })
    },
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
        'currentWindow': true,
      }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          function: 'outlineElementAttribute',
          selector: 'img',
          attribute: 'alt',
        })
      })
    },
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
        'currentWindow': true,
      }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          function: 'outlineElementAttribute',
          selector: 'a',
          attribute: 'title',
        })
      })
    },
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
        'currentWindow': true,
      }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          function: 'outlineElementAttribute',
          selector: 'button',
          attribute: 'title',
        })
      })
    },
  })
}

/**
 * renderUserAgentContextMenu
 */
let renderUserAgentContextMenu = () => {

  loadUserAgentsFromStorage()

  if (typeof userAgents !== 'undefined' && userAgents.length > 0) {

    userAgents.forEach(userAgentGroup => {

      if (typeof userAgentGroup.userAgents !== 'undefined' &&
        userAgentGroup.userAgents.length > 0) {

        chrome.contextMenus.create({
          id: 'userAgentGroup_' + userAgentGroup.id,
          title: userAgentGroup.name,
          type: 'normal',
          contexts: ['all'],
        })

        chrome.contextMenus.create({
          id: 'userAgentGroup_all_' + userAgentGroup.id,
          title: 'Open All Sizes',
          type: 'normal',
          parentId: 'userAgentGroup_' + userAgentGroup.id,
          contexts: ['all'],
          onclick: () => {
            userAgentGroup.userAgents.forEach(userAgent => {
              setUserAgent(userAgent.id, 'ContextMenu')
            })
          },
        })

        chrome.contextMenus.create({
          type: 'separator',
          parentId: 'userAgentGroup_' + userAgentGroup.id,
          contexts: ['all'],
        })

        userAgentGroup.userAgents.forEach(userAgent => {

          chrome.contextMenus.create({
            id: 'userAgent_' + userAgent.id,
            title: userAgent.name + ' (' + userAgent.width + 'x' + userAgent.height + ')',
            type: 'normal',
            parentId: 'userAgentGroup_' + userAgentGroup.id,
            contexts: ['all'],
            onclick: () => {
              setUserAgent(userAgent.id, 'ContextMenu')
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

  loadTextsFromStorage()

  if (typeof texts !== 'undefined' && texts.length > 0) {

    chrome.contextMenus.create({
      id: 'insertText',
      title: 'Insert Text',
      type: 'normal',
      contexts: ['editable'],
    })

    texts.forEach(text => {

      chrome.contextMenus.create({
        id: 'text_' + text.id,
        title: text.name,
        type: 'normal',
        parentId: 'insertText',
        contexts: [
          'editable',
        ],
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
 * initContextMenu
 */
let renderContextMenu = () => {

  chrome.runtime.onInstalled.addListener(() => {

    chrome.contextMenus.removeAll()

    renderGridOverlayContextMenu()

    renderOutlineContextMenu()

    renderUserAgentContextMenu()

    renderTextsContextMenu()
  })
}

renderContextMenu()
