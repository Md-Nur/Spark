import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ContentApproveBtn = ({ contentInfo, refetch }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    data.isApproved = data.isApproved === "true";
    // console.log(data);

    await toast.promise(axios.put(`/api/contents/${contentInfo._id}`, data), {
      pending: "Updating...",
      success: "Status Updated",
      error: "Failed to update role",
    });

    refetch();

    document.getElementById(`update_status_${contentInfo._id}`).close();
  };
  // console.log(contentInfo);
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className={`btn btn-sm ${
          contentInfo.isApproved ? "btn-error" : "btn-info"
        }`}
        onClick={() =>
          document
            .getElementById(`update_status_${contentInfo._id}`)
            .showModal()
        }
      >
        {contentInfo.isApproved ? "Remove Approvement" : "Give Approvement"}
      </button>
      <dialog id={`update_status_${contentInfo._id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Are you sure!</h3>
          <p className="py-4">
            {contentInfo.title} is{" "}
            {contentInfo.isApproved ? "Give Approvement" : "Remove Approvement"}
          </p>
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <span className="label-text">Pending</span>
                  <input
                    type="radio"
                    className="radio checked:bg-red-500"
                    {...register("isApproved")}
                    defaultChecked={!contentInfo.isApproved}
                    value={false}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <span className="label-text">Approved</span>
                  <input
                    type="radio"
                    className="radio checked:bg-blue-500"
                    {...register("isApproved")}
                    defaultChecked={contentInfo.isApproved}
                    value={true}
                  />
                </label>
              </div>
            </div>
            <button className="btn btn-neutral my-3">Submit</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ContentApproveBtn;
