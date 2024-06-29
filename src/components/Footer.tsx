import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <Link to="/posts/new">Menu1</Link>
      <Link to="/">Menu2</Link>
      <Link to="/">Menu3</Link>
    </footer>
  )
}

export default Footer
