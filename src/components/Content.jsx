"use client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";
import { useUserAuth } from "@/context/userAuth";
import axios from "axios";
import { toast } from "react-toastify";

const Content = ({ postData }) => {
  const { userAuth } = useUserAuth();
  const editorRef = useRef(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: postData?.title || "",
      type: postData?.type || "blog",
      tags: postData?.tags.join(",") || "",
      content: postData?.content || "",
    },
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const onSubmit = async (data) => {
    toast.loading("Please wait...");
    data.content = editorRef.current.getContent();
    data.tags = data.tags.split(",").map((tag) => tag.trim());
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData
      );
      data.thumbnail = response.data.data.url;
    }
    if (!postData) {
      data.userId = userAuth._id;
      data.isApproved = false;
    }
    if (postData) {
      try {
        await axios.put(`/api/contents/${postData._id}`, data);
        toast.dismiss();
        toast.success("Post updated successfully");
      } catch (error) {
        toast.dismiss();
        toast.error(error.response.data.error || error.message);
      }
    } else {
      try {
        await axios.post("/api/contents", data);
        toast.dismiss();
        toast.success("Post added successfully");
      } catch (error) {
        toast.dismiss();
        toast.error(error.response.data.error || error.message);
      }
    }
  };
  return (
    <section className="card">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
            {errors.title && (
              <span className="text-error">Title is required</span>
            )}
          </label>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered"
            {...register("title", { required: true })}
          />
        </div>
        <div className="form-control">
          {(preview || postData?.thumbnail) && (
            <img
              src={preview || postData?.thumbnail}
              alt="Image Preview"
              className="mx-auto max-h-96 object-cover rounded-md my-3"
            />
          )}

          <label
            htmlFor="imgFile"
            className="flex flex-row items-center gap-2 px-1 justify-evenly bg-neutral py-2 rounded-md cursor-pointer hover:bg-neutral-focus"
          >
            <FaUpload className="text-3xl btn-neutral" />
            <input
              id="imgFile"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              required={!postData?.thumbnail}
            />

            <span className="uppercase text-neutral-content">Thumbnail</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Type</span>
            {errors.type && (
              <span className="text-error">Type is required</span>
            )}
          </label>
          <select
            className="select select-bordered w-full"
            {...register("type", { required: true })}
          >
            <option value="blog">Blog</option>
            <option value="event">Event</option>
            <option value="tour">Tour</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Tags (coma sparated)</span>
            {errors.tags && (
              <span className="text-error">Tags is required</span>
            )}
          </label>
          <input
            type="text"
            placeholder="Tags (coma separated)"
            className="input input-bordered"
            {...register("tags", { required: true })}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Content</span>
            {errors.content && (
              <span className="text-error">Content is required</span>
            )}
          </label>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
            initialValue={postData?.content || ""}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            init={{
              height: 500,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">
            {postData ? "Update" : "Add Post"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Content;
