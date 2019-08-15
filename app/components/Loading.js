import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '55px',
    fontWeight: 300,
    letterSpacing: '0.5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: props.text
    }
  }

  componentDidMount() {
    const { speed, text } =  this.props
    this.interval = window.setInterval(() => {
      this.state.content === text + '...'
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({content: content + '.'}))
    }, speed)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }



  render() {
    return (
      <p style={styles.content}>{this.state.content}</p>
    )
  }
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}