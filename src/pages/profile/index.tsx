import Profile from '@components/Profile'
import Postbox from '@components/posts/Postbox'

const ProfilePage = () => {
  return (
    <>
      <Profile />
      <Postbox defaultTap="my" />
    </>
  )
}

export default ProfilePage
