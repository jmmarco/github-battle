import React from 'react'
import ReactDOM from 'react-dom'
import { fetchPopularRepos } from '../utils/api'
import PropTypes from 'prop-types'

const styles = {
  ul: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    fontSize: '1.5em'

  },
  li: {
    margin: '0 10px 0 10px',
    fontWeight: 600,
  },
  a: {
    cursor: 'pointer',

  },
  selected: {
    color: 'crimson'
  }

}

export default class PopularNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: null,
      error: null
    }
    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }


  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
      repos: null,
    })

    fetchPopularRepos(selectedLanguage)
      .then(repos => {
        this.setState({
          repos,
          error: null
        })
      })
      .catch(error => {

      })
  }

  isLoading() {
    return this.state.repos && this.state.error
  }

  render() {
    const { selectedLanguage, repos, error } = this.state
    return (
      <nav>
        <LanguagesList
          selectedLanguage={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {JSON.stringify(this.state)}
      </nav>
    )
  }
}

function LanguagesList(props) {
  const { selectedLanguage, onUpdateLanguage } = props
  const languages = ['All', 'JavaScript', 'Ruby', 'CSS', 'Python']

  return (
    <ul style={styles.ul}>
      {languages.map(lang =>
        <li key={lang} style={styles.li}>
          {selectedLanguage === lang ?
            <a style={styles.a, styles.selected} onClick={() => onUpdateLanguage(lang)}>{lang}</a>
            :
            <a style={styles.a} onClick={() => onUpdateLanguage(lang)}>{lang}</a>
          }
        </li>
      )}
    </ul>
    )
}

LanguagesList.propTypes = {
  onUpdateLanguage: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired
}