/*global chrome*/

import React from 'react'
import { Grid, Paper, Button } from '@material-ui/core'

import Header from '../components/Header'
import Footer from '../components/Footer'

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

  toggleOutlines(func: string, selector: string, attribute: string) {
    // @ts-ignore
    chrome.tabs.query({
      active: true,
      currentWindow: true
      // @ts-ignore
    }, (tabs) => {
      // @ts-ignore
      chrome.tabs.sendMessage(tabs[0].id, {
        function: func,
        selector: selector,
        attribute: attribute
      })
    })
  }
  
  render() {
    return (
      <>

        <Header title="Dirty Little Helper"/>

        <main>

          {this.actions.length > 0 ? (
            <Grid container style={{ paddingTop: 10, paddingBottom: 10 }}>
              {this.actions.map((action: any, index: number) => (
                <Grid key={index} item xs={4} style={{ padding: 5 }}>
                  <Paper elevation={0} style={{ margin: 0, padding: 0, height: 115 }}>
                    <Button variant="contained" color="primary" onClick={() => action.func(action.params)} style={{ width: '100%', height: '100%', textTransform: 'none' }}>
                      {action.name}
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : null}

        </main>

        <Footer/>

      </>
    )
  }
}
