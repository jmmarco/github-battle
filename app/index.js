import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import PopularNav from './components/PopularNav'

// Component
// State
// Lifecycle
// Rendering (UI)

class App extends React.Component {

  render() {
    return (
      <>
      <PopularNav />
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