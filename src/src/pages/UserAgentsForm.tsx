import React from 'react'
import { Link } from 'react-router-dom'
import { UserAgent } from "../interfaces/UserAgent"
import { UserAgentService } from "../services/UserAgentService"

export default class UserAgentsForm extends React.Component {

  state = {
    id: undefined,
    name: undefined,
    userAgent: undefined,
    width: undefined,
    height: undefined
  }

  constructor(props: any) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    // @ts-ignore
    const { match: { params } } = this.props
    if (params.id) {
      await UserAgentService.load()
      this.setState({...await UserAgentService.get(params.id)})
    }
  }

  handleChange(event: any) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event: any) {
    let userAgent = this.state as unknown as UserAgent
    if (typeof userAgent.id === 'undefined') {
      UserAgentService.create(userAgent)
    } else {
      UserAgentService.update(userAgent.id, userAgent)
    }
    event.preventDefault()
    // @ts-ignore
    this.props.history.push("/useragents")
  }

  render() {
    return (
      <>
        <h2>
          UserAgent
          <div className="float-right">
            <Link to="/settings/useragents">
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
            <label htmlFor="content">UserAgent</label>
            <input type="text" id="userAgent" name="userAgent" value={this.state.userAgent} onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor="name">Width</label>
            <input type="number" id="width" name="width" value={this.state.width} onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor="name">Height</label>
            <input type="number" id="height" name="height" value={this.state.height} onChange={this.handleChange}/>
          </div>
          <div className="float-right">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </>
    )
  }
}
