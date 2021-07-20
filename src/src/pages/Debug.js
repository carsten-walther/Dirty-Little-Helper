/*global chrome*/

import React from 'react'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from '@material-ui/core'

import Header from '../components/Header'

import A11yIcon from '../components/Icons/A11y'
import ToolIcon from '../components/Icons/Tool'
import Tota11yIcon from '../components/Icons/Tota11y'
import GridIcon from '../components/Icons/Grid'
import EditIcon from '../components/Icons/Edit'
import ReadabilityIcon from '../components/Icons/Readability'
import ContentChaosIcon from '../components/Icons/ContentChaos'
import OutlineIcon from '../components/Icons/Outline'
import FocusIcon from '../components/Icons/Focus'
import HeadingIcon from '../components/Icons/Heading'
import ImageIcon from '../components/Icons/Image'
import IndexIcon from '../components/Icons/Index'
import HelpIcon from '../components/Icons/Help'
import HideIcon from '../components/Icons/Hide'

export default class Texts extends React.Component {

    actionGroups = [
        {
            name: 'Accessibility with A11y',
            active: true,
            actions: [
                {
                    icon: <A11yIcon/>,
                    name: 'Advices',
                    description: 'Outline errors, warnings, obsoletes, advices',
                    active: true,
                    fn: 'toggleA11y',
                    params: {
                        language: 'en',
                        level: 'advice',
                    },
                }, {
                    icon: <A11yIcon/>,
                    name: 'Obsoletes',
                    description: 'Outline errors, warnings and obsoletes',
                    active: true,
                    fn: 'toggleA11y',
                    params: {
                        language: 'en',
                        level: 'obsolete',
                    },
                }, {
                    icon: <A11yIcon/>,
                    name: 'Warnings',
                    description: 'Outline errors and warnings',
                    active: true,
                    fn: 'toggleA11y',
                    params: {
                        language: 'en',
                        level: 'warning',
                    },
                }, {
                    icon: <A11yIcon/>,
                    name: 'Errors',
                    description: 'Outline errors',
                    active: true,
                    fn: 'toggleA11y',
                    params: {
                        language: 'en',
                        level: 'error',
                    },
                },
            ],
        }, {
            name: 'Accessibility with Tota11y',
            active: true,
            actions: [
                {
                    icon: <Tota11yIcon/>,
                    name: 'Tota11y',
                    description: 'Start accessibility visualization toolkit',
                    active: true,
                    fn: 'toggleTota11y',
                },
            ],
        }, {
            name: 'Grid',
            active: true,
            actions: [
                {
                    icon: <GridIcon/>,
                    name: 'Show grid',
                    description: 'Draws the CSS framework grid',
                    active: true,
                    arguments: {
                        columns: [1, 2, 3, 4, 6, 8, 9, 10, 12],
                    },
                    fn: 'toggleGrid',
                    params: {
                        columns: 12,
                    },
                },
            ],
        }, {
            name: 'Content Debugging',
            active: true,
            actions: [
                {
                    icon: <EditIcon/>,
                    name: 'Editing',
                    description: 'Start content editing and spell checking',
                    active: true,
                    fn: 'toggleContentEdit',
                }, {
                    icon: <ReadabilityIcon/>,
                    name: 'Readability',
                    description: 'Check readability of sentences using the automated readybility index',
                    active: true,
                    fn: 'toggleReadability',
                }, {
                    icon: <ContentChaosIcon/>,
                    name: 'Content Chaos Test',
                    description: 'Randomly half, double or triple text to check if your layout doesn\'t break',
                    active: true,
                    fn: 'toggleContentChaos',
                },
            ],
        }, {
            name: 'Outlines',
            active: true,
            actions: [
                {
                    icon: <OutlineIcon/>,
                    name: 'Layout',
                    description: 'Draw boxes around all elements',
                    active: true,
                    fn: 'toggleOutline',
                    params: {
                        type: 'layout',
                    },
                }, {
                    icon: <FocusIcon/>,
                    name: 'Focus',
                    description: 'Draw boxes around focus elements',
                    active: true,
                    fn: 'toggleOutline',
                    params: {
                        type: 'focus',
                    },
                }, {
                    icon: <HeadingIcon/>,
                    name: 'Headings',
                    description: 'Draw boxes around all headings',
                    active: true,
                    fn: 'toggleOutline',
                    params: {
                        type: 'headings',
                        tag: 'h1, h2, h3, h4, h5, h6',
                    },
                }, {
                    icon: <ImageIcon/>,
                    name: 'Image alternative attributes',
                    description: 'Draw boxes around images with missing alt attribute',
                    active: true,
                    fn: 'toggleOutline',
                    params: {
                        type: 'images',
                        tag: 'img',
                        attribute: 'alt',
                    },
                }, {
                    icon: <HelpIcon/>,
                    name: 'Anchor title attributes',
                    description: 'Draw boxes around anchors with missing title attribute',
                    active: true,
                    fn: 'toggleOutline',
                    params: {
                        type: 'anchors',
                        tag: 'a',
                        attribute: 'title',
                    },
                }, {
                    icon: <HelpIcon/>,
                    name: 'Button title attributes',
                    description: 'Draw boxes around buttons with missing title attribute',
                    active: true,
                    fn: 'toggleOutline',
                    params: {
                        type: 'buttons',
                        tag: 'button, input[type="submit"]',
                        attribute: 'title',
                    },
                }, {
                    icon: <IndexIcon/>,
                    name: 'Show Z-Index',
                    description: 'Highlight all elements with a z-index',
                    active: true,
                    fn: 'toggleZIndex',
                },
            ],
        }, {
            name: 'Disabling',
            active: true,
            actions: [
                {
                    icon: <HideIcon/>,
                    name: 'CSS',
                    description: 'Disable all styling on the page',
                    active: true,
                    fn: 'toggleDisableCss',
                }, {
                    icon: <HideIcon/>,
                    name: 'Images',
                    description: 'Disable all images on the page',
                    active: true,
                    fn: 'toggleDisableImages',
                },
            ],
        }
    ]

    handleAction (fn, params) {
        chrome.tabs.query({
            active: true,
            currentWindow: true,
        }, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, {
                function: fn,
                params: params ? JSON.stringify(params) : null,
            })
        })
    }

    render () {
        return (
            <>
                <Header title="Debug"/>
                <main>
                    <List>
                        {(this.actionGroups !== undefined || this.actionGroups > 0) && this.actionGroups.map((actionGroup, index) => actionGroup.active && (
                            <li key={index} style={{ backgroundColor: 'inherit' }}>
                                <ul style={{ backgroundColor: 'inherit', padding: 0 }}>
                                    <ListSubheader>
                                        <ListItemText disableTypography primary={
                                            <Typography style={{ fontSize: 14 }}>
                                                {actionGroup.name}
                                            </Typography>
                                        } style={{ paddingTop: 8, paddingBottom: 8, margin: 0 }}/>
                                    </ListSubheader>
                                    <List style={{ padding: 0 }}>
                                        {actionGroup.actions !== undefined && actionGroup.actions.length > 0 && actionGroup.actions.map((action, index) => action.active && (
                                            <ListItem key={index} button onClick={this.handleAction.bind(this, action.fn, action.params)} style={{ borderBottom: '1px solid #ddd' }}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        {action.icon ? action.icon : (<ToolIcon/>)}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={action.name} secondary={action.description}/>

                                                {/* arguments rendering should be here */}

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
