import React from 'react'
import ReactDOM from 'react-dom'

const styles = {
  ul: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    color: 'crimson',
    fontSize: '1.5em'

  },
  li: {
    margin: '0 10px 0 10px',
    fontWeight: '400'
  },
  a: {
    cursor: 'pointer',
    letterSpacing: '0.5px'
  }

}

export default class PopularNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: 'All'
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage
    })
  }

  render() {

    return (
      <nav>
        <LanguagesList
          languages={this.state.languages}
          onUpdateLanguage={this.updateLanguage}
        />
        {JSON.stringify(this.state)}
      </nav>
    )
  }
}

function LanguagesList(props) {

  const languages = ['All', 'JavaScript', 'Ruby', 'CSS', 'Python']

  return (
    <ul style={styles.ul}>
      {languages.map(lang =>
        <li key={lang} style={styles.li}>
          <a style={styles.a} onClick={() => props.onUpdateLanguage(lang)}>{lang}</a>
        </li>
      )}
    </ul>
    )
}