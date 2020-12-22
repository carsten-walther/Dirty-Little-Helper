import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as IconBack } from '../assets/icons/arrow.svg'

export default class Settings extends React.Component {

  render() {
    return (<>
        <h2>
          <Link to="/" className="btn btn-back">
            <IconBack width={16} height={16} />
          </Link>
          Settings
        </h2>
        <section>
          <h2 className="title">Device Manager</h2>
          <p>Manage devices for simulating your web contents.</p>
          <div className="float-right">
            <Link to="/settings/devicemanager">
              <button>Manage</button>
            </Link>
          </div>
          <div className="clearfix"/>
        </section>
        <section>
          <h2 className="title">User Agent Groups</h2>
          <p>Manage groups for simulating your web contents.</p>
          <div className="float-right">
            <Link to="/settings/useragentgroups">
              <button>Manage</button>
            </Link>
          </div>
          <div className="clearfix"/>
        </section>
        <section>
          <h2 className="title">User Agents</h2>
          <p>Manage devices for simulating your web contents.</p>
          <div className="float-right">
            <Link to="/settings/useragents">
              <button>Manage</button>
            </Link>
          </div>
          <div className="clearfix"/>
        </section>
        <section>
          <h2 className="title">Texts</h2>
          <p>Manage dummy texts for inserting into input fields.</p>
          <div className="float-right">
            <Link to="/settings/texts">
              <button>Manage</button>
            </Link>
          </div>
          <div className="clearfix"/>
        </section>
      </>)
  }
}
