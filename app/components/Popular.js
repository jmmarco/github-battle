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

export default class Popular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null
    }
    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }


  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }


  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null
    })

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos : {
              ...repos,
              [selectedLanguage]: data,
            }
          }))
        })
        .catch(error => {
          console.warn('Error fetching repos: ', error)
          this.setState({
            error
          })
        })
    }

  } // End of updateLanguage

  isLoading() {
    const { selectedLanguage, repos, error } = this.state
    return !repos[selectedLanguage] && error === null
  }

  render() {
    const { selectedLanguage, repos, error } = this.state
    return (
      <React.Fragment>
        <header>
          <LanguagesNav
            selectedLanguage={selectedLanguage}
            onUpdateLanguage={this.updateLanguage}
          />
        </header>
        <main>
          {this.isLoading() && <p>Loading...</p>}
          {repos[selectedLanguage] && <pre>{JSON.stringify(repos, null, 2)}</pre>}

        </main>
      </React.Fragment>
    )
  }
}

function LanguagesNav(props) {
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

LanguagesNav.propTypes = {
  onUpdateLanguage: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired
}