import React from 'react'
import { MemoryRouter as Router, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Texts from '../pages/Texts'
import Devices from '../pages/Devices'

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Route path="/" component={Home} exact={true}/>
        <Route path="/texts" component={Texts} exact={true}/>
        <Route path="/devices" component={Devices} exact={true}/>
      </Router>
    )
  }
}
