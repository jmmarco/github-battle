import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'



const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

// Component
// State
// Lifecycle
// Rendering (UI)

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme  === 'light' ? 'dark ' : 'light'
      }))
    }
  }

  render() {
    return (

      <Router>
        <ThemeProvider value={this.state}>
          <div className={`${this.state.theme === 'light' ? 'light' : 'dark'} container`}>
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
        </ThemeProvider>
      </Router>

    )
  }
  // This will get converted to:
  /*
  render() {
    return React.createElement(
      'div',
      null,
      'Hello there!'
    )
  }
  */
}


ReactDOM.render(
  // React Element,
  // Where to render the element to
  <App />,
  document.getElementById('app')
  )