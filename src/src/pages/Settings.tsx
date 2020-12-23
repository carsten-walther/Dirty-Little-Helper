import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ReactComponent as IconChevronRight } from '../assets/icons/chevron-right.svg'

export default class Settings extends React.Component {

  render() {
    return (
      <>
        <Header title="Settings" backTo={'/'} />
        <main>
          <section>
            <ul className="stacked-list">
              <li>
                <Link to="/settings/devicemanager">
                  <div>
                    <p className="title">Devices</p>
                    <p>Manage devices for simulating your web contents.</p>
                  </div>
                  <IconChevronRight width={18} height={18} />
                </Link>
              </li>
              <li>
                <Link to="/settings/useragentgroups">
                  <div>
                    <p className="title">User Agent Groups</p>
                    <p>Manage groups for simulating your web contents.</p>
                  </div>
                  <IconChevronRight width={18} height={18} />
                </Link>
              </li>
              <li>
                <Link to="/settings/useragents">
                  <div>
                    <p className="title">User Agents</p>
                    <p>Manage devices for simulating your web contents.</p>
                  </div>
                  <IconChevronRight width={18} height={18} />
                </Link>
              </li>
              <li>
                <Link to="/settings/texts">
                  <div>
                    <p className="title">Dummy Texts</p>
                    <p>Manage dummy texts for inserting into input fields.</p>
                  </div>
                  <IconChevronRight width={18} height={18} />
                </Link>
              </li>
            </ul>
          </section>
        </main>
        <Footer />
      </>
    )
  }
}
