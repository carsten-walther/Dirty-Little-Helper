import React from 'react'
import { Link, MemoryRouter as Router, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Settings from '../pages/Settings'
import DeviceManager from '../pages/DeviceManager'
import Texts from '../pages/Texts'
import TextsForm from '../pages/TextsForm'
import UserAgentGroups from '../pages/UserAgentGroups'
import UserAgentGroupsForm from '../pages/UserAgentGroupsForm'
import UserAgents from '../pages/UserAgents'
import UserAgentsForm from '../pages/UserAgentsForm'
import './App.css'

export default class App extends React.Component {

  render() {
    return (<Router>
        <header>
          <h1>Dirty Little Helper</h1>
        </header>
        <main>
          <Route path="/" component={Home} exact={true}/>

          <Route path="/settings" component={Settings} exact={true}/>

          <Route path="/settings/devicemanager" component={DeviceManager} exact={true}/>

          <Route path="/settings/useragentgroups" component={UserAgentGroups} exact={true}/>
          <Route path="/settings/useragentgroups/add" component={UserAgentGroupsForm} exact={true}/>
          <Route path="/settings/useragentgroups/edit/:id" component={UserAgentGroupsForm} exact={true}/>

          <Route path="/settings/useragents" component={UserAgents} exact={true}/>
          <Route path="/settings/useragents/add" component={UserAgentsForm} exact={true}/>
          <Route path="/settings/useragents/edit/:id" component={UserAgentsForm} exact={true}/>

          <Route path="/settings/texts" component={Texts} exact={true}/>
          <Route path="/settings/texts/add" component={TextsForm} exact={true}/>
          <Route path="/settings/texts/edit/:id" component={TextsForm} exact={true}/>
        </main>
        <footer>
          <p className="float-left">
            <Link to="/settings">Settings</Link>
            {/* this.props.location.pathname !== '/settings' ? <Link to="/settings">Settings</Link> : <Link to="/">Back</Link> */}
          </p>
          <p className="float-right">Version: 2.0.0</p>
        </footer>
      </Router>)
  }
}
