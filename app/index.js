import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ThemeContext from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

function App() {

  const [theme, setTheme] = React.useState('light')

  const toggleTheme = () => {
    setTheme(theme => {
      return theme === 'light' ? 'dark ' : 'light'
    })
  }

  const value = React.useMemo(
    () => ({
      theme,
      toggleTheme
    }),
    [theme]
  )

  console.log('theme', theme)

  return (

    <Router>
      <ThemeContext.Provider value={value}>
        <div className={`${theme === 'light' ? 'light' : 'dark'} container`}>
          <React.Fragment>
            <Nav />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" component={Popular} />
                <Route exact path='/battle' component={Battle} />
                <Route path='/battle/results' component={Results} />
                <Route render={() => {
                  return (
                    <h1 style={{ textAlign: 'center' }}>Sorry ❗⛔ ❗That page does not exist!</h1>
                  )
                }} />
              </Switch>
            </React.Suspense>
          </React.Fragment>
        </div>
      </ThemeContext.Provider>
    </Router>

  )
}


ReactDOM.render(<App />, document.getElementById('app'))