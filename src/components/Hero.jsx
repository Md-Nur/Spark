import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <div
        className="hero h-[700px]"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/gdb5R7P/441510028-984476960348682-6230622877396117854-n.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-75"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold uppercase text-white">Spark</h1>
            <p className="mb-5 text-left font-bold text-white">
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
