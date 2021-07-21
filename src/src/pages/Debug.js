/*global chrome*/

import React from 'react'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography, ListItemSecondaryAction, IconButton, Select, MenuItem } from '@material-ui/core'

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
import PrintIcon from '../components/Icons/Print'

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
                    help: 'ally',
                    fn: 'toggleA11y',
                    defaults: {
                        language: 'en',
                        level: 'advice',
                    },
                }, {
                    icon: <A11yIcon/>,
                    name: 'Obsoletes',
                    description: 'Outline errors, warnings and obsoletes',
                    active: true,
                    help: 'ally',
                    fn: 'toggleA11y',
                    defaults: {
                        language: 'en',
                        level: 'obsolete',
                    },
                }, {
                    icon: <A11yIcon/>,
                    name: 'Warnings',
                    description: 'Outline errors and warnings',
                    active: true,
                    help: 'ally',
                    fn: 'toggleA11y',
                    defaults: {
                        language: 'en',
                        level: 'warning',
                    },
                }, {
                    icon: <A11yIcon/>,
                    name: 'Errors',
                    description: 'Outline errors',
                    active: true,
                    help: 'ally',
                    fn: 'toggleA11y',
                    defaults: {
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
                    help: 'tota11y',
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
                    help: 'grid',
                    arguments: {
                        columns: [1, 2, 3, 4, 6, 8, 9, 10, 12],
                    },
                    fn: 'toggleGrid',
                    defaults: {
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
                    description: 'Check readability of sentences using the automated readability index',
                    active: true,
                    help: 'readability',
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
                    defaults: {
                        type: 'layout',
                    },
                }, {
                    icon: <FocusIcon/>,
                    name: 'Focus',
                    description: 'Draw boxes around focus elements',
                    active: true,
                    fn: 'toggleOutline',
                    defaults: {
                        type: 'focus',
                    },
                }, {
                    icon: <HeadingIcon/>,
                    name: 'Headings',
                    description: 'Draw boxes around all headings',
                    active: true,
                    fn: 'toggleOutline',
                    defaults: {
                        type: 'headings',
                        tag: 'h1, h2, h3, h4, h5, h6',
                    },
                }, {
                    icon: <ImageIcon/>,
                    name: 'Image alternative attributes',
                    description: 'Draw boxes around images with missing alt attribute',
                    active: true,
                    fn: 'toggleOutline',
                    defaults: {
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
                    defaults: {
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
                    defaults: {
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
            name: 'Styling',
            active: true,
            actions: [
                {
                    icon: <HideIcon/>,
                    name: 'Disable CSS',
                    description: 'Disable all styling on the page',
                    active: true,
                    fn: 'toggleDisableCss',
                }
            ]
        }, {
            name: 'Images',
            active: true,
            actions: [{
                    icon: <HideIcon/>,
                    name: 'Disable images',
                    description: 'Disable all images on the page',
                    active: true,
                    fn: 'toggleDisableImages',
                },
            ],
        }, {
            name: 'Scrollbars',
            active: true,
            actions: [
                {
                    name: 'Unneeded scroll bars',
                    description: 'Render unneeded scroll bars that are invisible on MacOS/with overlay scroll bars',
                    active: true,
                    fn: 'toggleScrollbars',
                }
            ],
        }
    ]

    constructor (props) {
        super(props)
        this.state = {
            paramName: '',
            paramValue: ''
        }
    }

    handleAction (action) {
        let params = null
        if (this.state.paramName !== "" && this.state.paramValue !== "") {
            params = {[this.state.paramName]: this.state.paramValue}
        } else {
            params = action.defaults
        }
        if (chrome.tabs !== undefined) {
            chrome.tabs.query({
                active: true,
                currentWindow: true,
            }, tabs => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    function: action.fn,
                    params: JSON.stringify(params)
                })
            })
        }
    }

    handleOpenHelp (section) {
        if (chrome.tabs !== undefined) {
            chrome.tabs.create({
                url: `chrome-extension://${chrome.runtime.id}/html/help/${section}.html`
            })
        }
    }

    handleChange (name, event) {
        let fieldValue = null

        switch (event.target.type) {
            default:
                fieldValue = event.target.value
                break
            case 'file':
                fieldValue = event.target.files[0]
                break
            case 'checkbox':
                fieldValue = !!event.target.checked
                break
            case 'radio':
                fieldValue = event.target.value
                break
        }

        this.setState({
            paramName: name,
            paramValue: fieldValue,
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
                                    <List>
                                        {actionGroup.actions !== undefined && actionGroup.actions.length > 0 && actionGroup.actions.map((action, index) => action.active && (
                                            <ListItem key={index} button onClick={this.handleAction.bind(this, action)}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        {action.icon ? action.icon : (
                                                            <ToolIcon/>
                                                        )}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={action.name} secondary={action.description}/>
                                                <ListItemSecondaryAction>
                                                    {action.arguments !== undefined && action.arguments.columns !== undefined && (
                                                        <Select name="columns" value={this.state.paramValue ? this.state.paramValue : action.defaults.columns} onClick={this.handleChange.bind(this, 'columns')}>
                                                            {action.arguments.columns.map((column, index) => (
                                                                <MenuItem key={index} value={column} style={{ border: 0 }}>
                                                                    {column} cols
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    )}
                                                    {action.help && (
                                                        <IconButton edge="end" onClick={this.handleOpenHelp.bind(this, action.help)}>
                                                            <HelpIcon />
                                                        </IconButton>
                                                    )}
                                                </ListItemSecondaryAction>
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
