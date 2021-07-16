/*global chrome*/

import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'

import Header from '../components/Header'

export default class Texts extends React.Component {

    actions = [
        {
            id: 'a11y',
            name: 'A11y',
            func: this.toggleA11y,
            params: ['en', 'all'],
        }, {
            id: 'tota11y',
            name: 'Tota11y',
            func: this.toggleTota11y,
            params: [],
        }
    ]

    toggleA11y () {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                function: 'toggleA11y'
            })
        })
    }

    toggleTota11y () {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                function: 'toggleTota11y'
            })
        })
    }

    render () {
        return (
            <>
                <Header title="Debug"/>
                <main>
                    <List subheader={<li/>} style={{ backgroundColor: 'inherit' }}>
                        {this.actions.length > 0 ? (
                            <li style={{ backgroundColor: 'inherit' }}>
                                <ul style={{ backgroundColor: 'inherit', padding: 0 }}>
                                    <List>
                                        {this.actions.map((action, index) => (
                                            <ListItem key={index} button onClick={() => action.func(action.params)}>
                                                <ListItemText>{action.name}</ListItemText>
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
