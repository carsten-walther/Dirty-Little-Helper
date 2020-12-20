import React from 'react'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {

  render() {
    return (
      <>
        <section>
          <h2>Devices</h2>
          <p>Manage devices for simulating your web contents.</p>
          <div>
            <Link to="/devices">
              <button>Devices</button>
            </Link>
          </div>
        </section>
        <section>
          <h2>Texts</h2>
          <p>Manage dummy texts for inserting into input fields.</p>
          <div>
            <Link to="/texts">
              <button>Texts</button>
            </Link>
          </div>
        </section>
      </>
    )
  }
}
