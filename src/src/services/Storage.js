const storage = window.localStorage

export function set (key, value) {
    return new Promise((resolve, reject) => {
        try {
            storage && storage.setItem(key, JSON.stringify(value))
            resolve()
        } catch (err) {
            reject(`Couldn't store object ${err}`)
        }
    })
}

export function remove (key) {
    return new Promise((resolve, reject) => {
        try {
            storage && storage.removeItem(key)
            resolve()
        } catch (err) {
            reject(`Couldn't remove object ${err}`)
        }
    })
}

export function get (key) {
    return new Promise((resolve, reject) => {
        try {
            if (storage) {
                const item = storage.getItem(key)
                if (item != null) {
                    resolve(JSON.parse(item))
                }
            }
            resolve(undefined)
        } catch (err) {
            reject(`Couldn't get object: ${err}`)
        }
    })
}
