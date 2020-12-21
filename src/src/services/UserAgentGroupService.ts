import { UserAgentGroup } from '../interfaces/UserAgentGroup'
import { get, set } from './Storage'

class UserAgentGroupServiceController {

  public userAgentGroups: UserAgentGroup[] = []
  private storageKey: string = 'userAgentGroups'

  async load(): Promise<UserAgentGroup[]> {
    if (this.userAgentGroups.length > 0) {
      return this.userAgentGroups
    } else {
      this.userAgentGroups = (await get(this.storageKey)) || []
      return this.userAgentGroups
    }
  }

  async save(): Promise<void> {
    return await set(this.storageKey, this.userAgentGroups)
  }

  get(id: any): UserAgentGroup {
    return this.userAgentGroups.find(userAgentGroup => userAgentGroup.id === id) as UserAgentGroup
  }

  create(userAgentGroup: UserAgentGroup): void {
    // Create a unique id that is one larger than the current largest id
    let id = Math.max(...this.userAgentGroups.map(userAgentGroup => parseInt(userAgentGroup.id)), 0) + 1
    this.userAgentGroups.push({
      id: id.toString(), name: userAgentGroup.name, userAgents: userAgentGroup.userAgents
    })
    this.save()
  }

  update(id: any, userAgentGroup: UserAgentGroup): void {
    // Get the index in the array of the userAgentGroup that was passed in
    let index = this.userAgentGroups.indexOf(this.get(id))
    this.userAgentGroups[index] = userAgentGroup
    this.save()
  }

  delete(userAgentGroup: UserAgentGroup): void {
    // Get the index in the array of the userAgentGroup that was passed in
    let index = this.userAgentGroups.indexOf(userAgentGroup)
    // Delete that element of the array and resave the data
    if (index > -1) {
      this.userAgentGroups.splice(index, 1)
      this.save()
    }
  }
}

export const UserAgentGroupService = new UserAgentGroupServiceController()
