import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const Carousel = ({}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop
      autoplay={{ delay: 10000 }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="swiper"
    >
      <SwiperSlide>
        <img src="/banner.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner2.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner3.jpg" />
      </SwiperSlide>
    </Swiper>
  )
}

export default Carousel
