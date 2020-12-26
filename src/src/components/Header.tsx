import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Grid, Typography, IconButton } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'

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
            <Typography variant="h6">
              {this.props.title}
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
