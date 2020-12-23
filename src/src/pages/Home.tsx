/*global chrome*/

import React from 'react'
import { DeviceService } from '../services/DeviceService'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Link} from "react-router-dom";
import {ReactComponent as IconChevronRight} from "../assets/icons/chevron-right.svg";

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
        <Header title="Dirty Little Helper" />
        <main>
          <section>
            <h2 className="title">Tools</h2>
            <ul className="button-list">
              <li>
                <button onClick={this.toggleGridOverlay}>Grid Overlay</button>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="title">Outlines</h2>
            <ul className="button-list">
              <li>
                <button onClick={() => this.toggleOutlines('outlineHeadings', '', '')}>Headings</button>
              </li>
              <li>
                <button onClick={() => this.toggleOutlines('outlineElementAttribute', 'img', 'alt')}>Image Alternative Attributes</button>
              </li>
              <li>
                <button onClick={() => this.toggleOutlines('outlineElementAttribute', 'a', 'title')}>Anchor Title Attributes</button>
              </li>
              <li>
                <button onClick={() => this.toggleOutlines('outlineElementAttribute', 'button', 'title')}>Button Title Attributes</button>
              </li>
            </ul>
          </section>
          {this.state.devices.length > 0 ? (
            <section>
              <h2 className="title">Devices</h2>
              <ul className="stacked-list">
                {this.state.devices.map((group: any, groupIndex: number) => {
                  return (
                    <li key={groupIndex}>
                      <h3>{group.name}</h3>
                      {group.userAgents.length > 0 ? (
                        <ul className="stacked-list">
                          {group.userAgents.map((device: any, deviceIndex: number) => {
                            return (
                              <li className="pointer" key={deviceIndex} onClick={() => this.openBrowser(device)}>
                                <div>
                                  <p className="title">{device.name}</p>
                                  <p>Width {device.width}px Height {device.height}px</p>
                                </div>
                                <IconChevronRight width={18} height={18} />
                              </li>
                            )
                          })}
                        </ul>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </section>
          ) : null}
        </main>
        <Footer />
      </>
    )
  }
}
