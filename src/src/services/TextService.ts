import { set, get } from './Storage'
import { Text } from '../interfaces/Text'

class TextServiceController {

  private storageKey: string = 'texts'

  public texts: Text[] = []

  async load(): Promise<Text[]> {
    if (this.texts.length > 0) {
      return this.texts
    } else {
      this.texts = (await get(this.storageKey)) || []
      return this.texts
    }
  }

  async save(): Promise<void> {
    return await set(this.storageKey, this.texts)
  }

  get(id: any): Text {
    return this.texts.find(text => text.id === id) as Text
  }

  create(text: Text): void {
    // Create a unique id that is one larger than the current largest id
    let id = Math.max(...this.texts.map(text => parseInt(text.id)), 0) + 1
    this.texts.push({
      id: id.toString(),
      name: text.name,
      content: text.content
    })
    this.save()
  }

  update(id: any, text: Text): void {
    // Get the index in the array of the text that was passed in
    let index = this.texts.indexOf(this.get(id))
    this.texts[index] = text
    this.save()
  }

  delete(text: Text): void {
    // Get the index in the array of the text that was passed in
    let index = this.texts.indexOf(text)
    // Delete that element of the array and resave the data
    if (index > -1) {
      this.texts.splice(index, 1)
      this.save()
    }
  }
}

export const TextService = new TextServiceController()
