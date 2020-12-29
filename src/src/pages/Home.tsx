/*global chrome*/

import React from 'react'
import { List, Grid, Paper, Button, ListItem, ListItemText, Typography, ListSubheader } from '@material-ui/core'

import Header from '../components/Header'
import { cropText } from '../utilities/Utilities'

export default class Home extends React.Component {

  actions = [
    {
      name: 'Tools',
      type: 'list',
      actions: [
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
    }, {
      name: 'Validation',
      type: 'button',
      actions: [
        {
          name: 'Validate CSS',
          func: this.validate,
          params: ['http://jigsaw.w3.org/css-validator/validator?profile=css3&warning=0&uri=']
        }, {
          name: 'Validate HTML',
          func: this.validate,
          params: ['http://validator.w3.org/check?verbose=1&uri=']
        }, {
          name: 'Validate Feed',
          func: this.validate,
          params: ['http://validator.w3.org/feed/check.cgi?url=']
        }, {
          name: 'Validate Links',
          func: this.validate,
          params: ['http://validator.w3.org/checklink?check=Check&hide_type=all&summary=on&uri=']
        }, {
          name: 'Validate Accessibility',
          func: this.validate,
          params: ['http://wave.webaim.org/report#/']
        }, {
          name: 'Validate Structured Data',
          func: this.validate,
          params: ['https://search.google.com/test/rich-results?url=']
        }
      ]
    }
  ]

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

          {this.actions.length > 0 ? (
            <List subheader={<li/>} style={{backgroundColor: 'inherit'}}>
              {this.actions.map((action: any, index: number) => (
                <li key={`section-${index}`} style={{backgroundColor: 'inherit'}}>
                  <ul style={{backgroundColor: 'inherit', padding: 0}}>
                    <ListSubheader style={{backgroundColor: '#ddd'}}>
                      <ListItemText disableTypography primary={<Typography style={{fontSize: 18, fontWeight: 'bold'}}>{cropText(action.name, 25)}</Typography>} style={{paddingTop: 18, paddingBottom: 18, paddingRight: 48, margin: 0}}/>
                    </ListSubheader>
                    {action.actions.length > 0 ? (
                      <>
                        {action.type === 'list' ? action.actions.map((action: any, index: number) => (
                          <ListItem key={index} button onClick={() => action.func(action.params)}>
                            <ListItemText>{action.name}</ListItemText>
                          </ListItem>
                        )) : null}
                        {action.type === 'button' ? (
                          <Grid container style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
                            {action.actions.map((action: any, index: number) => (
                              <Grid key={index} item xs={4} style={{ padding: 10 }}>
                                <Paper elevation={0} style={{ margin: 0, padding: 0, height: 95 }}>
                                  <Button variant="contained" color="primary" onClick={() => action.func(action.params)} style={{ width: '100%', height: '100%', lineHeight: 1.25, textTransform: 'none' }}>
                                    {action.name}
                                  </Button>
                                </Paper>
                              </Grid>
                            ))}
                          </Grid>
                        ) : null}
                      </>
                    ) : null}
                  </ul>
                </li>
              ))}
            </List>
          ) : null}

        </main>
      </>
    )
  }
}
