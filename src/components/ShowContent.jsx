import Link from "next/link";
import hoodie from "@/pic/hoodie.jpg";
import Image from "next/image";

const ShowContent = ({ contents }) => {
  if (!contents.length) return <p>No content available</p>;
  return (
    <section className="w-full">
      <h1 className="text-4xl font-bold text-center my-10">
        {contents[0]?.types === "blog" ? "Blogs" : "Events"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto my-10 gap-5">
        {contents?.map((content) => (
          <div key={content._id} className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                src={content.thumbnail || hoodie}
                alt={content.title}
                width={300}
                height={200}
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShowContent;
