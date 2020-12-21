import React from 'react'
import { Link } from 'react-router-dom'
import { UserAgent } from '../interfaces/UserAgent'
import { UserAgentGroup } from '../interfaces/UserAgentGroup'
import { UserAgentService } from '../services/UserAgentService'
import { UserAgentGroupService } from '../services/UserAgentGroupService'

export default class UserAgentGroupsForm extends React.Component {

  userAgents : UserAgent[] = []

  state = {
    id: undefined, name: undefined, userAgents: undefined
  }

  constructor(props: any) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    // @ts-ignore
    const {match: {params}} = this.props
    if (params.id) {
      await UserAgentGroupService.load()
      this.setState({...await UserAgentGroupService.get(params.id)})
    }
    this.userAgents = [...(await UserAgentService.load())]
  }

  handleChange(event: any) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event: any) {
    let userAgentGroup = this.state as unknown as UserAgentGroup
    if (typeof userAgentGroup.id === 'undefined') {
      UserAgentGroupService.create(userAgentGroup)
    } else {
      UserAgentGroupService.update(userAgentGroup.id, userAgentGroup)
    }
    event.preventDefault()
    // @ts-ignore
    this.props.history.push("/settings/useragentgroups")
  }

  render() {
    console.log(this.userAgents)
    return (<>
      <h2>
        User Agent Group
        <div className="float-right">
          <Link to="/settings/useragentgroups">
            <button>←</button>
          </Link>
        </div>
      </h2>
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange}/>
        </div>
        <div>
          <label htmlFor="userAgents">User Agents</label>
          <select id="userAgents" name="userAgents" multiple={true} value={this.state.userAgents} onChange={this.handleChange}>
            {this.userAgents.map((userAgent: UserAgent, index: number) => (
              <option value={userAgent.id} key={index}>
                {userAgent.name}
              </option>
            ))}
          </select>
        </div>
        <div className="float-right">
          <input type="submit" value="Submit"/>
        </div>
      </form>
    </>)
  }
}
