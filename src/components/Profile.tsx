import { AuthContext } from '@contexts/AuthContext'
import { auth } from '@remote/firebase'
import { signOut } from 'firebase/auth'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Profile = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const handleLogout = () => {
    try {
      signOut(auth)
      toast.success('로그아웃되었습니다.')
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image" />
        <div>
          <div className="profile__email">{user?.email}</div>
          <div className="profile__name">{user?.displayName || '사용자'}</div>
        </div>
      </div>
      <button type="button" onClick={handleLogout} className="profile__logout">
        로그아웃
      </button>
    </div>
  )
}

export default Profile
