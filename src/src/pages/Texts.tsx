import React from 'react'
import { Link } from 'react-router-dom'
import { Text } from '../interfaces/Text'
import { TextService } from '../services/TextService'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ReactComponent as IconAdd } from '../assets/icons/add.svg'
import { ReactComponent as IconChevronRight } from '../assets/icons/chevron-right.svg'

export default class Texts extends React.Component {

  state = {
    texts: []
  }

  async componentDidMount() {
    this.setState({
      texts: [...(await TextService.load())]
    })
  }

  cropText(str: string, chars?: number) {
    if (!chars) {
      chars = 80
    }
    return str.length > chars ? str.substring(0, chars - 3) + "..." : str;
  }

  render() {
    return (
      <>
        <Header title="Dummy Texts" backTo={'/settings'}>
          <Link to="/settings/texts/add">
            <IconAdd width={18} height={18} />
          </Link>
        </Header>
        <main>
          <section>
            {this.state.texts.length > 0 ? (
              <ul className="stacked-list">
                {this.state.texts.map((text: Text, index: number) => {
                  return (
                    <li className="pointer" key={index}>
                      <Link to={`/settings/texts/edit/${text.id}`}>
                        <div>
                          <p className="title">{text.name}</p>
                          <p>{this.cropText(text.content)}</p>
                        </div>
                        <IconChevronRight width={18} height={18} />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </section>
        </main>
        <Footer />
      </>
    )
  }
}
