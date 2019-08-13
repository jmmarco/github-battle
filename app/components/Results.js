import React from 'react'
import PropTypes from 'prop-types'

export default class Results extends React.Component {

  render() {
    const { playerOne, playerTwo } = this.props

    return (
      <div>
        results {JSON.stringify(this.props, null)}
      </div>
    )

  }
}