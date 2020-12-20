import React from 'react'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Home from '../components/Home'
import Devices from '../components/Devices'
import Texts from '../components/Texts'
import TextForm from '../components/TextForm'

export default class App extends React.Component {

  render() {
    return (
      <>
        <header>
          <h1>Dirty Little Helper</h1>
        </header>
        <main>
          <Router>
            <Route path="/" component={Home} exact={true} />
            <Route path="/devices" component={Devices} exact={true} />
            <Route path="/texts" component={Texts} exact={true} />
            <Route path="/text/add" component={TextForm} exact={true} />
            <Route path="/text/show/:id" component={TextForm} exact={true} />
          </Router>
        </main>
        <footer>
          <p className="float-right">Version: 2.0.0</p>
        </footer>
      </>
    )
  }
}
