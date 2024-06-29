import Home from '@pages/Home'
import Login from '@pages/auth/login'
import Signup from '@pages/auth/signup'
import PostListPage from '@pages/posts'
import DetailPage from '@pages/posts/detail'
import EditPage from '@pages/posts/edit'
import NewPage from '@pages/posts/new'
import ProfilePage from '@pages/profile'
import ProfileEdit from '@pages/profile/edit'
import { Navigate, Route, Routes } from 'react-router-dom'

interface RouterProps {
  isAuthenticated: boolean
}
const Router = ({ isAuthenticated }: RouterProps) => {
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" Component={Home} />
          <Route path="/posts" Component={PostListPage} />
          <Route path="/posts/:id" Component={DetailPage} />
          <Route path="/posts/edit/:id" Component={EditPage} />
          <Route path="/posts/new" Component={NewPage} />
          <Route path="/profile" Component={ProfilePage} />
          <Route path="/profile/edit" Component={ProfileEdit} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </>
      )}
    </Routes>
  )
}

export default Router
