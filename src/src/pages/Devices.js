/*global chrome*/

import React from 'react'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, ListSubheader, MenuItem, Slide, TextField, Typography } from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'

import Header from '../components/Header'
import { DeviceService } from '../services/DeviceService'
import { cropText, openPopupWindow } from '../utilities/Utilities'

const Transition = React.forwardRef(function Transition (props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default class Devices extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            dialogOpen: false,
            groupDialogOpen: false,
            deviceDialogOpen: false,
            group: {
                id: undefined,
                name: undefined,
                userAgents: [],
            },
            device: {
                id: undefined,
                name: undefined,
                group: undefined,
                userAgent: undefined,
                width: undefined,
                height: undefined,
            },
            devices: [],
        }
    }

    async componentDidMount () {
        this.setState({
            devices: [...(await DeviceService.load())],
        })
    }

    openDialog (which) {
        this.setState({
            group: {},
            device: {},
            [which]: true,
        })
    }

    openEditDialog (which, item) {
        this.setState({
            group: item,
            device: item,
            [which]: true,
        })
    }

    closeDialog (which) {
        this.setState({
            [which]: false,
        })
    }

    handleGroupChange (event) {
        this.setState({
            group: { ...this.state.group, [event.target.name]: event.target.value },
        })
    }

    handleDeviceChange (event) {
        this.setState({
            device: { ...this.state.device, [event.target.name]: event.target.value },
        })
    }

    async handleGroupSubmit (event) {
        event.preventDefault()

        if (typeof this.state.group.id === undefined) {
            await DeviceService.create(this.state.group)
        } else {
            await DeviceService.update(this.state.group.id, this.state.group)
        }

        this.setState({
            devices: [...(await DeviceService.load())],
        })

        this.closeDialog('groupDialogOpen')
        this.closeDialog('dialogOpen')
    }

    async handleDeviceSubmit (event) {
        event.preventDefault()

        let group = await DeviceService.get(this.state.device.group)

        let device = this.state.device
        delete device.group

        if (group.userAgents) {
            device.id = (Math.max(...group.userAgents.map((device) => parseInt(device.id)), 0) + 1).toString()
        } else {
            device.id = (1).toString()
            group.userAgents = []
        }

        group.userAgents.push(device)
        await DeviceService.update(this.state.group.id, this.state.group)

        this.setState({
            devices: [...(await DeviceService.load())],
        })

        this.closeDialog('deviceDialogOpen')
        this.closeDialog('dialogOpen')
    }

    openGroupBrowser (group) {
        group.userAgents.forEach((userAgent) => {
            if (chrome.tabs !== undefined) {
                chrome.tabs.query({
                    active: true, currentWindow: true,
                }, tabs => {
                    openPopupWindow(userAgent.width, userAgent.height, tabs[0].url, userAgent.userAgent)
                })
            }
        })
    }

    openDeviceBrowser (userAgent) {
        if (chrome.tabs !== undefined) {
            chrome.tabs.query({
                active: true, currentWindow: true,
            }, tabs => {
                openPopupWindow(userAgent.width, userAgent.height, tabs[0].url, userAgent.userAgent)
            })
        }
    }

    async deleteGroup (group) {
        if (window.confirm('Are you sure you wish to delete this group?')) {
            let indexGroup = this.state.devices.indexOf(group)
            this.state.devices.splice(indexGroup, 1)
            DeviceService.devices = this.state.devices
            await DeviceService.save()
            this.setState({
                devices: [...(await DeviceService.load())],
            })
        }
    }

    async deleteDevice (group, device) {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            let indexGroup = this.state.devices.indexOf(group)
            let indexDevice = this.state.devices[indexGroup].userAgents.indexOf(device)
            this.state.devices[indexGroup].userAgents.splice(indexDevice, 1)
            await DeviceService.save()
            this.setState({
                devices: [...(await DeviceService.load())],
            })
        }
    }

    render () {
        return (
            <>
                <Header title="Devices">
                    <IconButton edge="end" color="inherit" onClick={this.openDialog.bind(this, 'dialogOpen')}>
                        <Add/>
                    </IconButton>
                </Header>
                <main>
                    {this.state.devices.length > 0 ? (
                        <List>
                            {this.state.devices.map((group, groupIndex) => (
                                <li key={`section-${groupIndex}`} style={{ backgroundColor: 'inherit' }}>
                                    <ul style={{ backgroundColor: 'inherit', padding: 0 }}>
                                        <ListSubheader title="Open all in Browser">
                                            <ListItemText disableTypography primary={
                                                <Typography style={{ fontSize: 14 }}>
                                                    {cropText(group.name, 25)}
                                                </Typography>
                                            } style={{ paddingTop: 8, paddingBottom: 8, margin: 0 }} onClick={this.openGroupBrowser.bind(this, group)}/>
                                            <ListItemSecondaryAction>
                                                <IconButton color="inherit" title="Edit Element" onClick={this.openEditDialog.bind(this, 'groupDialogOpen', group)}>
                                                    <Edit/>
                                                </IconButton>
                                                <IconButton edge="end" color="inherit" title="Delete Element" onClick={this.deleteGroup.bind(this, group)}>
                                                    <Delete/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListSubheader>
                                        {group.userAgents?.length > 0 ? (
                                            <List>
                                                {group.userAgents.map((device, deviceIndex) => (
                                                    <ListItem key={deviceIndex} button onClick={this.openDeviceBrowser.bind(this, device)} title="Open in Browser">
                                                        <ListItemText style={{ paddingRight: 48 }} primary={device.name} secondary={`Width ${device.width}px Height ${device.height}px`}/>
                                                        <ListItemSecondaryAction>
                                                            <IconButton color="inherit" title="Edit Element" onClick={this.openEditDialog.bind(this, 'deviceDialogOpen', device)}>
                                                                <Edit/>
                                                            </IconButton>
                                                            <IconButton edge="end" color="inherit" title="Delete Element" onClick={this.deleteDevice.bind(this, group, device)}>
                                                                <Delete/>
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        ) : null}
                                    </ul>
                                </li>))}
                        </List>
                    ) : null}
                </main>

                <Dialog open={this.state.dialogOpen} onClose={this.closeDialog.bind(this, 'dialogOpen')} TransitionComponent={Transition} keepMounted>
                    <DialogTitle>
                        Add New Element
                    </DialogTitle>
                    <List style={{ paddingBottom: 16 }}>
                        <ListItem autoFocus button onClick={this.openDialog.bind(this, 'groupDialogOpen')} style={{ border: 0 }}>
                            <ListItemAvatar>
                                <Avatar>
                                    <Add/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Add Group"/>
                        </ListItem>
                        {this.state.devices?.length > 0 ? (
                            <ListItem autoFocus button onClick={this.openDialog.bind(this, 'deviceDialogOpen')} style={{ border: 0 }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Add/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Add Device"/>
                            </ListItem>
                        ) : null}
                    </List>
                </Dialog>

                <Dialog open={this.state.groupDialogOpen} onClose={this.closeDialog.bind(this, 'groupDialogOpen')} TransitionComponent={Transition} keepMounted>
                    <form noValidate autoComplete="off" onSubmit={this.handleGroupSubmit.bind(this)}>
                        <DialogTitle>
                            Group
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter the name of the group
                            </DialogContentText>
                            <TextField type="text" label="Name" name="name" value={this.state.group.name || ''} fullWidth required onChange={this.handleGroupChange.bind(this)}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeDialog.bind(this, 'groupDialogOpen')} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <Dialog open={this.state.deviceDialogOpen} onClose={this.closeDialog.bind(this, 'deviceDialogOpen')} TransitionComponent={Transition} keepMounted>
                    <form noValidate autoComplete="off" onSubmit={this.handleDeviceSubmit.bind(this)}>
                        <DialogTitle>
                            Device
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter the name, user agent and size of the new device.
                            </DialogContentText>
                            <TextField type="text" label="Name" name="name" value={this.state.device.name || ''} fullWidth required onChange={this.handleDeviceChange.bind(this)}/>
                            <TextField select label="Group" name="group" value={this.state.device.group || ''} fullWidth required onChange={this.handleDeviceChange.bind(this)}>
                                {this.state.devices.map((group) => (
                                    <MenuItem key={group.id} value={group.id}>
                                        {group.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField type="text" label="UserAgent" name="userAgent" value={this.state.device.userAgent || ''} fullWidth multiline rows={5} required onChange={this.handleDeviceChange.bind(this)}/>
                            <TextField type="number" label="Width" name="width" value={this.state.device.width || ''} fullWidth required onChange={this.handleDeviceChange.bind(this)}/>
                            <TextField type="number" label="Height" name="height" value={this.state.device.height || ''} fullWidth required onChange={this.handleDeviceChange.bind(this)}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeDialog.bind(this, 'deviceDialogOpen')} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

            </>
        )
    }
}
