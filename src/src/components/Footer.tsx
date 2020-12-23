import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as IconSettings } from '../assets/icons/settings.svg'

export default class App extends React.Component {

  render() {
    return (
      <footer>
        <p className="float-left">
          <Link to="/settings">
            <IconSettings width={16} height={16} /> Settings
          </Link>
        </p>
        <p className="float-right">Version: 2.0.0</p>
      </footer>
    )
  }
}
