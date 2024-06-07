const HeroForm = ({ children, title, description, imgUrl = "" }) => {
  return (
    <div className="hero min-h-screen bg-base-200 w-full">
      <div className="hero-content flex-col lg:flex-row-reverse justify-evenly">
        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">{description}</p>
          {imgUrl && (
            <img
              src={imgUrl}
              alt={title}
              className="w-72 h-72 rounded-lg shadow-2xl object-cover"
            />
          )}
        </div>
        <div className="card shrink-0 w-full lg:w-1/2 shadow-2xl bg-base-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HeroForm;
