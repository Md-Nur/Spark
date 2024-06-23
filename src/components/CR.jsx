import crPic from "@/pic/cr.jpg";
import Image from "next/image";
const CR = () => {
  return (
    <section className="w-full my-10">
      <h1 className="text-4xl text-center font-bold my-20">Class Representative</h1>
      <div
        className="hero bg-fixed bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(https://i.ibb.co/58zCFPr/trophos.jpg)",
        }}
      >
        {/* <div ></div> */}
        <div className="hero-content flex-col md:flex-row-reverse justify-evenly">
          <Image
            src={crPic}
            alt="CR"
            width={500}
            height={500}
            className="rounded-lg shadow-lg md:mr-10 md:mb-0 mb-10"
          />
          <div className="hero-overlay bg-opacity-85 p-5 rounded-xl w-full md:w-1/2 text-white">
            <h1 className="text-3xl font-bold text-white">
              Powering Up Batch 8: Meet the Spark Plugs!
            </h1>
            <p className="py-6">
              Our batch is fueled by the dedication of our very own Class
              Representatives (CRs), Muhammad Nur from Dhaka and Tousif Iqti
              from Rangpur. These two dynamos are like a well-wired circuit –
              perfectly in sync and always reliable. You can count on them to
              keep the current flowing, whether it&apos;s delivering important
              announcements or sparking solutions to any academic hurdles. Their
              friendship ensures a positive charge runs through the batch, and
              their commitment to duty is unwavering. So, if you have a question
              or need a classmate connection, look no further than our trusty CR
              duo!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CR;
