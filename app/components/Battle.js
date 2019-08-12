import React from 'react'
import {FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa'

function Instructions() {
  return (
    <div className="instuctions-container">
      <h1 className="center-text heading-lg">Instructions</h1>
      <ol className="container-sm grid-battle center-text battle-instructions">
        <li>
          <h3 className="heading-sm">Enter two Github users</h3>
          <FaUserFriends className="bg-light" color="rgb(255, 191, 116)" size={240} />
        </li>
        <li>
          <h3 className="heading-sm">Battle</h3>
          <FaFighterJet className="bg-light" color="#727272" size={240} />
        </li>
        <li>
          <h3 className="heading-sm">See the winners</h3>
          <FaTrophy className="bg-light" color="rgb(255, 215, 0)" size={240} />
        </li>
      </ol>
    </div>
  )
}

export default class Battle extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Instructions />
      </React.Fragment>
    )
  }
}