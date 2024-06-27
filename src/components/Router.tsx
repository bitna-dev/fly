import Home from '@pages/Home'
import Login from '@pages/auth/login'
import Signup from '@pages/auth/signup'
import PostListPage from '@pages/posts'
import EditPost from '@pages/posts/editPost'
import NewPost from '@pages/posts/newPost'
import PostDetail from '@pages/posts/postDetail'
import ProfilePage from '@pages/profile'
import ProfileEdit from '@pages/profile/edit'
import { Route, Routes } from 'react-router-dom'

const Router = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/posts" Component={PostListPage} />
      <Route path="/posts/:id" Component={PostDetail} />
      <Route path="/posts/edit/:id" Component={EditPost} />
      <Route path="/posts/new" Component={NewPost} />
      <Route path="/profile" Component={ProfilePage} />
      <Route path="/profile/edit" Component={ProfileEdit} />
      <Route path="/login" Component={Login} />
      <Route path="/signup" Component={Signup} />
    </Routes>
  )
}

export default Router
