/*global chrome*/

import React from 'react'

export default class Home extends React.Component {

  toggleGridOverlay() {
    // @ts-ignore
    chrome.tabs.query({
      active: true, currentWindow: true, // @ts-ignore
    }, (tabs) => {
      // @ts-ignore
      chrome.tabs.sendMessage(tabs[0].id, {
        function: 'toggleGridOverlay',
      })
    },)
  }

  toggleOutlines(func: string, selector: string, attribute: string) {
    // @ts-ignore
    chrome.tabs.query({
      active: true, currentWindow: true, // @ts-ignore
    }, (tabs) => {
      // @ts-ignore
      chrome.tabs.sendMessage(tabs[0].id, {
        function: func, selector: selector, attribute: attribute,
      })
    },)
  }

  render() {
    return (<>
        <section>
          <h2 className="title">Tools</h2>
          <ul>
            <li>
              Grid Overlay
              <div className="float-right">
                <button onClick={this.toggleGridOverlay}>Toggle</button>
              </div>
            </li>
            <li>
              Outline Headings
              <div className="float-right">
                <button onClick={() => this.toggleOutlines('outlineHeadings', '', '')}>Toggle</button>
              </div>
            </li>
            <li>
              Image Alternative Attributes
              <div className="float-right">
                <button onClick={() => this.toggleOutlines('outlineElementAttribute', 'img', 'alt')}>Toggle</button>
              </div>
            </li>
            <li>
              Anchor Title Attributes
              <div className="float-right">
                <button onClick={() => this.toggleOutlines('outlineElementAttribute', 'a', 'title')}>Toggle</button>
              </div>
            </li>
            <li>
              Button Title Attributes
              <div className="float-right">
                <button onClick={() => this.toggleOutlines('outlineElementAttribute', 'button', 'title')}>Toggle</button>
              </div>
            </li>
          </ul>
        </section>
      </>)
  }
}
