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

    state = {
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

        this.openDialog = this.openDialog.bind(this)
        this.openEditDialog = this.openEditDialog.bind(this)
        this.closeDialog = this.closeDialog.bind(this)

        this.handleGroupChange = this.handleGroupChange.bind(this)
        this.handleGroupSubmit = this.handleGroupSubmit.bind(this)

        this.handleDeviceChange = this.handleDeviceChange.bind(this)
        this.handleDeviceSubmit = this.handleDeviceSubmit.bind(this)
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

        if (typeof this.state.group.id === 'undefined') {
            DeviceService.create(this.state.group)
        } else {
            DeviceService.update(this.state.group.id, this.state.group)
        }

        this.setState({
            devices: [...(await DeviceService.load())],
        })

        this.closeDialog('groupDialogOpen')
        this.closeDialog('dialogOpen')

        event.preventDefault()
    }

    async handleDeviceSubmit (event) {

        let group = await DeviceService.get(this.state.device.group)

        let device = this.state.device
        delete device.group

        if (group.userAgents) {
            // @ts-ignore
            device.id = (Math.max(...group.userAgents.map((device) => parseInt(device.id)), 0) + 1).toString()
        } else {
            // @ts-ignore
            device.id = (1).toString()
            group.userAgents = []
        }

        group.userAgents.push(device)
        DeviceService.update(this.state.group.id, this.state.group)

        this.setState({
            devices: [...(await DeviceService.load())],
        })

        this.closeDialog('deviceDialogOpen')
        this.closeDialog('dialogOpen')

        event.preventDefault()
    }

    openGroupBrowser (group) {
        group.userAgents.forEach((userAgent) => {
            // @ts-ignore
            chrome.tabs.query({
                active: true, currentWindow: true,
                // @ts-ignore
            }, (tabs) => {
                // @ts-ignore
                openPopupWindow(userAgent.width, userAgent.height, tabs[0].url, userAgent.userAgent)
            })
        })
    }

    openDeviceBrowser (userAgent) {
        // @ts-ignore
        chrome.tabs.query({
            active: true, currentWindow: true,
            // @ts-ignore
        }, (tabs) => {
            // @ts-ignore
            openPopupWindow(userAgent.width, userAgent.height, tabs[0].url, userAgent.userAgent)
        })
    }

    async deleteGroup (group) {
        // @ts-ignore
        let indexGroup = this.state.devices.indexOf(group)
        // @ts-ignore
        this.state.devices.splice(indexGroup, 1)

        DeviceService.devices = this.state.devices

        await DeviceService.save()
        this.setState({
            devices: [...(await DeviceService.load())],
        })
    }

    async deleteDevice (group, device) {
        let indexGroup = this.state.devices.indexOf(group)
        let indexDevice = this.state.devices[indexGroup].userAgents.indexOf(device)
        this.state.devices[indexGroup].userAgents.splice(indexDevice, 1)

        await DeviceService.save()
        this.setState({
            devices: [...(await DeviceService.load())],
        })
    }

    render () {
        return (
            <>

                <Header title="Devices">
                    <IconButton edge="end" color="inherit" onClick={() => this.openDialog('dialogOpen')}>
                        <Add/>
                    </IconButton>
                </Header>

                <main>
                    {this.state.devices.length > 0 ? (
                        <List subheader={<li/>} style={{ backgroundColor: 'inherit' }}>
                            {this.state.devices.map((group, groupIndex) => (
                                <li key={`section-${groupIndex}`} style={{ backgroundColor: 'inherit' }}>
                                    <ul style={{ backgroundColor: 'inherit', padding: 0 }}>
                                        <ListSubheader title="Open all in Browser" style={{ cursor: 'pointer', backgroundColor: '#ddd' }}>
                                            <ListItemText disableTypography primary={<Typography style={{ fontSize: 18, fontWeight: 'bold' }}>{cropText(group.name, 25)}</Typography>} onClick={() => this.openGroupBrowser(group)} style={{ paddingTop: 18, paddingBottom: 18, paddingRight: 48, margin: 0 }}/>
                                            <ListItemSecondaryAction>
                                                <IconButton color="inherit" title="Edit Element" onClick={() => this.openEditDialog('groupDialogOpen', group)}>
                                                    <Edit/>
                                                </IconButton>
                                                <IconButton edge="end" color="inherit" title="Delete Element" onClick={() => {if (window.confirm('Are you sure you wish to delete this group?')) this.deleteGroup(group)}}>
                                                    <Delete/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListSubheader>
                                        {group.userAgents?.length > 0 ? (
                                            <List>
                                                {group.userAgents.map((device, deviceIndex) => (
                                                    <ListItem key={deviceIndex} dense button onClick={() => this.openDeviceBrowser(device)} title="Open in Browser">
                                                        <ListItemText style={{ paddingRight: 48 }} primary={device.name} secondary={`Width ${device.width}px Height ${device.height}px`}/>
                                                        <ListItemSecondaryAction>
                                                            <IconButton color="inherit" title="Edit Element" onClick={() => this.openEditDialog('deviceDialogOpen', device)}>
                                                                <Edit/>
                                                            </IconButton>
                                                            <IconButton edge="end" color="inherit" title="Delete Element" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteDevice(group, device)}}>
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

                <Dialog open={this.state.dialogOpen} onClose={() => this.closeDialog('dialogOpen')} TransitionComponent={Transition} keepMounted>
                    <DialogTitle>
                        Add New Element
                    </DialogTitle>
                    <List>
                        <ListItem autoFocus button onClick={() => this.openDialog('groupDialogOpen')}>
                            <ListItemAvatar>
                                <Avatar>
                                    <Add/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Add Group"/>
                        </ListItem>
                        {this.state.devices?.length > 0 ? (
                            <ListItem autoFocus button onClick={() => this.openDialog('deviceDialogOpen')}>
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

                <Dialog open={this.state.groupDialogOpen} onClose={() => this.closeDialog('groupDialogOpen')} TransitionComponent={Transition} keepMounted>
                    <form noValidate autoComplete="off" onSubmit={this.handleGroupSubmit}>
                        <DialogTitle>
                            Group
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter the name of the group
                            </DialogContentText>
                            <TextField type="text" label="Name" name="name" value={this.state.group.name || ''} autoFocus fullWidth required onChange={this.handleGroupChange}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.closeDialog('groupDialogOpen')} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <Dialog open={this.state.deviceDialogOpen} onClose={() => this.closeDialog('deviceDialogOpen')} TransitionComponent={Transition} keepMounted>
                    <form noValidate autoComplete="off" onSubmit={this.handleDeviceSubmit}>
                        <DialogTitle>
                            Device
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter the name, user agent and size of the new device.
                            </DialogContentText>
                            <TextField type="text" label="Name" name="name" value={this.state.device.name || ''} autoFocus fullWidth required onChange={this.handleDeviceChange}/>
                            <TextField select label="Group" name="group" value={this.state.device.group || ''} autoFocus fullWidth required onChange={this.handleDeviceChange}>
                                {this.state.devices.map((group) => (
                                    <MenuItem key={group.id} value={group.id}>
                                        {group.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField type="text" label="UserAgent" name="userAgent" value={this.state.device.userAgent || ''} autoFocus fullWidth multiline rows={3} required onChange={this.handleDeviceChange}/>
                            <TextField type="text" label="Width" name="width" value={this.state.device.width || ''} autoFocus fullWidth required onChange={this.handleDeviceChange}/>
                            <TextField type="text" label="Height" name="height" value={this.state.device.height || ''} autoFocus fullWidth required onChange={this.handleDeviceChange}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.closeDialog('deviceDialogOpen')} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

            </>
        )
    }
}
