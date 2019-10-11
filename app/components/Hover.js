import React from 'react'

export default function Hover () {
  const [ hovering, setHovering ] = React.useState(false)

  const mouseOver = () => setHovering(true)
  const mouseOut = () => setHovering(false)

  return (
    <div onMouseOver={mouseOver} onMouseOut={mouseOut}>
      {this.props.children(hovering)}
    </div>
  )
}