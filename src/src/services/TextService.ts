import { Text } from '../interfaces/Text'
import { get, set } from './Storage'

class TextServiceController {

  public texts: Text[] = []
  private storageKey: string = 'texts'

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
    let id = Math.max(...this.texts.map(text => parseInt(text.id)), 0) + 1
    this.texts.push({
      id: id.toString(),
      name: text.name,
      content: text.content
    })
    this.save()
  }

  update(id: any, text: Text): void {
    let index = this.texts.indexOf(this.get(id))
    this.texts[index] = text
    this.save()
  }

  delete(text: Text): void {
    let index = this.texts.indexOf(text)
    if (index > -1) {
      this.texts.splice(index, 1)
      this.save()
    }
  }
}

export const TextService = new TextServiceController()
