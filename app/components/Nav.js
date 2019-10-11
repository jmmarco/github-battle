import React from 'react'
import ThemeContext from '../contexts/theme'
import { NavLink } from 'react-router-dom'

export default function Nav() {

  const { theme, toggleTheme } =  React.useContext(ThemeContext)

  console.log('theme from Nav component', theme)

  return (
    <nav className="row space-between">
      <ul className="row nav">
        <li><NavLink exact activeStyle={{color: 'crimson', fontWeight: 'bold'}} to="/" className="nav-link">Popular</NavLink></li>
        <li><NavLink activeStyle={{color: 'crimson', fontWeight: 'bold'}} to="/battle" className="nav-link">Battle</NavLink></li>
      </ul>
      <button
        style={{fontSize: 30}}
        className="btn-clear"
        onClick={toggleTheme}
      >
        {theme === 'light' ? '🔦' : '💡'}
      </button>
    </nav>
  )
}