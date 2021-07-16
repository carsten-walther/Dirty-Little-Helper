import { get, set } from './Storage'

class DeviceServiceController {

    devices = []
    storageKey = 'devices'

    async load () {
        if (this.devices.length > 0) {
            return this.devices
        } else {
            this.devices = (await get(this.storageKey)) || []
            return this.devices
        }
    }

    async save () {
        return await set(this.storageKey, this.devices)
    }

    get (id) {
        return this.devices.find(device => device.id === id)
    }

    create (device) {
        let id = Math.max(...this.devices.map(device => parseInt(device.id)), 0) + 1
        this.devices.push({
            id: id.toString(), name: device.name, content: device.content,
        })
        this.save()
    }

    update (id, device) {
        let index = this.devices.indexOf(this.get(id))
        this.devices[index] = device
        this.save()
    }

    delete (device) {
        let index = this.devices.indexOf(device)
        if (index > -1) {
            this.devices.splice(index, 1)
            this.save()
        }
    }
}

export const DeviceService = new DeviceServiceController()
