import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'

// Component
// State
// Lifecycle
// Rendering (UI)

class App extends React.Component {

  render() {
    return (
      <>
      <Popular />
      </>
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