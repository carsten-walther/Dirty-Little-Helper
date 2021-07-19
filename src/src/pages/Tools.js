/*global chrome*/

import React from 'react'
import { List, ListItem, ListItemText, ListSubheader, Typography } from '@material-ui/core'
import { Launch } from '@material-ui/icons'

import { ValidatorService } from '../services/ValidatorService'
import Header from '../components/Header'

export default class Tools extends React.Component {

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
    }

    async componentDidMount () {
        this.setState({
            validators: [...(await ValidatorService.load())],
        })
    }

    validate (url) {
        chrome.tabs.query({
            active: true,
            currentWindow: true,
        }, tabs => {
            chrome.tabs.create({
                url: url + tabs[0].url
            })
        })
    }

    render () {
        return (
            <>
                <Header title="Tools"/>
                <main>
                    <List subheader={<li/>} style={{ backgroundColor: 'inherit' }}>
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
                                            <ListItem key={index} button onClick={this.validate.bind(this, validator.url)}>
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
