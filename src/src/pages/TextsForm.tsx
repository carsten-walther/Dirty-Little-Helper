import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as IconBack } from "../assets/icons/arrow.svg";
import { Text } from "../interfaces/Text"
import { TextService } from "../services/TextService"

export default class TextsForm extends React.Component {

  state = {
    id: undefined, name: undefined, content: undefined
  }

  constructor(props: any) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    // @ts-ignore
    const {match: {params}} = this.props
    if (params.id) {
      await TextService.load()
      this.setState({...await TextService.get(params.id)})
    }
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
    return (<>
        <h2>
          <Link to="/settings" className="btn btn-back">
            <IconBack width={16} height={16} />
          </Link>
          Text
          <div className="float-right">
            <Link to="/settings/texts">
              <button>←</button>
            </Link>
          </div>
        </h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" value={this.state.content} onChange={this.handleChange}/>
          </div>
          <div className="float-right">
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </>)
  }
}
