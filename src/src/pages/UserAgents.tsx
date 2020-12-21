import React from 'react'
import { Link } from 'react-router-dom'
import { UserAgent } from "../interfaces/UserAgent";
import { UserAgentService } from "../services/UserAgentService";

export default class UserAgents extends React.Component {

  state = {
    userAgents: []
  }

  async componentDidMount() {
    this.setState({
      userAgents: [...(await UserAgentService.load())]
    })
  }

  async delete(userAgent: UserAgent) {
    // @ts-ignore
    let index = this.state.userAgents.indexOf(text)
    if (index > -1) {
      this.state.userAgents.splice(index, 1)
    }
    await UserAgentService.delete(userAgent)
    this.setState({
      userAgents: [...(await UserAgentService.load())]
    })
  }

  render() {
    return (<>
        <h2>
          UserAgents
          <div className="float-right">
            <Link to="/settings">
              <button>←</button>
            </Link>
            <Link to="/settings/useragents/add">
              <button>+</button>
            </Link>
          </div>
          <div className="clearfix"/>
        </h2>
        <ul className="scrollable">
          {this.state.userAgents.map((userAgent: UserAgent, index: number) => (<li key={index}>
              <span>{userAgent.name}</span>
              <div className="float-right">
                <Link to={`/settings/useragents/edit/${userAgent.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => this.delete(userAgent)}>Delete</button>
              </div>
              <div className="clearfix"/>
            </li>))}
        </ul>
      </>)
  }
}
