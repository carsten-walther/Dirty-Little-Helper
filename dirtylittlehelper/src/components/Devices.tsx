import React from 'react'
import { Link } from 'react-router-dom'

export default class Devices extends React.Component {

  render() {
    return (
      <>
        <h2>Devices</h2>
        <Link to="/">
          <button>Back</button>
        </Link>
      </>
    )
  }
}
