import { get, set } from './Storage'

class DeviceServiceController {

  public devices: any[] = []
  private storageKey: string = 'devices'

  async load(): Promise<any[]> {
    if (this.devices.length > 0) {
      return this.devices
    } else {
      this.devices = (await get(this.storageKey)) || []
      return this.devices
    }
  }

  async save(): Promise<void> {
    return await set(this.storageKey, this.devices)
  }

  get(id: any): any {
    return this.devices.find(device => device.id === id) as any
  }

  create(device: any): void {
    // Create a unique id that is one larger than the current largest id
    let id = Math.max(...this.devices.map(device => parseInt(device.id)), 0) + 1
    this.devices.push({
      id: id.toString(), name: device.name, content: device.content
    })
    this.save()
  }

  update(id: any, device: any): void {
    // Get the index in the array of the device that was passed in
    let index = this.devices.indexOf(this.get(id))
    this.devices[index] = device
    this.save()
  }

  delete(device: any): void {
    // Get the index in the array of the device that was passed in
    let index = this.devices.indexOf(device)
    // Delete that element of the array and resave the data
    if (index > -1) {
      this.devices.splice(index, 1)
      this.save()
    }
  }
}

export const DeviceService = new DeviceServiceController()
