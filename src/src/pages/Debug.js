/*global chrome*/

import React from 'react'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from '@material-ui/core'

import Header from '../components/Header'

import A11yIcon from '../components/Icons/A11y'
import ToolIcon from '../components/Icons/Tool'
import Tota11yIcon from '../components/Icons/Tota11y'

export default class Texts extends React.Component {

    actionGroups = [
        {
            name: 'Accessibility with A11y',
            actions: [
                {
                    icon: <A11yIcon/>,
                    name: 'Advices',
                    description: 'Outline advices, errors, warnings and obsoletes',
                    fn: 'toggleA11y',
                    params: {
                        language: 'en',
                        level: 'advice'
                    }
                }, {
                    icon: <A11yIcon/>,
                    name: 'Obsoletes',
                    description: 'Outline errors, warnings and obsoletes',
                    fn: 'toggleA11y',
                    params: {
                        language: 'en',
                        level: 'obsolete'
                    },
                }, {
                    icon: <A11yIcon/>,
                    name: 'Warnings',
                    description: 'Outline warnings and ',
                    fn: 'toggleA11y',
                    params: {
                        language: 'en',
                        level: 'warning'
                    },
                }, {
                    icon: <A11yIcon/>,
                    name: 'Errors',
                    description: 'Outline ',
                    fn: 'toggleA11y',
                    params: {
                        language: 'en',
                        level: 'error'
                    },
                }
            ]
        }, {
            name: 'Accessibility with Tota11y',
            actions: [
                {
                    icon: <Tota11yIcon/>,
                    name: 'Tota11y',
                    description: 'Start accessibility visualization toolkit',
                    fn: 'toggleTota11y',
                }
            ]
        }, {
            name: 'Content Debugging',
            actions: [
                {
                    name: 'Editing',
                    description: 'Start content editing and spell checking',
                    fn: 'toggleContentEdit',
                }, {
                    name: 'Readability',
                    description: 'Check readability of sentences using the automated readybility index',
                    fn: 'toggleReadability',
                }, {
                    name: 'Content Chaos Test',
                    description: 'Randomly half, double or triple text to check if your layout doesn\'t break',
                    fn: 'toggleContentChaos',
                }
            ]
        }, {
            name: 'Outlines',
            actions: [
                {
                    name: 'Layout',
                    description: 'Draw boxes around all elements',
                    fn: 'toggleOutline',
                    params: {
                        type: 'layout'
                    },
                }, {
                    name: 'Focus',
                    description: 'Draw boxes around focus elements',
                    fn: 'toggleOutline',
                    params: {
                        type: 'focus'
                    },
                }, {
                    name: 'Headings',
                    description: 'Draw boxes around all headings',
                    fn: 'toggleOutline',
                    params: {
                        type: 'headings'
                    },
                }, {
                    name: 'Image alternative attributes',
                    description: 'Draw boxes around images with missing alt attribute',
                    fn: 'toggleOutline',
                    params: {
                        type: 'images',
                        tag: 'img',
                        attribute: 'alt'
                    },
                }, {
                    name: 'Anchor title attributes',
                    description: 'Draw boxes around anchors with missing title attribute',
                    fn: 'toggleOutline',
                    params: {
                        type: 'anchors',
                        tag: 'a',
                        attribute: 'title'
                    },
                }, {
                    name: 'Button title attributes',
                    description: 'Draw boxes around buttons with missing title attribute',
                    fn: 'toggleOutline',
                    params: {
                        type: 'buttons',
                        tag: 'button',
                        attribute: 'title'
                    },
                }, {
                    name: 'Show Z-Index',
                    description: 'Highlight all elements with a z-index',
                    fn: 'toggleZIndex',
                }
            ]
        }
    ]

    handleToggle (fn, params) {
        chrome.tabs.query({
            active: true,
            currentWindow: true,
        }, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, {
                function: fn,
                params: params ? JSON.stringify(params) : null
            })
        })
    }

    render () {
        return (
            <>
                <Header title="Debug"/>
                <main>
                    <List subheader={<li/>} style={{ backgroundColor: 'inherit' }}>
                        {(this.actionGroups !== undefined || this.actionGroups > 0) && this.actionGroups.map((actionGroup, index) => (
                            <li key={index} style={{ backgroundColor: 'inherit' }}>
                                <ul style={{ backgroundColor: 'inherit', padding: 0 }}>
                                    <ListSubheader style={{ backgroundColor: '#ddd' }}>
                                        <ListItemText disableTypography primary={
                                            <Typography style={{ fontSize: 16, fontWeight: 'bold' }}>
                                                {actionGroup.name}
                                            </Typography>
                                        } style={{ paddingTop: 16, paddingBottom: 16, paddingRight: 48, margin: 0 }}/>
                                    </ListSubheader>
                                    <List>
                                        {actionGroup.actions !== undefined && actionGroup.actions.length > 0 && actionGroup.actions.map((action, index) => (
                                            <ListItem key={index} button onClick={this.handleToggle.bind(this, action.fn, action.params)}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        {action.icon ? action.icon : (<ToolIcon />)}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={action.name} secondary={action.description}/>
                                            </ListItem>
                                        ))}
                                    </List>
                                </ul>
                            </li>
                        ))}
                    </List>
                </main>
            </>
        )
    }
}
