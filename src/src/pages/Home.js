/*global chrome*/

import React from 'react'
import { List, ListItem, ListItemText, ListSubheader, Typography } from '@material-ui/core'
import { Launch } from '@material-ui/icons'

import { ValidatorService } from '../services/ValidatorService'
import Header from '../components/Header'

export default class Home extends React.Component {

    actions = [
        {
            id: 'toggleGridOverlay',
            name: 'Grid Overlay',
            func: this.toggleGridOverlay,
            params: [],
        }
    ]

    columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    state = {
        validators: [],
        columnMenuOpen: false,
        column: 12,
        anchorEl: null,
    }

    constructor (props) {
        super(props)

        this.state = {
            validators: [],
            columnMenuOpen: false,
            column: 12,
            anchorEl: null,
        }

        this.toggleMenu = this.toggleMenu.bind(this)
        this.setColumn = this.setColumn.bind(this)
    }

    async componentDidMount () {
        this.setState({
            validators: [...(await ValidatorService.load())],
        })
    }

    toggleGridOverlay (columns) {
        // @ts-ignore
        chrome.tabs.query({
            active: true,
            currentWindow: true,
            // @ts-ignore
        }, (tabs) => {
            // @ts-ignore
            chrome.tabs.sendMessage(tabs[0].id, {
                function: 'toggleGridOverlay',
                columns: columns,
            })
        })
    }

    toggleFocus () {
        // @ts-ignore
        chrome.tabs.query({
            active: true,
            currentWindow: true,
            // @ts-ignore
        }, (tabs) => {
            // @ts-ignore
            chrome.tabs.sendMessage(tabs[0].id, {
                function: 'toggleFocus',
            })
        })
    }

    toggleOutlines (params) {
        // @ts-ignore
        chrome.tabs.query({
            active: true,
            currentWindow: true,
            // @ts-ignore
        }, (tabs) => {
            // @ts-ignore
            chrome.tabs.sendMessage(tabs[0].id, {
                function: params[0],
                selector: params[1],
                attribute: params[2],
            })
        })
    }

    validate (url) {
        // @ts-ignore
        chrome.tabs.query({
            active: true,
            currentWindow: true,
            // @ts-ignore
        }, (tabs) => {
            // @ts-ignore
            chrome.tabs.create({ url: url + tabs[0].url })
        })
    }

    toggleMenu (menu, state) {
        this.setState({
            [menu]: state,
        })
    }

    setColumn (event) {
        this.setState({
            anchorEl: event.currentTarget,
        })
        console.log(this.state)
    }

    render () {
        // @ts-ignore
        return (
            <>

                <Header title="Dirty Little Helper"/>

                <main>
                    <List subheader={<li/>} style={{ backgroundColor: 'inherit' }}>

                        {this.actions.length > 0 ? (
                            <li style={{ backgroundColor: 'inherit' }}>
                                <ul style={{ backgroundColor: 'inherit', padding: 0 }}>
                                    <ListSubheader style={{ backgroundColor: '#ddd' }}>
                                        <ListItemText disableTypography primary={
                                            <Typography style={{ fontSize: 16, fontWeight: 'bold' }}>
                                                Tools
                                            </Typography>
                                        } style={{ paddingTop: 16, paddingBottom: 16, paddingRight: 48, margin: 0 }}/>
                                    </ListSubheader>
                                    <List>
                                        {this.actions.map((action, index) => (
                                            action.id === 'toggleGridOverlay' ? (
                                                <ListItem key={index} button onClick={() => action.func(action.params)}>
                                                    <ListItemText>{action.name}</ListItemText>
                                                    {/*}
                          <ListItemSecondaryAction>
                            <IconButton aria-label="more" aria-controls="column-menu" aria-haspopup="true" onClick={() => this.toggleMenu('columnMenuOpen', true)}>
                              <MoreVert />
                            </IconButton>
                            <Menu id="column-menu" anchorEl={this.state.anchorEl} keepMounted open={this.state.columnMenuOpen} onClose={() => this.toggleMenu('columnMenuOpen', false)}>
                              {this.columns.map((column) => (
                                <MenuItem key={column} selected={column === this.state.column} onClick={() => this.toggleMenu('columnMenuOpen', false)}>
                                  {column === 1 ? column + ' Column' : column + ' Columns'}
                                </MenuItem>
                              ))}
                            </Menu>
                          </ListItemSecondaryAction>
                          {*/}
                                                </ListItem>
                                            ) : (
                                                <ListItem key={index} button onClick={() => action.func(action.params)}>
                                                    <ListItemText>{action.name}</ListItemText>
                                                </ListItem>
                                            )
                                        ))}
                                    </List>
                                </ul>
                            </li>
                        ) : null}

                        {this.state.validators.length > 0 ? (
                            <li style={{ backgroundColor: 'inherit' }}>
                                <ul style={{ backgroundColor: 'inherit', padding: 0 }}>
                                    <ListSubheader style={{ backgroundColor: '#ddd' }}>
                                        <ListItemText disableTypography primary={
                                            <Typography style={{ fontSize: 16, fontWeight: 'bold' }}>
                                                Validators
                                            </Typography>
                                        } style={{ paddingTop: 16, paddingBottom: 16, paddingRight: 48, margin: 0 }}/>
                                    </ListSubheader>
                                    <List>
                                        {this.state.validators.map((validator, index) => (
                                            <ListItem key={index} button onClick={() => this.validate(validator.url)}>
                                                <ListItemText>{validator.name}</ListItemText>
                                                <Launch/>
                                            </ListItem>
                                        ))}
                                    </List>
                                </ul>
                            </li>
                        ) : null}
                    </List>
                </main>
            </>
        )
    }
}
