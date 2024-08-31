import axios from "axios";
import { toast } from "react-toastify";

const DeleteSm = ({ id, refetch }) => {
  const handleDelete = async () => {
    // Add your delete logic
    try {
      await axios.delete(`/api/study-materials/${id}`);
      toast.success("Study material deleted successfully");
      refetch();
    } catch (error) {
      toast.error(error.response.data.error || error.message);
    }
  };
  return (
    <>
      <button
        className="btn btn-error"
        onClick={() => document.getElementById(`delete_sm_${id}`).showModal()}
      >
        Delete
      </button>

      <dialog id={`delete_sm_${id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Are sure?</h3>
          <p className="py-4">
            Do you really want to delete this study material? This process
            cannot be undone.
          </p>
          <form onSubmit={handleDelete} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-error">Delete</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default DeleteSm;
