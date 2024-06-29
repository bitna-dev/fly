import React, { ReactNode, useContext } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'
import { ThemeContext } from '@contexts/ThemeContext'

const Layout = ({ children }: { children: ReactNode }) => {
  const context = useContext(ThemeContext)
  const { pathname } = useLocation()
  const showSignButton = ['/login', '/signup'].includes(pathname) === false
  return (
    <div className={context.theme === 'light' ? 'white' : 'dark'}>
      <Header />
      {children}
      {showSignButton && <Footer />}
    </div>
  )
}

export default Layout
