import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <header>
        <div>
          <Link to="/posts/new">글쓰기</Link>
          <Link to="/">게시글</Link>
          <Link to="/">프로필</Link>
        </div>
      </header>
      <div className="post-list">post list</div>
      <footer>
        <div>Menu1</div>
        <div>Menu2</div>
        <div>Menu3</div>
      </footer>
    </>
  )
}

export default Home
