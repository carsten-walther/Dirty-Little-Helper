import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Apps, Devices, Flip, Message } from '@material-ui/icons'

export default class Footer extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            value: 0
        }
    }

    handleChange (event, value) {
        this.setState({
            value: value
        })
    }

    render () {
        return (
            <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
                <BottomNavigation showLabels value={this.state.value} onChange={this.handleChange.bind(this)}>
                    <BottomNavigationAction label="Debug" icon={<Flip/>} component={React.forwardRef((props, ref) => <Link {...props} to="/debug"/>)}/>
                    <BottomNavigationAction label="Tools" icon={<Apps/>} component={React.forwardRef((props, ref) => <Link {...props} to="/tools"/>)}/>
                    <BottomNavigationAction label="Devices" icon={<Devices/>} component={React.forwardRef((props, ref) => <Link {...props} to="/devices"/>)}/>
                    <BottomNavigationAction label="Texts" icon={<Message/>} component={React.forwardRef((props, ref) => <Link {...props} to="/texts"/>)}/>
                </BottomNavigation>
            </AppBar>
        )
    }
}
