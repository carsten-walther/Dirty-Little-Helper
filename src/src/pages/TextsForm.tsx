import React from 'react'
import { Text } from '../interfaces/Text'
import { TextService } from '../services/TextService'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ReactComponent as IconTrash } from '../assets/icons/trash.svg'

export default class TextsForm extends React.Component {

  state = {
    id: undefined,
    name: undefined,
    content: undefined
  }

  constructor(props: any) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async componentDidMount() {
    // @ts-ignore
    const { match: { params } } = this.props
    if (params.id) {
      await TextService.load()
      this.setState({...await TextService.get(params.id)})
    }
  }

  async handleDelete(text: Text) {
    let texts = [...(await TextService.load())]
    // @ts-ignore
    let index = texts.indexOf(text)
    if (index > -1) {
      texts.splice(index, 1)
    }
    await TextService.delete(text)
    // @ts-ignore
    this.props.history.push("/settings/texts")
  }

  handleChange(event: any) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event: any) {
    let text = this.state as unknown as Text
    if (typeof text.id === 'undefined') {
      TextService.create(text)
    } else {
      TextService.update(text.id, text)
    }
    event.preventDefault()
    // @ts-ignore
    this.props.history.push("/settings/texts")
  }

  render() {
    return (
      <>
        <Header title="Dummy Text" backTo={'/settings/texts'} />
        <main>
          <section>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label className="title" htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange}/>
              </div>
              <div>
                <label className="title" htmlFor="content">Content</label>
                <textarea id="content" name="content" value={this.state.content} onChange={this.handleChange}/>
              </div>
              <div>
                {this.state.id ? (
                  <button onClick={() => this.handleDelete(this.state as unknown as Text)}>
                    <IconTrash width={12} height={12} /> Delete
                  </button>
                ) : null}
                <input className="float-right" type="submit" value="Submit"/>
              </div>
            </form>
          </section>
        </main>
        <Footer />
      </>
    )
  }
}
