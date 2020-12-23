import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as IconChevronLeft } from '../assets/icons/chevron-left.svg'

interface HeaderProps {
  title?: string,
  backTo?: string|null
  children?: any|null
}

export default class App extends React.Component {

  props: HeaderProps = {
    title: '',
    backTo: null,
    children: null
  }

  render() {
    return (
      <header>
        {this.props.backTo ? (
          <h1>
            <Link to={this.props.backTo}>
              <IconChevronLeft width={18} height={18} /> {this.props.title}
            </Link>
            {this.props.children ? (
              <div className="float-right">
                {this.props.children}
              </div>
            ) : null}
          </h1>
        ) : (
          <h1>
            {this.props.title}
            {this.props.children ? (
              <div className="float-right">
                {this.props.children}
              </div>
            ) : null}
          </h1>
        )}
      </header>
    )
  }
}
