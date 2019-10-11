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

export default function Loading ({ speed, text }) {
  const [ content, setContent ] = React.useState(text)

  React.useEffect(() => {
    window.interval = window.setInterval(() => {
      content === text + '...' 
      ? setContent(text)
      : setContent(content + '.')
    }, speed)
      return () => window.clearInterval(window.interval);
  }, [speed])



  return (
    <p style={styles.content}>{content}</p>
  )

}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}