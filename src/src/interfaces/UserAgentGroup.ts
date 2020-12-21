import { UserAgent } from './UserAgent'

export interface UserAgentGroup {
  id?: any,
  name: string,
  userAgents?: UserAgent[]
}
