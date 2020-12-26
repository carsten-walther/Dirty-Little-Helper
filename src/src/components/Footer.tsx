import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Apps, Devices, Message } from '@material-ui/icons'

export default class Footer extends React.Component {

  state = {
    value: 0
  }

  constructor(props: any) {
    super(props)

    this.state = {
      value: 0
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: any, value: any) {
    this.setState({
      value: value
    })
  }

  render() {
    return (
      <AppBar position="fixed" style={{top: 'auto', bottom: 0}}>
        <BottomNavigation showLabels value={this.state.value} onChange={(event, value) => this.handleChange(event, value)}>
          <BottomNavigationAction label="Tools" icon={<Apps />} component={React.forwardRef((props, ref) => <Link {...props} to="/"/>)}/>
          <BottomNavigationAction label="Devices" icon={<Devices />} component={React.forwardRef((props, ref) => <Link {...props} to="/devices"/>)}/>
          <BottomNavigationAction label="Texts" icon={<Message />} component={React.forwardRef((props, ref) => <Link {...props} to="/texts"/>)}/>
        </BottomNavigation>
      </AppBar>
    )
  }
}
