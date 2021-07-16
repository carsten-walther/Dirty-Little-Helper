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

    state = {
        dialogOpen: false,
        text: {
            id: undefined,
            name: undefined,
            content: undefined,
        },
        texts: [],
    }

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

        this.insertText = this.insertText.bind(this)
        this.openNewDialog = this.openNewDialog.bind(this)
        this.openEditDialog = this.openEditDialog.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    async componentDidMount () {
        this.setState({
            texts: [...(await TextService.load())],
        })
    }

    insertText (text) {
        // @ts-ignore
        chrome.tabs.query({
            'active': true, 'currentWindow': true,
            // @ts-ignore
        }, (tabs) => {
            // @ts-ignore
            chrome.tabs.sendMessage(tabs[0].id, {
                function: 'insertText', text: text.content,
            })
        })
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
        if (typeof this.state.text.id === 'undefined') {
            TextService.create(this.state.text)
        } else {
            TextService.update(this.state.text.id, this.state.text)
        }

        this.setState({
            texts: [...(await TextService.load())],
        })

        this.closeDialog()

        event.preventDefault()
    }

    async handleDelete (text) {
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

    render () {
        return (
            <>

                <Header title="Dummy Texts">
                    <IconButton edge="end" color="inherit" onClick={this.openNewDialog}>
                        <Add/>
                    </IconButton>
                </Header>

                <main>
                    {this.state.texts.length > 0 ? (
                        <List>
                            {this.state.texts.map((text, index) => (
                                <ListItem key={index} dense button onClick={() => this.insertText(text)} title="Insert">
                                    <ListItemText primary={text.name} secondary={cropText(text.content, 70)} style={{ paddingRight: 48 }}/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="start" color="inherit" title="Edit Element" onClick={() => this.openEditDialog(text)}>
                                            <Edit/>
                                        </IconButton>
                                        <IconButton edge="end" color="inherit" title="Delete Element" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(text)}}>
                                            <Delete/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    ) : null}
                </main>

                <Dialog open={this.state.dialogOpen} onClose={this.closeDialog} TransitionComponent={Transition} keepMounted>
                    <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        <DialogTitle>
                            Text
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name and the text, that will be inserted.
                            </DialogContentText>
                            <TextField type="text" label="Name" name="name" value={this.state.text.name || ''} autoFocus fullWidth required onChange={this.handleChange}/>
                            <TextField label="Content" name="content" value={this.state.text.content || ''} autoFocus fullWidth multiline rows={6} required onChange={this.handleChange}/>
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
