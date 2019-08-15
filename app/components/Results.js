import React from 'react'
import PropTypes from 'prop-types'
import { battle } from '../utils/api'
import Card from './Card'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'

export default class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    const { playerOne, playerTwo } = this.props
    battle([playerOne, playerTwo])
      .then(players => {
        console.log('Players', players)

        console.log('object entries:', )
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        })
      }).catch(({ message }) => {
        this.setState({
          error: message,
          loading: false
        })
      })
  }

  render() {
    const { winner, loser, error, loading } = this.state

    if (loading) {
      return (
        <p>Loading..</p>
      )
    }

    if (error) {
      <p className="center-text error">{error}</p>
    }

    return (
      <div className="grid space-around container-sm">
        <Card
          header={winner.score == loser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
        <ul className="card-list">
            <li>
              <FaUser color="rbg(239, 115, 115)" size={22} />
              {winner.profile.name}
            </li>
          {winner.profile.location && (
            <li>
              <FaCompass color="rgb(144, 115, 255)" size={22} />
              {winner.profile.location}
            </li>
          )}
          {winner.profile.company && (
            <li>
              <FaBriefcase color="#795548" size={22} />
              {winner.profile.company}
            </li>
          )}
            <li>
              <FaUsers color="rgb(129, 195, 245)" size={22} />
              {winner.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color="rgb(64, 183, 95)" size={22} />
              {winner.profile.following.toLocaleString()} follwoing
            </li>
          </ul>
        </Card>
      </div>
    )

  }
}