/*global chrome*/

import React from 'react'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from '@material-ui/core'

import { ValidatorService } from '../services/ValidatorService'
import Header from '../components/Header'
import LaunchIcon from '../components/Icons/Launch'

export default class Tools extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            validators: []
        }
    }

    async componentDidMount () {
        this.setState({
            validators: [...(await ValidatorService.load())]
        })
    }

    handleAction (url) {
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
                    <List>
                        {this.state.validators.length > 0 ? (
                            <li style={{ backgroundColor: 'inherit' }}>
                                <ul style={{ backgroundColor: 'inherit', padding: 0 }}>
                                    <ListSubheader>
                                        <ListItemText disableTypography primary={
                                            <Typography style={{ fontSize: 14 }}>
                                                Validators
                                            </Typography>
                                        } style={{ paddingTop: 8, paddingBottom: 8, margin: 0 }}/>
                                    </ListSubheader>
                                    <List style={{ padding: 0 }}>
                                        {this.state.validators.map((validator, index) => (
                                            <ListItem key={index} button onClick={this.handleAction.bind(this, validator.url)} style={{ borderBottom: '1px solid #ddd' }}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <LaunchIcon/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={validator.name} secondary={validator.description}/>
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
