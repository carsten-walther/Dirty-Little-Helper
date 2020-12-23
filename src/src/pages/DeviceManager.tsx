import React from 'react'
import { Link } from 'react-router-dom'
import { DeviceService } from '../services/DeviceService'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ReactComponent as IconAdd } from '../assets/icons/add.svg'
import { ReactComponent as IconTrash } from '../assets/icons/trash.svg'
import { ReactComponent as IconChevronRight } from '../assets/icons/chevron-right.svg'

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
        <Header title="Device Manager" backTo={'/settings'}>
          <Link to="/settings/devicemanager/add">
            <IconAdd width={18} height={18} />
          </Link>
        </Header>
        <main>
          <section>
            <ul className="stacked-list">
              <li>
                <Link to="/settings/devicemanager">
                  <div>
                    <p className="title">Devices</p>
                    <p>Manage devices for simulating your web contents.</p>
                  </div>
                  <IconChevronRight width={18} height={18} />
                </Link>
              </li>
            </ul>
          </section>

          <div>
            {this.state.devices.length > 0 ? (
              <ul>
                {this.state.devices.map((group: any, groupIndex: number) => {
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
                        <ul>
                          {group.userAgents.map((device: any, deviceIndex: number) => {
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
                          })}
                        </ul>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
          <Link to="/settings/devicemanager/add">
            <button>+</button>
          </Link>
        </main>
        <Footer />
      </>
    )
  }
}
