import React from 'react'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import Home from '../pages/Home'
import Texts from '../pages/Texts'
import Devices from '../pages/Devices'
import Footer from '../components/Footer'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 12,
    fontSize: 10,
    fontFamily: [
      '-apple-system',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif'
    ].join(',')
  },
  palette: {
    primary: {
      light: '#3572e3',
      main: '#1E61D9',
      dark: '#15459d',
      contrastText: '#fff'
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
})

export default class App extends React.Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Route path="/" component={Home} exact={true}/>
          <Route path="/texts" component={Texts} exact={true}/>
          <Route path="/devices" component={Devices} exact={true}/>
          <Footer/>
        </Router>
      </ThemeProvider>
    )
  }
}
