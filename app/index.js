import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'

// Component
// State
// Lifecycle
// Rendering (UI)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme  === 'light' ? 'dark ' : 'light'
        }))
      }
    }
  }

  render() {
    return (
      <ThemeProvider value={this.state}>
        <div className={this.state.theme === 'light' ? 'light' : 'dark'}>
          <React.Fragment>
            <Nav />
            <Popular />
          </React.Fragment>
        </div>
      </ThemeProvider>
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