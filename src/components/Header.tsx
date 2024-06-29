import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineSun } from 'react-icons/ai'
import { BsMoonStarsFill } from 'react-icons/bs'
import { ThemeContext } from '@contexts/ThemeContext'

const Header = () => {
  const context = useContext(ThemeContext)
  return (
    <header>
      <Link to="/" className="logo">
        FLY
      </Link>
      <div className="theme__toggle">
        {context.theme === 'light' ? (
          <AiOutlineSun
            fill="orange"
            onClick={context.toggleMode}
            className="theme__toggle-btn"
          />
        ) : (
          <BsMoonStarsFill
            fill="orange"
            onClick={context.toggleMode}
            className="theme__toggle-btn"
          />
        )}
      </div>
      <div>
        <Link to="/posts/new">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>
      </div>
    </header>
  )
}

export default Header
