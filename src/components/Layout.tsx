import React, { ReactNode, useContext } from 'react'
import Header from './Header'
import { useLocation } from 'react-router-dom'
import { ThemeContext } from '@contexts/ThemeContext'

const Layout = ({ children }: { children: ReactNode }) => {
  const context = useContext(ThemeContext)
  return (
    <div className={context.theme === 'light' ? 'white' : 'dark'}>
      <Header />
      {children}
    </div>
  )
}

export default Layout
