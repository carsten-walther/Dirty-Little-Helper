import React from 'react'
import { Link } from 'react-router-dom'
import { Text } from "../interfaces/Text"
import { TextService } from "../services/TextService"

export default class Texts extends React.Component {

  state = {
    texts: []
  }

  async componentDidMount() {
    this.setState({
      texts: [...(await TextService.load())]
    })
  }

  async deleteText(text: Text) {
    // @ts-ignore
    let index = this.state.texts.indexOf(text)
    if (index > -1) {
      this.state.texts.splice(index, 1)
    }
    await TextService.delete(text)
    this.setState({
      texts: [...(await TextService.load())]
    })
  }

  render() {
    return (
      <>
        <h2>
          Texts
          <div className="float-right">
            <Link to="/settings">
              <button>←</button>
            </Link>
            <Link to="/settings/texts/add">
              <button>+</button>
            </Link>
          </div>
          <div className="clearfix"/>
        </h2>
        <ul className="scrollable">
          {this.state.texts.map((text: Text, index: number) => (
            <li key={index}>
              <span>{text.name}</span>
              <div className="float-right">
                <Link to={`/settings/texts/show/${text.id}`}>
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
