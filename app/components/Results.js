import React from 'react'
import PropTypes from 'prop-types'
import { battle } from '../utils/api'
import Loading from './Loading'
import Card from './Card'
import Tooltip from './Tooltip'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'


function ProfileList ({ profile }) {

  return (
    <ul className="card-list">
      <li>
        <FaUser color="rbg(239, 115, 115)" size={22} />
        {profile.name}
      </li>
    {profile.location && (
      <li>
        <Tooltip text="User's location">
          <FaCompass color="rgb(144, 115, 255)" size={22} />
          {profile.location}
        </Tooltip>
      </li>
    )}
    {profile.company && (
      <li>
        <Tooltip text="User's Company">
          <FaBriefcase color="#795548" size={22} />
          {profile.company}
        </Tooltip>
      </li>
    )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} follwoing
      </li>
    </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
}


function battleReducer(state, action) {
  switch(action.type) {
    case 'success':
      return {
        winner: action.winner,
        loser: action.loser,
        error: null,
        loading: false
      }
    case 'error':
      return {
        ...state,
        error: action.message,
        loading: false
      }
    default:
      return state
  }
}

export default function Results ({ location }) {
  const { playerOne, playerTwo } = queryString.parse(location.search)
  const [ state, dispatch ] = React.useReducer(
    battleReducer,
    { winner: null, loser: null, error: null, loading: true }
  )

  React.useEffect(() => {
    battle([ playerOne, playerTwo ])
      .then((players) => dispatch({ type: 'success', winner: players[0], loser: players[1] }))
      .catch(({message}) => dispatch({ type: error, message }))
  }, [playerOne, playerTwo])

  const { winner, loser, error, loading } = state

  if (loading) {
    return (
      <Loading text='Loading' speed={100} />
    )
  }

  if (error) {
    <p className="center-text error">{error}</p>
  }

  return (
    <React.Fragment>
      <div className="grid space-around container-sm">
        <Card
          header={winner.score == loser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
        {/* UL Goes here*/}
          <ProfileList profile={winner.profile} />
        </Card>
        <Card
          header={winner.score == loser.score ? 'Tie' : 'Loser'}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          href={loser.profile.html_url}
          name={loser.profile.login}
        >
          <ProfileList profile={loser.profile} />
        </Card>
      </div>
      <Link
        to='/battle'
        className="btn btn-dark btn-space"
      >reset
      </Link>
    </React.Fragment>
  )
}