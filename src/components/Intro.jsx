import Image from "next/image";
import img1 from "@/pic/allSparks.jpg";
import img2 from "@/pic/EEESign.jpg";
import img3 from "@/pic/jersy.jpg";

const Intro = () => {
  return (
    <div className="w-full my-20 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold my-10 text-center">
        Welcome, EEE 8th Batch - Spark! University of Rajshahi
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1 sm:px-5 md:px-7 lg:px-10 my-10 w-full">
        <div className="flex justify-center items-center w-full px-3">
          <Image
            src={img1}
            alt="EEE"
            width={500}
            height={500}
            className="rounded-lg object-cover w-full"
          />
        </div>
        <div className="flex flex-col justify-center items-center px-3 w-full">
          <p className="text-lg text-justify">
            The Department of Electrical & Electronic Engineering (EEE) at the
            University of Rajshahi proudly welcomes the 8th batch, Spark! We are
            thrilled to have you join our vibrant community of engineers and
            innovators.
          </p>
          <p className="text-lg text-justify">
            This website serves as a hub for our batch, Spark. Here you&apos;ll find
            resources, information, and a platform to connect with your fellow
            classmates.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1 sm:px-5 md:px-7 lg:px-10 my-10 w-full">
        <div className="flex flex-col justify-center items-center w-full px-3">
          <h2 className="text-center text-2xl font-semibold my-5">
            Highlights of the EEE Department:
          </h2>
          <ul className="list-disc text-lg text-justify">
            <li>
              <strong>Faculty of Engineering: </strong>
              Our department is part of the esteemed Faculty of Engineering at
              Rajshahi University, known for its rigorous academics and
              experienced faculty. EEE was established in 2015 and has since
              been a leader in engineering education in Bangladesh.
            </li>
            <li>
              <strong>Satyendra Nath Bose Academic Building: </strong>
              We attend our classes at this iconic building, offering a
              stimulating learning environment.
            </li>
            <li>
              <strong>Seminar Library: </strong>
              The EEE department has a dedicated seminar library with a vast
              collection of books, journals, and research papers.
            </li>
            <li>
              <strong>Research Opportunities: </strong>
              The EEE department encourages students to engage in research
              projects, internships, and other hands-on learning experiences.
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center w-full">
          <Image
            src={img2}
            alt="EEE"
            width={500}
            height={500}
            className="rounded-lg w-full object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1 sm:px-5 md:px-7 lg:px-10 my-10 w-full">
        <div className="flex justify-center items-center w-full px-3">
          <Image
            src={img3}
            alt="EEE"
            width={500}
            height={500}
            className="rounded-lg object-cover w-full"
          />
        </div>
        <div className="flex flex-col justify-center items-center px-3 w-full">
          <p className="text-lg text-justify">
            This website is your one-stop shop for all things EEE Batch 8 -
            Spark! We will be posting important announcements, sharing study
            materials, and keeping you updated on upcoming events.
          </p>
          <p className="text-lg text-justify">
            We encourage you to explore this website and actively participate in
            building a strong and supportive online community.
          </p>
          <h3 className="text-xl font-semibold my-5">
            Spark Up Your Engineering Journey!
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Intro;
