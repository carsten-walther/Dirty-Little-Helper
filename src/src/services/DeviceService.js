import { get, set } from './Storage'

class DeviceServiceController {

    defaults = [
        {
            id: 1,
            name: 'Foundation Breakpoints',
            userAgents: [
                {
                    id: 1,
                    name: 'Small',
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
                    height: 768,
                    width: 360,
                },
                {
                    id: 2,
                    name: 'Medium',
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
                    height: 768,
                    width: 640,
                },
                {
                    id: 3,
                    name: 'Large',
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
                    height: 768,
                    width: 1004,
                },
                {
                    id: 4,
                    name: 'xLarge',
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
                    height: 768,
                    width: 1140,
                },
                {
                    id: 5,
                    name: 'xxLarge',
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
                    height: 768,
                    width: 1440,
                },
            ],
        }
    ]

    devices = []

    storageKey = 'devices'

    constructor () {
        this.init().then(r => {})
    }

    async init () {
        let hasItems = await get(this.storageKey)
        if (hasItems === undefined) {
            await set(this.storageKey, this.defaults)
        }
    }

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

    async get (id) {
        return this.devices.find(device => device.id === id)
    }

    async create (device) {
        let id = Math.max(...this.devices.map(device => device.id), 0) + 1
        this.devices.push({
            id: id, name: device.name, content: device.content,
        })
        await this.save()
    }

    async update (id, device) {
        let index = this.devices.indexOf(await this.get(id))
        this.devices[index] = device
        await this.save()
    }

    async delete (device) {
        let index = this.devices.indexOf(device)
        if (index > -1) {
            this.devices.splice(index, 1)
            await this.save()
        }
    }
}

export const DeviceService = new DeviceServiceController()
