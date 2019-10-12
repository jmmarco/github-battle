import React from 'react'
import ReactDOM from 'react-dom'
import { fetchPopularRepos } from '../utils/api'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'
import PropTypes from 'prop-types'
import ThemeContext from '../contexts/theme'
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

export default function Popular() {
  const [ selectedLanguage, setLanguage ] = React.useState('All')
  const [ repos, setRepos ] = React.useState({})
  const [ error, setError ] = React.useState(null)

  React.useEffect(() => {
    updateLanguage(selectedLanguage)
  }, [])

  const updateLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage)
    setError(null)

    if (!repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          setRepos({...repos, [selectedLanguage]: data})
        })
        .catch(error => {
          console.warn('Error fetching repos: ', error)
          setError(error)
        })
    }
  }

  const isLoading = () => {
    return !repos[selectedLanguage] && error === null
  }

  return (
    <React.Fragment>
      <header>
        <LanguagesNav
          selectedLanguage={selectedLanguage}
          onUpdateLanguage={updateLanguage}
        />
      </header>
      <main>
        {isLoading() && <Loading />}

        {error && <p className="center-text error">{error}</p>}

        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}/> }
      </main>
    </React.Fragment>
  )
}

function ReposGrid({ repos }) {
  const { theme } =  React.useContext(ThemeContext)
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const { id, name, owner, html_url, stargazers_count, forks, open_issues } = repo
        const { login, avatar_url } = owner
        return (
          <li key={id} className={`card bg-${theme}`}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
            <ul className="stats">
              <li>
                <Tooltip text="Github username">
                  <FaUser style={{ verticalAlign: 'middle', marginRight: '10px' }} color="rgb(255, 191, 116)" size={22} />
                  <a href={`https://github.com/${login}`}>
                    <span>{login}</span>
                  </a>
                </Tooltip>
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
            </Card>
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