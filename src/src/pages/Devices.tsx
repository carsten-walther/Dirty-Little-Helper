/*global chrome*/

import React from 'react'
import { IconButton, Typography, List, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Slide } from '@material-ui/core'
import { Edit, Delete, Add } from '@material-ui/icons'

import { TransitionProps } from '@material-ui/core/transitions'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { DeviceService } from '../services/DeviceService'
import { cropText, openPopupWindow } from '../utilities/Utilities'

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children?: React.ReactElement<any, any> }, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default class Devices extends React.Component {

  state = {
    dialogOpen: false,
    device: {
      name: undefined,
      userAgent: undefined,
      width: undefined,
      height: undefined
    },
    devices: []
  }

  constructor(props: any) {
    super(props)

    this.state = {
      dialogOpen: false,
      device: {
        name: undefined,
        userAgent: undefined,
        width: undefined,
        height: undefined
      },
      devices: []
    }

    this.openNewDialog = this.openNewDialog.bind(this)
    this.openEditDialog = this.openEditDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    this.setState({
      devices: [...(await DeviceService.load())]
    })
  }

  openNewDialog() {
    this.setState({
      device: {},
      dialogOpen: true
    })
  }

  openEditDialog(device: any) {
    this.setState({
      device: device,
      dialogOpen: true
    })
  }

  closeDialog() {
    this.setState({
      dialogOpen: false
    })
  }

  handleChange(event: any) {
    this.setState({
      device: {...this.state.device, [event.target.name]: event.target.value}
    })
  }

  async handleSubmit(event: any) {

  }

  openGroupBrowser(group: any) {
    group.userAgents.map((userAgent: any) => {
      // @ts-ignore
      chrome.tabs.query({
        active: true, currentWindow: true
        // @ts-ignore
      }, (tabs) => {
        // @ts-ignore
        openPopupWindow(userAgent.width, userAgent.height, tabs[0].url, userAgent.userAgent)
      })
    })
  }

  openDeviceBrowser(userAgent: any) {
    // @ts-ignore
    chrome.tabs.query({
      active: true, currentWindow: true
      // @ts-ignore
    }, (tabs) => {
      // @ts-ignore
      openPopupWindow(userAgent.width, userAgent.height, tabs[0].url, userAgent.userAgent)
    })
  }

  async deleteGroup(group: any) {
    console.log(this.state.devices)
    // @ts-ignore
    let indexGroup = this.state.devices.indexOf(group)
    // @ts-ignore
    this.state.devices.splice(indexGroup, 1)

    await DeviceService.save()
    this.setState({
      devices: [...(await DeviceService.load())]
    })
  }

  async deleteDevice(group: any, device: any) {
    // @ts-ignore
    let indexGroup = this.state.devices.indexOf(group)
    // @ts-ignore
    let indexDevice = this.state.devices[indexGroup].userAgents.indexOf(device)
    // @ts-ignore
    this.state.devices[indexGroup].userAgents.splice(indexDevice, 1)

    await DeviceService.save()
    this.setState({
      devices: [...(await DeviceService.load())]
    })
  }

  render() {
    return (
      <>

        <Header title="Devices">
          <IconButton edge="end" color="inherit" onClick={this.openNewDialog}>
            <Add/>
          </IconButton>
        </Header>

        <main>
          {this.state.devices.length > 0 ? (
            <List subheader={<li/>} style={{backgroundColor: 'inherit'}}>
              {this.state.devices.map((group: any, groupIndex: number) => (
                <li key={`section-${groupIndex}`} style={{backgroundColor: 'inherit'}}>
                  <ul style={{backgroundColor: 'inherit', padding: 0}}>
                    <ListSubheader title="Open all in Browser" style={{cursor: 'pointer', backgroundColor: '#ddd'}}>
                      <ListItemText disableTypography primary={<Typography style={{fontSize: 18, fontWeight: 'bold'}}>{cropText(group.name, 25)}</Typography>} onClick={() => this.openGroupBrowser(group)} style={{paddingTop: 18, paddingBottom: 18, paddingRight: 48, margin: 0}}/>
                      <ListItemSecondaryAction>
                        <IconButton color="inherit" title="Edit Element">
                          <Edit/>
                        </IconButton>
                        <IconButton edge="end" color="inherit" title="Delete Element" onClick={() => {if (window.confirm('Are you sure you wish to delete this group?')) this.deleteGroup(group)}}>
                          <Delete/>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListSubheader>
                    {group.userAgents.length > 0 ? (
                      <List>
                        {group.userAgents.map((device: any, deviceIndex: number) => (
                          <ListItem key={deviceIndex} dense button onClick={() => this.openDeviceBrowser(device)} title="Open in Browser">
                            <ListItemText style={{paddingRight: 48}} primary={device.name} secondary={`Width ${device.width}px Height ${device.height}px`}/>
                            <ListItemSecondaryAction>
                              <IconButton color="inherit" title="Edit Element" onClick={() => this.openEditDialog(device)}>
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

        <Footer/>

        <Dialog open={this.state.dialogOpen} onClose={this.closeDialog} TransitionComponent={Transition} keepMounted>
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <DialogTitle>
              Device
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter a ...
              </DialogContentText>
              <TextField type="text" label="Name" name="name" value={this.state.device.name || ''} autoFocus fullWidth required onChange={this.handleChange}/>
              <TextField type="text" label="UserAgent" name="userAgent" value={this.state.device.userAgent || ''} autoFocus fullWidth multiline rows={3} required onChange={this.handleChange}/>
              <TextField type="text" label="Width" name="width" value={this.state.device.width || ''} autoFocus fullWidth required onChange={this.handleChange}/>
              <TextField type="text" label="Height" name="height" value={this.state.device.height || ''} autoFocus fullWidth required onChange={this.handleChange}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeDialog} color="primary">
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
