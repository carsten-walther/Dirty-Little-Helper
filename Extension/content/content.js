chrome.runtime.onMessage.addListener((message, sender, callback) => {

  switch (message.function) {

    case 'toggleA11y':
      toggleA11y(JSON.parse(message.params))
      break

    case 'toggleTota11y':
      toggleTota11y()
      break

    case 'toggleGrid':
      toggleGrid(JSON.parse(message.params))
      break

    case 'toggleContentEdit':
      toggleContentEdit()
      break

    case 'toggleReadability':
      toggleReadability()
      break

    case 'toggleContentChaos':
      toggleContentChaos()
      break

    case 'toggleOutline':
      toggleOutline(JSON.parse(message.params))
      break

    case 'toggleZIndex':
      toggleZIndex()
      break

    case 'insertText':
      insertText(message.text)
      break

    case 'toggleDisableCss':
      toggleDisableCss()
      break

    case 'toggleDisableImages':
      toggleDisableImages()
      break

    case 'toggleScrollbars':
      toggleScrollbars()
      break
  }
})


/**
 * toggleA11y
 *
 * @param params
 */
let toggleA11y = (params) => {
  if (!document.body.dataset.dlhA11y) {
    document.body.dataset.dlhA11y = 'true'
    startA11y(params)
  } else {
    delete document.body.dataset.dlhA11y
    stopA11y()
  }
}
let startA11y = (params) => {
  stopA11y()

  let style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = chrome.runtime.getURL(`/content/a11y/a11y-${params.language}_${params.level}.css`)
  style.id = 'toggleA11y'

  document.head.appendChild(style)
}
let stopA11y = () => {
  let style = document.getElementById('toggleA11y')
  if (style) {
    style.parentNode.removeChild(style)
  }
}


/**
 * toggleTota11y
 */
let toggleTota11y = () => {
  if (!document.body.dataset.dlhTota11y) {
    document.body.dataset.dlhTota11y = 'true'
    startTota11y()
  } else {
    delete document.body.dataset.dlhTota11y
    stopTota11y()
  }
}
let startTota11y = () => {
  let script = document.createElement('script')
  script.src = chrome.runtime.getURL(`/content/tota11y/tota11y.min.js`)

  document.head.appendChild(script)
}
let stopTota11y = () => {
  window.location.reload()
}


/**
 * toggleGrid
 *
 * @param params
 */
let toggleGrid = (params) => {
  if (!document.body.dataset.dlhToggleGrid) {
    document.body.dataset.dlhToggleGrid = 'true'
    startGrid(params)
  } else {
    delete document.body.dataset.dlhToggleGrid
    stopGrid()
  }
}
let startGrid = (params) => {

  let style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = chrome.runtime.getURL(`/content/grid/grid.css`)
  style.id = 'toggleGrid'

  document.head.appendChild(style)

  document.body.dataset.dlhToggleGridColumns = params.columns

  if (typeof params.columns === undefined) {
    params.columns = 12
  }

  let rows = []
  for (let i = 1; i <= params.columns; ++i) {

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

  document.body.insertAdjacentHTML('beforeend', html)
}
let stopGrid = () => {
  let style = document.getElementById('toggleGrid')
  if (style) {
    style.parentNode.removeChild(style)
  }

  delete document.body.dataset.dlhToggleGridColumns

  document.body.removeChild(document.querySelector('[data-dirty-little-helper="overlay-container"]'))
}


/**
 * toggleContentEdit
 */
let toggleContentEdit = () => {
  if (!document.body.dataset.dlhContentEdit) {
    document.body.dataset.dlhContentEdit = 'true'
    startContentEdit()
  } else {
    delete document.body.dataset.dlhContentEdit
    stopContentEdit()
  }
}
let startContentEdit = () => {
  document.body.contentEditable = true;
  document.body.spellCheck = true;
}
let stopContentEdit = () => {
  document.body.contentEditable = false;
  document.body.spellCheck = false;
}


/**
 * toggleReadability
 */
let toggleReadability = () => {
  if (!document.body.dataset.dlhReadability) {
    document.body.dataset.dlhReadability = 'true'
    startReadability()
  } else {
    delete document.body.dataset.dlhReadability
    stopReadability()
  }
}
let startReadability = () => {

  const getHue = score => {
    switch (score) {
      case 0:
        return 100;
      case 1:
        return 90;
      case 2:
        return 80;
      case 3:
        return 70;
      case 4:
        return 60;
      case 5:
        return 50;
      case 6:
        return 40;
      case 7:
        return 30;
      case 8:
        return 10;
      case 9:
        return 0;
      case 10:
        return 350;
      default:
        return 100;
    }
  };

  const getLightness = score => {
    switch (score) {
      case 0:
      case 1:
        return 90;
      case 2:
      case 3:
        return 80;
      case 4:
      case 5:
        return 70;
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      default:
        return 60;
    }
  };

  const ariUpperLimit = 55;

  const ariScore = (numOfWords, numOfCharacters) => {
    const score = Math.round(4.75 * (numOfCharacters / numOfWords) + 0.5 * numOfWords - 21.43);
    return Math.max(0, Math.min(score, ariUpperLimit));
  };

  const aariUpperLimit = 1500;

  const aariScore = (numOfWords, numOfCharacters) => {
    const score = Math.round((3.28 * numOfCharacters) + (1.43 * (numOfCharacters / numOfWords)) + (1.24 * numOfWords));
    return Math.max(0, Math.min(score, aariUpperLimit));
  }

  const normalizeScore = (readability, upperLimit) => Math.ceil((Math.round(((readability - 0) / upperLimit) * 100) / 100) * 10);

  const textNodesUnder = el => {
    let n;
    const a = [];
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while ((n = walk.nextNode())) a.push(n);
    return a;
  };

  textNodesUnder(document.body).filter(x => x.textContent.trim().length > 0).filter(x => !['SCRIPT', 'STYLE', 'TITLE', 'SVG', 'CANVAS', 'OBJECT', 'VIDEO'].includes(x.parentElement.nodeName)).forEach(node => {
    const wrapper = document.createElement('dlh-ari-span');
    const sentences = node.textContent.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g) || [];
    sentences.forEach(sentence => {
      const wrappedSentence = document.createElement('dlh-ari');
      wrappedSentence.textContent = sentence;
      wrapper.appendChild(wrappedSentence);
    });
    node.after(wrapper);
    node.textContent = '';
  });

  [...document.querySelectorAll('dlh-ari')].forEach(item => {
    const sentence = item.textContent.trim();
    const words = sentence.replace(/['";:,،.?¿\-\—!¡]+/g, '').match(/\S+/g);
    const numOfWords = words ? words.length : 0;
    if (numOfWords > 1) {
      const numOfCharacters = sentence.replace(/\s/g, '').length;
      const isArabic = document.documentElement.getAttribute("lang")?.startsWith("ar");
      const readability = isArabic ? aariScore(numOfWords, numOfCharacters) : ariScore(numOfWords, numOfCharacters);
      const normalizedScore = normalizeScore(readability, isArabic ? aariUpperLimit : ariUpperLimit);
      const bg = `hsl( ${getHue(normalizedScore)} 70% ${getLightness(normalizedScore)}% / 0.89)`;
      item.setAttribute('title', isArabic ? `Automatic Arabic readability index: ${readability}` : `Automated Readability Index: ${readability}`);
      item.dataset.readability = readability;
      item.style.setProperty('color', '#000', 'important');
      item.style.setProperty('background-color', bg);
    }
  });
}
let stopReadability = () => {
  [...document.querySelectorAll('dlh-ari')].forEach(item => {
    const node = document.createTextNode(item.textContent);
    item.after(node);
    item.remove();
  });

  [...document.querySelectorAll('dlh-ari-span')].forEach(item => {
    const node = document.createTextNode(item.textContent);
    item.after(node);
    item.remove();
  });
}


/**
 * toggleContentChaos
 */
let toggleContentChaos = () => {
  if (!document.body.dataset.dlhContentChaos) {
    document.body.dataset.dlhContentChaos = 'true';
    startContentChaosTest();
  } else {
    delete document.body.dataset.dlhContentChaos;
    stopContentChaosTest();
  }
}
let startContentChaosTest = () => {

  const textNodesUnder = el => {
    let n;
    const a = [];
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while ((n = walk.nextNode())) a.push(n);
    return a;
  };

  textNodesUnder(document.body).
    filter(x => x.textContent.trim().length > 0).
    filter(x => !['SCRIPT', 'STYLE', 'TITLE', 'SVG', 'CANVAS', 'OBJECT', 'VIDEO'].includes(x.parentElement.nodeName)).
    forEach(node => {
      const randomContent = node => {
        const rand = Math.random();
        if (rand <= 0.25) {
          return node.textContent.slice(0, node.textContent.length / 2);
        }
        if (rand <= 0.5) {
          return node.textContent;
        }
        if (rand <= 0.75) {
          return `${node.textContent} ${node.textContent}`;
        }
        if (rand <= 1) {
          return `${node.textContent} ${node.textContent} ${node.textContent}`;
        }
      }
      const wrapper = document.createElement('dlh-chaos-span');
      wrapper.dataset.content = node.textContent;
      wrapper.textContent = randomContent(node);
      node.after(wrapper);
      node.textContent = '';
    })
}
let stopContentChaosTest = () => {
  [...document.querySelectorAll('dlh-chaos-span')].forEach(item => {
    const node = document.createTextNode(item.dataset.content);
    item.after(node);
    item.remove();
  });
}


/**
 * toggleOutline
 *
 * @params params
 */
let toggleOutline = (params) => {
  if (!document.body.dataset.dlhOutline) {
    document.body.dataset.dlhOutline = 'true';
    startOutline(params);
  } else {
    delete document.body.dataset.dlhOutline;
    stopOutline(params);
  }
}
let startOutline = (params) => {
  let style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = chrome.runtime.getURL(`/content/outlines/outline-${params.type}.css`)
  style.id = 'toggleOutline'

  document.head.appendChild(style)

  switch (params.type) {

    case 'layout':
      document.documentElement.classList.add('dlh-pest-active');
      window.addEventListener('resize', findOverflows);
      findOverflows();
      break;

    case 'headings':
    case 'images':
    case 'anchors':
    case 'buttons':
      findElementAttribute(params);
      break;
  }
}
let stopOutline = (params) => {
  let style = document.getElementById('toggleOutline')
  if (style) {
    style.parentNode.removeChild(style)
  }

  switch (params.type) {

    case 'layout':
      window.removeEventListener('resize', findOverflows);
      document.documentElement.classList.remove('dlh-pest-active');
      clearOverflows();
      break;

    case 'headings':
    case 'images':
    case 'anchors':
    case 'buttons':
      clearElementAttribute(params);
      break;
  }
}

let overflowList = [];
let clearOverflows = () => {
  overflowList.forEach(elem => {
    elem.style.setProperty('background', null);
    elem.style.setProperty('outline', null);
  });
  overflowList = [];
}
let findOverflows = () => {
  clearOverflows();
  const docWidth = document.documentElement.getBoundingClientRect().width;
  if (document.documentElement.scrollWidth > document.documentElement.clientWidth) {
    document.querySelectorAll('*').forEach(elem => {
      if (elem.getBoundingClientRect().right > docWidth) {
        overflowList.push(elem);
        elem.style.setProperty('outline', '3px solid #f00', 'important');
        elem.style.setProperty('background', '#f004', 'important');
      } else {
        [...elem.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(text => {
          let range = document.createRange();
          range.selectNode(text);
          let rect = range.getBoundingClientRect();
          if (rect.right > docWidth) {
            overflowList.push(elem);
            elem.style.setProperty('outline', '2px solid #f00', 'important');
            elem.style.setProperty('background', '#f004', 'important');
          }
          range.detach();
        });
      }
    });
  }
}

let clearElementAttribute = (params) => {
  for (let element of document.querySelectorAll(params.tag)) {
    unWrapElement(element);
  }
}
let findElementAttribute = (params) => {
  for (let element of document.querySelectorAll(params.tag)) {
    wrapElement(element, params);
  }
}

let wrapElement = (element, params) => {
  let wrapper = document.createElement('dlh-container')
  wrapper.dataset.dlhElementWrapper = ''
  wrapper.dataset.dlhElementWrapperTag = element.tagName.toLowerCase()

  if (params.title) {
    wrapper.dataset.dlhElementWrapperTitle = params.title
  }

  if (params.attribute) {
    wrapper.dataset.dlhElementWrapperState = 'filled';
    if (!element.hasAttribute(params.attribute)) {
      wrapper.dataset.dlhElementWrapperState = 'missing';
    } else {
      if (element.getAttribute(params.attribute) === '') {
        wrapper.dataset.dlhElementWrapperState = 'empty';
      }
    }
  }

  if (params.attribute) {
    wrapper.dataset.dlhElementWrapperAttribute = params.attribute
  }

  if (params.attribute && wrapper.dataset.dlhElementWrapperState) {
    wrapper.dataset.dlhElementWrapperMessage = params.attribute + ' ' + wrapper.dataset.dlhElementWrapperState
  }

  element.parentNode.replaceChild(wrapper, element)
  wrapper.appendChild(element)
}
let unWrapElement = (element) => {
  let wrapper = element.parentElement
  wrapper.replaceWith(element)
}


/**
 * toggleZIndex
 */
let toggleZIndex = () => {
  if (!document.body.dataset.dlhToggleZindex) {
    document.body.dataset.dlhToggleZindex = 'true'
    startZIndex()
  } else {
    delete document.body.dataset.dlhToggleZindex
    stopZIndex()
  }
}
let startZIndex = () => {
  let style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = chrome.runtime.getURL(`/content/outlines/outline-zindex.css`)
  style.id = 'toggleZIndex'

  document.head.appendChild(style)

  Array.from(document.querySelectorAll('*')).
    filter(element => element.computedStyleMap().get('z-index').value !== 'auto').
    forEach(element => {
      wrapElement(element, { title: element.computedStyleMap() && element.computedStyleMap().get('z-index').value })
    })
}
let stopZIndex = () => {
  let style = document.getElementById('toggleZIndex')
  if (style) {
    style.parentNode.removeChild(style)
  }

  Array.from(document.querySelectorAll('*')).
    filter(element => element.computedStyleMap().get('z-index').value !== 'auto').
    forEach(element => {
      unWrapElement(element)
    })
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

let getActiveElement = (document) => {
  document = document || window.document
  if (document.body === document.activeElement || document.activeElement.tagName === 'IFRAME') {
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
 * toggleDisableCss
 */
let toggleDisableCss = () => {
  if (!document.body.dataset.dlhToggleCss) {
    document.body.dataset.dlhToggleCss = 'true'
    startDisableCSS()
  } else {
    delete document.body.dataset.dlhToggleCss
    stopDisableCSS()
  }
}
let startDisableCSS = () => {
  for (let i = 0; i < document.styleSheets.length; i++) {
    void(document.styleSheets.item(i).disabled = true);
  }
  document.querySelectorAll('*').forEach(elem => {
    if (elem.style.cssText) {
      elem.setAttribute("data-style", elem.style.cssText); elem.style.cssText = "";
    }
  });
}
let stopDisableCSS = () => {
  for (let i = 0; i < document.styleSheets.length; i++) {
    void(document.styleSheets.item(i).disabled = false);
  }
  document.querySelectorAll('*').forEach(elem => {
    if (elem.hasAttribute("data-style")) {
      elem.style.cssText = elem.getAttribute("data-style");
      elem.removeAttribute("data-style");
    }
  });
}


/**
 * toggleDisableImages
 */
let toggleDisableImages = () => {
  if (!document.body.dataset.dlhToggleImages) {
    document.body.dataset.dlhToggleImages = 'true'
    startDisableImages()
  } else {
    delete document.body.dataset.dlhToggleImages
    stopDisableImages()
  }
}
let startDisableImages = () => {
  document.querySelectorAll("*").forEach(elem => {
    elem.dataset.ppstyle = elem.style;
    elem.style.setProperty("background-image", 'none');
    if (['IMG', 'SOURCE'].includes(elem.nodeName)) {
      elem.dataset.ppsrc = elem.src;
      elem.src = null;
      elem.dataset.ppsrcset = elem.srcset;
      elem.srcset = null;
    }
  })
}
let stopDisableImages = () => {
  document.querySelectorAll("*").forEach(elem => {
    elem.style = elem.dataset.ppstyle;
    if (['IMG', 'SOURCE'].includes(elem.nodeName)) {
      elem.src = elem.dataset.ppsrc;
      elem.dataset.src = null;
      elem.srcset = elem.dataset.ppsrcset;
      elem.dataset.src = null;
    }
  })
}

/**
 * toggleScrollbars
 */
let toggleScrollbars = () => {
  if (!document.body.dataset.dlhToggleScrollbars) {
    document.body.dataset.dlhToggleScrollbars = 'true'
    startScrollbars()
  } else {
    delete document.body.dataset.dlhToggleScrollbars
    stopScrollbars()
  }
}
let scrollBarList = [];
let startScrollbars = ({ unneeded = true } = {}) => {
  let style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = chrome.runtime.getURL(`/content/scrollbars/scrollbars.css`)
  style.id = 'toggleScrollbars'

  document.head.appendChild(style)

  const scroll = 'scroll';
  const allElem = document.querySelectorAll('*');
  [...allElem].forEach(elem => {
    const overflow = window.getComputedStyle(elem).getPropertyValue('overflow');
    const overflowY = window.getComputedStyle(elem).getPropertyValue('overflow-y');
    const overflowX = window.getComputedStyle(elem).getPropertyValue('overflow-x');
    if ([overflow, overflowY].includes(scroll) && (unneeded ? elem.scrollHeight === elem.clientHeight : true)) {
      elem.classList.add('poly-scrollbar-y');
      scrollBarList.push(elem);
    }
    if([overflow, overflowX].includes(scroll) && (unneeded ? elem.scrollWidth === elem.clientWidth : true)) {
      elem.classList.add('poly-scrollbar-x');
      scrollBarList.push(elem);
    }
  });
}
let stopScrollbars = () => {
  scrollBarList.forEach(elem => {
    elem.classList.remove('poly-scrollbar-y');
    elem.classList.remove('poly-scrollbar-x');
  });
  scrollBarList = [];

  let style = document.getElementById('toggleScrollbars')
  if (style) {
    style.parentNode.removeChild(style)
  }
}
