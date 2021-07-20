import { get, set } from './Storage'

class DeviceServiceController {

    devices = [
        {
            id: '1',
            name: '599media Foundation Breakpoints',
            userAgents: [
                {
                    id: '1',
                    name: 'Small',
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
                    height: 768,
                    width: 360,
                },
                {
                    id: '2',
                    name: 'Medium',
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
                    height: 768,
                    width: 640,
                },
                {
                    id: '3',
                    name: 'Large',
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
                    height: 768,
                    width: 1004,
                },
                {
                    id: '4',
                    name: 'xLarge',
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
                    height: 768,
                    width: 1140,
                },
                {
                    id: '5',
                    name: 'xxLarge',
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
                    height: 768,
                    width: 1440,
                },
            ],
        },
        {
            id: '2',
            name: 'Android Phones',
            userAgents: [
                {
                    id: '1',
                    name: 'HTC One X - Landscape',
                    userAgent: 'Mozilla/5.0 (Linux; Android 4.0.3; HTC One X Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19',
                    height: 360,
                    width: 640,
                },
                {
                    id: '2',
                    name: 'HTC One X - Portrait',
                    userAgent: 'Mozilla/5.0 (Linux; Android 4.0.3; HTC One X Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19',
                    height: 640,
                    width: 360,
                },
                {
                    id: '3',
                    name: 'Samsung Galaxy S6 - Landscape',
                    userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; SM-G920F Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.95 Mobile',
                    height: 360,
                    width: 640,
                },
                {
                    id: '4',
                    name: 'Samsung Galaxy S6 - Portrait',
                    userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; SM-G920F Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.95 Mobile',
                    height: 640,
                    width: 360,
                },
                {
                    id: '5',
                    name: 'Samsung Galaxy S6 Edge - Landscape',
                    userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; SM-G925F Build/LMY47X; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/47.0.2526.100 Mobile Safari/537.36',
                    height: 360,
                    width: 640,
                },
                {
                    id: '6',
                    name: 'Samsung Galaxy S6 Edge - Portrait',
                    userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; SM-G925F Build/LMY47X; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/47.0.2526.100 Mobile Safari/537.36',
                    height: 640,
                    width: 360,
                },
                {
                    id: '7',
                    name: 'LG G5 - Landscape',
                    userAgent: 'Mozilla/5.0 (Linux; Android 6.0; LG-H830 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36',
                    height: 360,
                    width: 640,
                },
                {
                    id: '8',
                    name: 'LG G5 - Portrait',
                    userAgent: 'Mozilla/5.0 (Linux; Android 6.0; LG-H830 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36',
                    height: 640,
                    width: 360,
                },
            ],
        },
        {
            id: '3',
            name: 'Android Tablets',
            userAgents: [
                {
                    id: '1',
                    name: 'Nexus 10 - Landscape',
                    userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 10 Build/LMY49F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Safari/537.36',
                    height: 800,
                    width: 1280,
                },
                {
                    id: '2',
                    name: 'Nexus 10 - Portrait',
                    userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 10 Build/LMY49F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Safari/537.36',
                    height: 1280,
                    width: 800,
                },
                {
                    id: '3',
                    name: 'Nexus 7 - Landscape',
                    userAgent: 'Mozilla/5.0 (Linux; Android 4.2.1; Nexus 7 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19',
                    height: 600,
                    width: 960,
                },
                {
                    id: '4',
                    name: 'Nexus 7 - Portrait',
                    userAgent: 'Mozilla/5.0 (Linux; Android 4.2.1; Nexus 7 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19',
                    height: 960,
                    width: 600,
                },
                {
                    id: '5',
                    name: 'Surface Pro 3 - Landscape',
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko',
                    height: 960,
                    width: 1440,
                },
                {
                    id: '6',
                    name: 'Surface Pro 3 - Portrait',
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko',
                    height: 1440,
                    width: 960,
                },
            ],
        },
        {
            id: '4',
            name: 'Misc',
            userAgents: [
                {
                    id: '1',
                    name: 'BlackBerry Z10 - Landscape',
                    userAgent: 'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
                    height: 384,
                    width: 640,
                },
                {
                    id: '2',
                    name: 'BlackBerry Z10 - Portrait',
                    userAgent: 'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
                    height: 640,
                    width: 384,
                },
                {
                    id: '3',
                    name: 'Kindle Fire - Landscape',
                    userAgent: 'Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Kindle Fire Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
                    height: 600,
                    width: 1024,
                },
                {
                    id: '4',
                    name: 'Kindle Fire - Portrait',
                    userAgent: 'Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Kindle Fire Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
                    height: 1024,
                    width: 600,
                },
            ],
        },
        {
            id: '5',
            name: 'iPad',
            userAgents: [
                {
                    id: '1',
                    name: 'iPad - Landscape',
                    userAgent: 'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
                    width: 1024,
                    height: 768,
                },
                {
                    id: '2',
                    name: 'iPad - Portrait',
                    userAgent: 'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
                    height: 1024,
                    width: 768,
                },
                {
                    id: '3',
                    name: 'iPad Pro - Landscape',
                    userAgent: 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
                    width: 2732,
                    height: 2048,
                },
                {
                    id: '4',
                    name: 'iPad Pro - Portrait',
                    userAgent: 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
                    height: 2732,
                    width: 2048,
                },
                {
                    id: '5',
                    name: 'iPad Mini - Landscape',
                    userAgent: 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A406 Safari/8536.25',
                    width: 1024,
                    height: 768,
                },
                {
                    id: '6',
                    name: 'iPad Mini - Portrait',
                    userAgent: 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A406 Safari/8536.25',
                    height: 1024,
                    width: 768,
                },
                {
                    id: '7',
                    name: 'iPad Mini 2-4 - Landscape',
                    userAgent: 'Mozilla/5.0 (iPad; CPU OS 8_1_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B466 Safari/600.1.4',
                    width: 2048,
                    height: 1536,
                },
                {
                    id: '8',
                    name: 'iPad Mini 2-4 - Portrait',
                    userAgent: 'Mozilla/5.0 (iPad; CPU OS 8_1_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B466 Safari/600.1.4',
                    height: 2048,
                    width: 1536,
                },
            ],
        },
        {
            id: '6',
            name: 'iPhone',
            userAgents: [
                {
                    id: '1',
                    name: 'iPhone 4 - Landscape',
                    userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5',
                    height: 320,
                    width: 480,
                },
                {
                    id: '2',
                    name: 'iPhone 4 - Portrait',
                    userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5',
                    width: 320,
                    height: 480,
                },
                {
                    id: '3',
                    name: 'iPhone 5 - Landscape',
                    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
                    height: 320,
                    width: 568,
                },
                {
                    id: '4',
                    name: 'iPhone 5 - Portrait',
                    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
                    width: 320,
                    height: 568,
                },
                {
                    id: '5',
                    name: 'iPhone 7 - Landscape',
                    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4',
                    height: 375,
                    width: 667,
                },
                {
                    id: '6',
                    name: 'iPhone 7 - Portrait',
                    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4',
                    width: 375,
                    height: 667,
                },
                {
                    id: '7',
                    name: 'iPhone 7 Plus - Landscape',
                    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4',
                    height: 414,
                    width: 736,
                },
                {
                    id: '8',
                    name: 'iPhone 7 Plus - Portrait',
                    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4',
                    width: 414,
                    height: 736,
                },
            ],
        },
    ]

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

    async get (id) {
        return this.devices.find(device => device.id === id)
    }

    async create (device) {
        let id = Math.max(...this.devices.map(device => parseInt(device.id)), 0) + 1
        this.devices.push({
            id: id.toString(), name: device.name, content: device.content,
        })
        await this.save()
    }

    async update (id, device) {
        let index = this.devices.indexOf(this.get(id))
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
