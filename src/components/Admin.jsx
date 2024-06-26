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
import Link from "next/link";
import { usePathname } from "next/navigation";

const Admin = () => {
  const pathname = usePathname();
  const admins = useQuery({
    queryKey: ["admins", pathname],
    queryFn: async () => {
      const response = await axios.get("/api/admins", {
        cache: "no-cache",
      });
      return response.data;
    },
  });

  if (admins.isLoading) return <Loading />;
  return (
    <section className="w-ful">
      <h1 className="text-4xl font-bold mb-10 text-center">Admins</h1>
      <div
        className="hero min-h-[500px] bg-fixed bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(https://i.ibb.co/C8bwyLb/MAIN-7.png)",
        }}
      >
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
              <Link
                href={`/student/${admin._id}`}
                className="card card-compact w-full bg-base-100 shadow-xl"
              >
                <figure>
                  <Image
                    src={admin.imgUrl}
                    alt={admin.name}
                    width={300}
                    height={300}
                    className="rounded-t-lg object-cover w-full h-56"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{admin.name}</h2>
                  <p>Home-Town: {admin.homeTown}</p>
                  <p>Hall: {hall[admin.hallCode]}</p>
                  <strong>Spark Web Admin</strong>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Admin;
