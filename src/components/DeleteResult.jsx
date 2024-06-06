import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteResult = ({ id }) => {
  const router = useRouter();

  const handelDelete = () => {
    axios
      .delete(`/api/student-info/${id}`)
      .then((res) => {
        console.log(res.data);
        toast.success("Result deleted successfully");
        router.push("/results");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-error w-20"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Delete
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Sure</h3>
          <p className="py-4">
            Are you sure you want to delete this result? This action cannot be
            undone.
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error mx-2" onClick={handelDelete}>
                Delete
              </button>
              <button className="btn btn-neutral mx-2">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteResult;
