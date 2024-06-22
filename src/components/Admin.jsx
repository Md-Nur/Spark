"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import { hall } from "@/lib/utils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./style.css";
import Image from "next/image";

const Admin = () => {
  const admins = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const response = await axios.get("/api/admins");
      return response.data;
    },
  });

  if (admins.isLoading) return <Loading />;
  return (
    <section className="w-full my-20">
      <div
        className="hero min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(https://i.ibb.co/C8bwyLb/MAIN-7.png)",
        }}
      >
        <h1 className="text-4xl font-bold my-10 text-center">Admins</h1>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {admins.data.map((admin) => (
            <SwiperSlide key={admin._id}>
              <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                  <Image
                    src={
                      admin.image
                        ? admin.image
                        : "https://i.ibb.co/9q5Kj6X/placeholder.png"
                    }
                    alt={admin.name}
                    width={300}
                    height={300}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{admin.name}</h2>
                  <p>Home-Town: {admin.homeTown}</p>
                  <p>Hall: {hall[admin.hallCode]}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Admin;
