import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'

import { ReactComponent as Logo } from './../assets/icon.svg'

export default class Header extends React.Component {
    render () {
        return (
            <AppBar position="fixed" style={{ top: 0, bottom: 'auto' }}>
                <Toolbar>
                    <Grid container justifyContent="flex-start">
                        {this.props.backTo ? (
                            <IconButton edge="start" color="inherit" component={props => <Link {...props} to={this.props.backTo}/>}>
                                <ChevronLeft/>
                            </IconButton>
                        ) : null}
                        <Typography variant="h6" style={{ position: 'relative', top: -2, whiteSpace: 'nowrap' }}>
                            <Logo width={24} height={24} style={{ position: 'relative', top: 5 }}/> {this.props.title}
                        </Typography>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        {this.props.children ? this.props.children : null}
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}
