import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Apps, Devices, Message } from '@material-ui/icons'

export default class Footer extends React.Component {

  state = {
    pathMap: [
      '/',
      '/devices',
      '/texts'
    ]
  }

  render() {
    return (
      <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Tools" icon={<Apps />} component={props => <Link {...props} to={this.state.pathMap[0]}/>}/>
          <BottomNavigationAction label="Devices" icon={<Devices />} component={props => <Link {...props} to={this.state.pathMap[1]}/>}/>
          <BottomNavigationAction label="Texts" icon={<Message />} component={props => <Link {...props} to={this.state.pathMap[2]}/>}/>
        </BottomNavigation>
      </AppBar>
    )
  }
}
