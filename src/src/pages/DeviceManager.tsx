import React from 'react'
import { Link } from 'react-router-dom'
import { DeviceService } from '../services/DeviceService'

export default class DeviceManager extends React.Component {

  state = {
    devices: []
  }

  async componentDidMount() {
    this.setState({
      devices: [...(await DeviceService.load())]
    })
  }

  delete(device: any) {

  }

  render() {
    return (
      <>
        <h2>
          Device Manager
          <div className="float-right">
            <Link to="/settings">
              <button>←</button>
            </Link>
            <Link to="/settings/devicemanager/add">
              <button>+</button>
            </Link>
          </div>
          <div className="clearfix"/>
        </h2>
        <div className="scrollable">
          {this.state.devices.length > 0 ? (
            <ul>{this.state.devices.map((group: any, groupIndex: number) => {
              return (
                <li key={groupIndex}>
                  <h3>{group.name}</h3>
                  {group.userAgents.length > 0 ? (
                    <ul>{group.userAgents.map((device: any, deviceIndex: number) => {
                      return (
                        <li key={deviceIndex}>
                          <span>{device.name} ({device.width}x{device.height})</span>
                          <div className="float-right">
                            <Link to={`/settings/devicemanager/edit/${device.id}`}>
                              <button>Edit</button>
                            </Link>
                            <button onClick={() => this.delete(device)}>Delete</button>
                          </div>
                        </li>
                      )
                    })}</ul>
                  ) : null}
                </li>
              )
            })}</ul>
          ) : null}
        </div>
      </>
    )
  }
}
