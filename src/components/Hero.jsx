import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://scontent.fdac7-1.fna.fbcdn.net/v/t39.30808-6/422935608_122112480686187561_996655387735133750_n.jpg?stp=dst-jpg_s960x960&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGiBB2W2xGex4FCmAXP0oXQQta3m0FN_EJC1rebQU38Qmtd_hI-pjwfF3ewb9s2XG5GpiNORtNePvcG6Ug6VU0j&_nc_ohc=lHwURXiZqQQQ7kNvgGXzorZ&_nc_ht=scontent.fdac7-1.fna&oh=00_AYBmsWEpJVGlfVPemzWTv0ImpOdZ-Ghs2qT7VyhkveBDBg&oe=6664E35A)",
        }}
      >
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold uppercase">Spark</h1>
            <p className="mb-5 text-left font-bold">
              Ignited by the collective brilliance of our squad, we aren’t just
              a group, we are the spark of innovation- that fuels the fire of
              revolution. <br /> So,
              <br /> To illuminate the world, let the spark of creativity lead
              the way.
            </p>
            <Link href="/results" className="btn btn-primary">
              See Result
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
