import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as IconBack } from "../assets/icons/chevron-left.svg";
import { UserAgentGroup } from '../interfaces/UserAgentGroup'
import { UserAgentGroupService } from '../services/UserAgentGroupService'

export default class UserAgentGroups extends React.Component {

  state = {
    userAgentGroups: []
  }

  async componentDidMount() {
    this.setState({
      userAgentGroups: [...(await UserAgentGroupService.load())]
    })
  }

  async delete(userAgentGroup: UserAgentGroup) {
    // @ts-ignore
    let index = this.state.userAgentGroups.indexOf(text)
    if (index > -1) {
      this.state.userAgentGroups.splice(index, 1)
    }
    await UserAgentGroupService.delete(userAgentGroup)
    this.setState({
      userAgentGroups: [...(await UserAgentGroupService.load())]
    })
  }

  render() {
    return (<>
      <h2>
        <Link to="/settings" className="btn btn-back">
          <IconBack width={16} height={16} />
        </Link>
        UserAgentGroups
        <div className="float-right">
          <Link to="/settings">
            <button>←</button>
          </Link>
          <Link to="/settings/useragentgroups/add">
            <button>+</button>
          </Link>
        </div>
        <div className="clearfix"/>
      </h2>
      <ul className="scrollable">
        {this.state.userAgentGroups.map((userAgentGroup: UserAgentGroup, index: number) => (<li key={index}>
          <span>{userAgentGroup.name}</span>
          <div className="float-right">
            <Link to={`/settings/useragentgroups/edit/${userAgentGroup.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => this.delete(userAgentGroup)}>Delete</button>
          </div>
          <div className="clearfix"/>
        </li>))}
      </ul>
    </>)
  }
}
