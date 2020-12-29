/*global chrome*/

import React from 'react'
import { List, ListItem, ListItemText, Typography, ListSubheader } from '@material-ui/core'
import { Launch } from '@material-ui/icons'

import { ValidatorService } from '../services/ValidatorService'
import Header from '../components/Header'

export default class Home extends React.Component {

  actions = [
    {
      name: 'Grid Overlay',
      func: this.toggleGridOverlay,
      params: []
    }, {
      name: 'Outline Headings',
      func: this.toggleOutlines,
      params: ['outlineHeadings']
    }, {
      name: 'Outline Image Alternative Attributes',
      func: this.toggleOutlines,
      params: ['outlineElementAttribute', 'img', 'alt']
    }, {
      name: 'Outline Anchor Title Attributes',
      func: this.toggleOutlines,
      params: ['outlineElementAttribute', 'a', 'title']
    }, {
      name: 'Outline Button Title Attributes',
      func: this.toggleOutlines,
      params: ['outlineElementAttribute', 'button', 'title']
    }
  ]

  state = {
    validators: []
  }

  constructor(props: any) {
    super(props)

    this.state = {
      validators: []
    }
  }

  async componentDidMount() {
    this.setState({
      validators: [...(await ValidatorService.load())]
    })
  }

  toggleGridOverlay() {
    // @ts-ignore
    chrome.tabs.query({
      active: true,
      currentWindow: true
      // @ts-ignore
    }, (tabs) => {
      // @ts-ignore
      chrome.tabs.sendMessage(tabs[0].id, {
        function: 'toggleGridOverlay'
      })
    })
  }

  toggleOutlines(params: any) {
    // @ts-ignore
    chrome.tabs.query({
      active: true,
      currentWindow: true
      // @ts-ignore
    }, (tabs) => {
      // @ts-ignore
      chrome.tabs.sendMessage(tabs[0].id, {
        function: params[0],
        selector: params[1],
        attribute: params[2]
      })
    })
  }

  validate(url: string) {
    // @ts-ignore
    chrome.tabs.query({
      active: true,
      currentWindow: true
      // @ts-ignore
    }, (tabs) => {
      // @ts-ignore
      chrome.tabs.create({ url: url + tabs[0].url })
    })
  }

  render() {
    return (
      <>

        <Header title="Dirty Little Helper"/>

        <main>
          <List subheader={<li/>} style={{backgroundColor: 'inherit'}}>

            {this.actions.length > 0 ? (
              <li style={{backgroundColor: 'inherit'}}>
                <ul style={{backgroundColor: 'inherit', padding: 0}}>
                  <ListSubheader style={{backgroundColor: '#ddd'}}>
                    <ListItemText disableTypography primary={
                      <Typography style={{fontSize: 18, fontWeight: 'bold'}}>
                        Tools
                      </Typography>
                    } style={{paddingTop: 18, paddingBottom: 18, paddingRight: 48, margin: 0}}/>
                  </ListSubheader>
                  <List>
                    {this.actions.map((action: any, index: number) => (
                      <ListItem key={index} button onClick={() => action.func(action.params)}>
                        <ListItemText>{action.name}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </ul>
              </li>
            ) : null}

            {this.state.validators.length > 0 ? (
              <li style={{backgroundColor: 'inherit'}}>
                <ul style={{backgroundColor: 'inherit', padding: 0}}>
                  <ListSubheader style={{backgroundColor: '#ddd'}}>
                    <ListItemText disableTypography primary={
                      <Typography style={{fontSize: 18, fontWeight: 'bold'}}>
                        Validators
                      </Typography>
                    } style={{paddingTop: 18, paddingBottom: 18, paddingRight: 48, margin: 0}}/>
                  </ListSubheader>
                  <List>
                    {this.state.validators.map((validator: any, index: number) => (
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
