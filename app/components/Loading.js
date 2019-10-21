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

export default function Loading ({ speed = 300, text = 'Loading' }) {

  const [ content, setContent ] = React.useState(text)

  React.useEffect(() => {
    const timerId = window.setInterval(() => {

      setContent((content) => {
        return content === text + '...' ? setContent(text) : setContent(content + '.')
      })
    }, speed)

    return () => window.clearInterval(timerId);
  }, [speed, text])

  return (
    <p style={styles.content}>{content}</p>
  )

}