import Link from "next/link";
import hoodie from "@/pic/hoodie.jpg";
import Image from "next/image";

const ShowContent = ({ contents, title }) => {
  if (!contents.length) return <p>No content available</p>;
  return (
    <section className="w-full">
      <h1 className="text-4xl font-bold text-center my-10">
        {title || "Blogs"}
      </h1>
      <div className="flex flex-wrap justify-center max-w-7xl mx-auto my-10 gap-5 px-2 w-full">
        {contents?.map((content) => (
          <Link
            href={`/content/${content._id}`}
            key={content._id}
            className="card bg-base-300 shadow-xl w-full sm:w-80 md:w-96"
          >
            <figure>
              <Image
                src={content.thumbnail || hoodie}
                alt={content.title}
                width={800}
                height={500}
                className="object-cover w-full h-56"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {content.title}
                <div className="badge badge-secondary">{content.type}</div>
              </h2>

              <p>Created At: {content.createdAt.split("T")[0]}</p>
              <p>Author: {content.user.name}</p>
              <div className="card-actions justify-end">
                <Link
                  href={`/content/${content._id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShowContent;
