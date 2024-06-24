import Link from "next/link";

const ShowContent = ({ contents }) => {
  if (!contents.length) return <p>No content available</p>;
  return (
    <section className="w-full">
      <h1 className="text-4xl font-bold capitalize">{contents[0]?.types}</h1>
      {contents?.map((content) => (
        <div key={content.id} className="border-b border-gray-200 py-4">
          <h2 className="text-2xl font-bold">{content.title}</h2>
          <p className="text-gray-500">{content.type}</p>
          <Link href={`/edit-content/${content._id}`}>Edit Content</Link>
        </div>
      ))}
    </section>
  );
};

export default ShowContent;
