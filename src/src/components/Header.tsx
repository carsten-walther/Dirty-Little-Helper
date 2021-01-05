import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Grid, Typography, IconButton } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'

import { ReactComponent as Logo } from './../assets/icon.svg'

interface HeaderProps {
  title?: string,
  backTo?: string|null
  children?: any|null
}

export default class Header extends React.Component<HeaderProps> {

  constructor(props: HeaderProps) {
    super(props)

    props = {
      title: '',
      backTo: null,
      children: null
    }
  }

  render() {
    return (
      <AppBar position="fixed" style={{ top: 0, bottom: 'auto' }}>
        <Toolbar>
          <Grid container justify="flex-start">
            {this.props.backTo ? (
              <IconButton edge="start" color="inherit" component={props => <Link {...props} to={this.props.backTo}/>}>
                <ChevronLeft />
              </IconButton>
            ) : null}
            <Typography variant="h6" style={{ position: 'relative', top: -2, whiteSpace: 'nowrap' }}>
              <Logo width={24} height={24} style={{ position: 'relative', top: 5 }} /> {this.props.title}
            </Typography>
          </Grid>
          <Grid container justify="flex-end">
            {this.props.children ? this.props.children : null}
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}
