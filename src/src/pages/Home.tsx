/*global chrome*/

import React from 'react'
import { DeviceService } from "../services/DeviceService";

export default class Home extends React.Component {

  state = {
    devices: []
  }

  async componentDidMount() {
    this.setState({
      devices: [...(await DeviceService.load())]
    })
  }

  toggleGridOverlay() {
    // @ts-ignore
    chrome.tabs.query({
      active: true,
      currentWindow: true,
      // @ts-ignore
    }, (tabs) => {
      // @ts-ignore
      chrome.tabs.sendMessage(tabs[0].id, {
        function: 'toggleGridOverlay',
      })
    })
  }

  toggleOutlines(func: string, selector: string, attribute: string) {
    // @ts-ignore
    chrome.tabs.query({
      active: true,
      currentWindow: true
      // @ts-ignore
    }, (tabs) => {
      // @ts-ignore
      chrome.tabs.sendMessage(tabs[0].id, {
        function: func, selector: selector, attribute: attribute,
      })
    })
  }

  openBrowser(userAgent: any) {
    // @ts-ignore
    chrome.tabs.query({
      active: true,
      currentWindow: true,
      // @ts-ignore
    }, (tabs) => {
      // @ts-ignore
      openPopupWindow(userAgent.width, userAgent.height, tabs[0].url, userAgent.userAgent)
    })
  }

  render() {
    return (
      <>
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
        <section>
          <h2 className="title">Devices</h2>
          {this.state.devices.length > 0 ? (
            <ul>{this.state.devices.map((group: any, groupIndex: number) => {
              return (
                <li key={groupIndex}>
                  <h4>{group.name}</h4>
                  {group.userAgents.length > 0 ? (
                    <ul>{group.userAgents.map((device: any, deviceIndex: number) => {
                      return (
                        <li key={deviceIndex}>
                          {device.name} ({device.width}x{device.height})
                          <div className="float-right">
                            <button onClick={() => this.openBrowser(device)}>Open</button>
                          </div>
                        </li>
                      )
                    })}</ul>
                  ) : null}
                </li>
              )
            })}</ul>
          ) : null}
        </section>
      </>
    )
  }
}
