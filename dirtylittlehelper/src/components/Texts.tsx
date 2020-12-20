import React from 'react'
import { Link } from 'react-router-dom'
import { Text } from "../interfaces/Text"
import { TextsService } from "../services/TextsService"

export default class Texts extends React.Component {

  state = {
    texts: []
  }

  async componentDidMount() {
    this.setState({
      texts: [...(await TextsService.load())]
    })
  }

  async deleteText(text: Text) {
    // @ts-ignore
    let index = this.state.texts.indexOf(text)
    if (index > -1) {
      this.state.texts.splice(index, 1)
    }
    await TextsService.delete(text)
    this.setState({
      texts: [...(await TextsService.load())]
    })
  }

  insertText(text: Text) {
    console.log('insertText')
  }

  render() {
    return (
      <>
        <h2>
          Texts
          <div className="float-right">
            <Link to="/">
              <button>Back</button>
            </Link>
            <Link to="/text/add">
              <button>Add</button>
            </Link>
          </div>
        </h2>
        <ul className="scrollable">
          {this.state.texts.map((text: Text, index: number) => (
              <li key={index}>
                <span>{text.name}</span>
                <div className="float-right">
                  <Link to={`/text/show/${text.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => this.deleteText(text)}>Delete</button>
                </div>
                <div className="clearfix"/>
              </li>
          ))}
        </ul>
      </>
    )
  }
}
