import React from 'react'
import { Link } from 'react-router-dom'
import { DeviceService } from '../services/DeviceService'
import { ReactComponent as IconBack } from '../assets/icons/arrow.svg'
import { ReactComponent as IconTrash } from '../assets/icons/trash.svg'

export default class DeviceManager extends React.Component {

  state = {
    devices: []
  }

  async componentDidMount() {
    this.setState({
      devices: [...(await DeviceService.load())]
    })
  }

  async deleteGroup(group: any) {
    // @ts-ignore
    let indexGroup = this.state.devices.indexOf(group)
    // @ts-ignore
    this.state.devices.splice(indexGroup, 1)

    await DeviceService.save()
    this.setState({
      devices: [...(await DeviceService.load())]
    })
  }

  async deleteDevice(group: any, device: any) {
    // @ts-ignore
    let indexGroup = this.state.devices.indexOf(group)
    // @ts-ignore
    let indexDevice = this.state.devices[indexGroup].userAgents.indexOf(device)
    // @ts-ignore
    this.state.devices[indexGroup].userAgents.splice(indexDevice, 1)

    await DeviceService.save()
    this.setState({
      devices: [...(await DeviceService.load())]
    })
  }

  render() {
    return (
      <>
        <h2>
          Device Manager
          <div className="float-right">
            <Link to="/settings">
              <button>
                <IconBack width={16} height={16} />
              </button>
            </Link>
          </div>
          <div className="clearfix"/>
        </h2>
        <div className="scrollable">
          {this.state.devices.length > 0 ? (
            <ul>{this.state.devices.map((group: any, groupIndex: number) => {
              return (
                <li key={groupIndex}>
                  <h3>
                    {group.name}
                    <div className="float-right">
                      <button className="btn" onClick={() => this.deleteGroup(group)}>
                        <IconTrash width={12} height={12} />
                      </button>
                    </div>
                  </h3>
                  {group.userAgents.length > 0 ? (
                    <ul>{group.userAgents.map((device: any, deviceIndex: number) => {
                      return (
                        <li key={deviceIndex}>
                          <span>{device.name} ({device.width}x{device.height})</span>
                          <div className="float-right">
                            <Link to={`/settings/devicemanager/edit/${device.id}`}>
                              <button>Edit</button>
                            </Link>
                            <button className="btn" onClick={() => this.deleteDevice(group, device)}>
                              <IconTrash width={12} height={12} />
                            </button>
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
        <Link to="/settings/devicemanager/add">
          <button>+</button>
        </Link>
      </>
    )
  }
}
