import { get, set } from './Storage'

class TextServiceController {

    texts = []
    storageKey = 'texts'

    async load () {
        if (this.texts.length > 0) {
            return this.texts
        } else {
            this.texts = (await get(this.storageKey)) || []
            return this.texts
        }
    }

    async save () {
        return await set(this.storageKey, this.texts)
    }

    get (id) {
        return this.texts.find(text => text.id === id)
    }

    create (text) {
        let id = Math.max(...this.texts.map(text => parseInt(text.id)), 0) + 1
        this.texts.push({
            id: id.toString(),
            name: text.name,
            content: text.content,
        })
        this.save()
    }

    update (id, text) {
        let index = this.texts.indexOf(this.get(id))
        this.texts[index] = text
        this.save()
    }

    delete (text) {
        let index = this.texts.indexOf(text)
        if (index > -1) {
            this.texts.splice(index, 1)
            this.save()
        }
    }
}

export const TextService = new TextServiceController()
