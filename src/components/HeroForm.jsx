import Image from "next/image";

const HeroForm = ({ children, title, description, imgUrl = "" }) => {
  return (
    <div className="hero min-h-screen bg-base-100 w-full">
      <div className="hero-content flex-col lg:flex-row-reverse justify-evenly w-full">
        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6 max-w-md">{description}</p>
          {imgUrl && (
            <Image
              src={imgUrl}
              alt={title}
              width={500}
              height={500}
              className="w-full max-w-md rounded-lg shadow-2xl object-cover"
            />
          )}
        </div>
        <div className="card shrink-0 w-full lg:w-1/2 shadow-2xl bg-base-100 max-w-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HeroForm;
