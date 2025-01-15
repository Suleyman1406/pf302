import { useRef, useState } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Navigation, Zoom } from "swiper/modules";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
};
export const ImagesSection = ({ images }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<SwiperRef>(null);
  const paginationSliderRef = useRef<SwiperRef>(null);

  function handleActiveSlideChange(index: number) {
    if (sliderRef.current && paginationSliderRef.current) {
      setActiveIndex(index);
      paginationSliderRef.current.swiper.slideTo(index);
      sliderRef.current.swiper.slideTo(index);
    }
  }

  return (
    <div className="grid grid-rows-[1fr_124px] gap-y-2">
      <Swiper
        zoom
        ref={sliderRef}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="w-full"
        modules={[Navigation, Zoom]}
        onSlideChange={(swiper) => {
          handleActiveSlideChange(swiper.activeIndex);
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container cursor-zoom-in">
              <img
                src={image}
                alt="Rent Picture"
                className="w-full !object-cover h-full !max-h-[450px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        navigation
        ref={paginationSliderRef}
        spaceBetween={10}
        slidesPerView={3}
        pagination={{ clickable: true }}
        className="w-full"
        modules={[Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className={cn(
              "cursor-pointer",
              index === activeIndex && "border-2 border-primary"
            )}
            onClick={() => handleActiveSlideChange(index)}
          >
            <img
              src={image}
              alt="Rent Picture"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
