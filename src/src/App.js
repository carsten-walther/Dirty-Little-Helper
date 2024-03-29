import React from 'react'
import { MemoryRouter as Router, Redirect, Route } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@material-ui/core/styles'

import Tools from './pages/Tools'
import Debug from './pages/Debug'
import Texts from './pages/Texts'
import Devices from './pages/Devices'
import Footer from './components/Footer'

const theme = createTheme({
    typography: {
        htmlFontSize: 10,
        fontSize: 8,
        fontFamily: [
            'Helvetica',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    palette: {
        primary: {
            light: '#3572e3',
            main: '#1E61D9',
            dark: '#15459d',
            contrastText: '#ffffff',
        },
    },
    props: {
        MuiButtonBase: {
            disableRipple: false,
        },
    },
    overrides: {
        MuiBottomNavigation: {
            root: {
                height: 48
            }
        },
        MuiBottomNavigationAction: {
            root: {
                minWidth: 60
            }
        },
        MuiList: {
            root: {
                backgroundColor: 'inherit',
                padding: 0
            },
            padding: {
                paddingTop: 0,
                paddingBottom: 0,
            }
        },
        MuiListSubheader: {
            root: {
                backgroundColor: '#dddddd'
            },
            sticky: {
                backgroundColor: '#dddddd'
            }
        },
        MuiListItem: {
            root: {
                paddingTop: 4,
                paddingBottom: 4,
                borderBottom: '1px solid #dddddd'
            }
        }
    }
})

export default class App extends React.Component {
    render () {
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <Redirect from="/" to="/debug" />
                    <Route path="/debug" component={Debug} exact/>
                    <Route path="/tools" component={Tools} exact/>
                    <Route path="/devices" component={Devices} exact/>
                    <Route path="/texts" component={Texts} exact/>
                    <Footer/>
                </Router>
            </ThemeProvider>
        )
    }
}
