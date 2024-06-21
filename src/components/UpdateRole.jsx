import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateRole = ({ userInfo, refetch }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await toast.promise(axios.put(`/api/user/${userInfo._id}`, data), {
      pending: "Updating...",
      success: "Role Updated",
      error: "Failed to update role",
    });

    refetch();

    document.getElementById(`update_role_${userInfo._id}`).close();
  };
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className={`btn btn-sm ${
          userInfo.role === "Admin" ? "btn-error" : "btn-info"
        }`}
        onClick={() =>
          document.getElementById(`update_role_${userInfo._id}`).showModal()
        }
      >
        {userInfo.role === "User" ? "Make Admin" : "Remove Admin"}
      </button>
      <dialog id={`update_role_${userInfo._id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Are you sure!</h3>
          <p className="py-4">Make {userInfo.name} Admin</p>
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <span className="label-text">User</span>
                  <input
                    type="radio"
                    className="radio checked:bg-red-500"
                    {...register("role")}
                    defaultChecked={userInfo.role === "User"}
                    value="User"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <span className="label-text">Admin</span>
                  <input
                    type="radio"
                    className="radio checked:bg-blue-500"
                    {...register("role")}
                    defaultChecked={userInfo.role === "Admin"}
                    value="Admin"
                  />
                </label>
              </div>
            </div>
            <button className="btn btn-neutral">
              {userInfo.role === "User" ? "Make Admin" : "Make User"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default UpdateRole;
