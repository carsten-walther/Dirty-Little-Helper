import { UserAgent } from '../interfaces/UserAgent'
import { get, set } from './Storage'

class UserAgentServiceController {

  public userAgents: UserAgent[] = []
  private storageKey: string = 'userAgents'

  async load(): Promise<UserAgent[]> {
    if (this.userAgents.length > 0) {
      return this.userAgents
    } else {
      this.userAgents = (await get(this.storageKey)) || []
      return this.userAgents
    }
  }

  async save(): Promise<void> {
    return await set(this.storageKey, this.userAgents)
  }

  get(id: any): UserAgent {
    return this.userAgents.find(userAgent => userAgent.id === id) as UserAgent
  }

  create(userAgent: UserAgent): void {
    // Create a unique id that is one larger than the current largest id
    let id = Math.max(...this.userAgents.map(userAgent => parseInt(userAgent.id)), 0) + 1
    this.userAgents.push({
      id: id.toString(), name: userAgent.name, userAgent: userAgent.userAgent, width: userAgent.width, height: userAgent.height
    })
    this.save()
  }

  update(id: any, userAgent: UserAgent): void {
    // Get the index in the array of the userAgent that was passed in
    let index = this.userAgents.indexOf(this.get(id))
    this.userAgents[index] = userAgent
    this.save()
  }

  delete(userAgent: UserAgent): void {
    // Get the index in the array of the userAgent that was passed in
    let index = this.userAgents.indexOf(userAgent)
    // Delete that element of the array and resave the data
    if (index > -1) {
      this.userAgents.splice(index, 1)
      this.save()
    }
  }
}

export const UserAgentService = new UserAgentServiceController()
