import Profile from '@components/Profile'
import Postbox from '@components/posts/Postbox'

const ProfilePage = () => {
  return (
    <div className="profile__container">
      <Profile />
      <Postbox defaultTap="my" />
    </div>
  )
}

export default ProfilePage
