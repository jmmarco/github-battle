import React from 'react'
import ReactDOM from 'react-dom'
import { fetchPopularRepos } from '../utils/api'
import PropTypes from 'prop-types'
import  {FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'

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
          {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}/> }
        </main>
      </React.Fragment>
    )
  }
}

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        console.log(repo)
        const { id, name, owner, html_url, stargazers_count, forks, open_issues } = repo
        const { login, avatar_url } = owner
        return (
          <li key={id}>
            <h4 className="heading-lg center-text">#{index + 1}</h4>
            <img
              className="avatar"
              src={avatar_url}
              alt={`Avatar for ${login}`}
            />
            <h2 className="center-text">
              <a className="link" href={html_url}>{login}</a>
            </h2>
            <ul className="stats">
              <li>
              <FaUser style={{ verticalAlign: 'middle', marginRight: '10px' }} color="rgb(255, 191, 116)" size={22} />
              <a href={`https://github.com/${login}`}>
                <span>{login}</span>
              </a>
              </li>
              <li>
                <FaStar style={{ verticalAlign: 'middle', marginRight: '10px' }} color="rgb(255,215,0)" size={22} />
                 <span>{stargazers_count.toLocaleString()} stars</span>
              </li>
              <li>
                <FaCodeBranch style={{ verticalAlign: 'middle', marginRight: '10px' }} color="rgb(129, 195, 245)" size={22} />
                 <span>{forks.toLocaleString()} forks</span>
              </li>
              <li>
                <FaExclamationTriangle style={{ verticalAlign: 'middle', marginRight: '10px' }} color="rgb(241, 138, 147)" size={22} />
                 <span>{open_issues.toLocaleString()} open issues</span>
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
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

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}