/*global chrome*/

import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Slide, TextField } from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'

import { TextService } from '../services/TextService'
import { cropText } from '../utilities/Utilities'
import Header from '../components/Header'

const Transition = React.forwardRef(function Transition (props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default class Texts extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            dialogOpen: false,
            text: {
                id: undefined,
                name: undefined,
                content: undefined,
            },
            texts: [],
        }
    }

    async componentDidMount () {
        this.setState({
            texts: [...(await TextService.load())],
        })
    }

    insertText (text) {
        if (chrome.tabs !== undefined) {
            chrome.tabs.query({
                active: true,
                currentWindow: true,
            }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    function: 'insertText',
                    text: text.content
                })
            })
        }
    }

    openNewDialog () {
        this.setState({
            text: {
                id: undefined,
                name: undefined,
                content: undefined,
            },
            dialogOpen: true,
        })
    }

    openEditDialog (text) {
        this.setState({
            text: text,
            dialogOpen: true,
        })
    }

    closeDialog () {
        this.setState({
            dialogOpen: false,
        })
    }

    handleChange (event) {
        this.setState({
            text: { ...this.state.text, [event.target.name]: event.target.value },
        })
    }

    async handleSubmit (event) {
        event.preventDefault()

        if (typeof this.state.text.id === 'undefined') {
            await TextService.create(this.state.text)
        } else {
            await TextService.update(this.state.text.id, this.state.text)
        }

        this.setState({
            texts: [...(await TextService.load())],
        })

        this.closeDialog()
    }

    async handleDelete (text) {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            let texts = [...(await TextService.load())]
            let index = texts.indexOf(text)

            if (index > -1) {
                texts.splice(index, 1)
            }

            await TextService.delete(text)
            this.setState({
                texts: [...(await TextService.load())],
            })
        }
    }

    render () {
        return (
            <>
                <Header title="Texts">
                    <IconButton edge="end" color="inherit" onClick={this.openNewDialog.bind(this)}>
                        <Add/>
                    </IconButton>
                </Header>
                <main>
                    {this.state.texts.length > 0 ? (
                        <List>
                            {this.state.texts.map((text, index) => (
                                <ListItem key={index} dense button onClick={this.insertText.bind(this, text)} title="Insert">
                                    <ListItemText primary={text.name} secondary={cropText(text.content, 70)} style={{ paddingRight: 48 }}/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="start" color="inherit" title="Edit Element" onClick={this.openEditDialog.bind(this, text)}>
                                            <Edit/>
                                        </IconButton>
                                        <IconButton edge="end" color="inherit" title="Delete Element" onClick={this.handleDelete.bind(this, text)}>
                                            <Delete/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    ) : null}
                </main>

                <Dialog open={this.state.dialogOpen} onClose={this.closeDialog.bind(this)} TransitionComponent={Transition} keepMounted>
                    <form noValidate autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
                        <DialogTitle>
                            Text
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name and the text, that will be inserted.
                            </DialogContentText>
                            <TextField type="text" label="Name" name="name" value={this.state.text.name || ''} fullWidth required onChange={this.handleChange.bind(this)}/>
                            <TextField label="Content" name="content" value={this.state.text.content || ''} fullWidth multiline rows={6} required onChange={this.handleChange.bind(this)}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeDialog.bind(this)} color="primary">
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
