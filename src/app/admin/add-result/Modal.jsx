
const Modal = ({ queries, setQueries }) => {
  return (
    <dialog id="my_modal_add_result" className="modal">
      <div className="modal-box space-y-5">
        <h3 className="font-bold text-lg">Input Year and semester</h3>

        <div className="form-control">
          <select
            className="select select-bordered"
            defaultValue="Year"
            onChange={(e) => {
              setQueries({
                ...queries,
                year: e.target.value,
              });
            }}
          >
            <option disabled>Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>
        <div className="form-control">
          <select
            className="select select-bordered"
            defaultValue="Semester"
            onChange={(e) => {
              setQueries({
                ...queries,
                semester: e.target.value,
              });
            }}
          >
            <option disabled>Semester</option>
            <option value="Odd">Odd</option>
            <option value="Even">Even</option>
          </select>
        </div>

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}

            <button className="btn">Submit</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
