import Carousel from '@components/Carousel'
import Postbox from '@components/posts/Postbox'

const Home = () => {
  return (
    <>
      {/* post__navigation  */}
      <Carousel />
      <Postbox hasNavigation defaultTap="all" />
    </>
  )
}

export default Home
