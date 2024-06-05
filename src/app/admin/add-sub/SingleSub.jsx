const SingleSub = ({ subject, setSubject, i }) => {
  return (
    <div className="form-control gap-1">
      <input
        type="text"
        placeholder="Name"
        className="input input-bordered"
        required
        onChange={(e) => {
          setSubject({
            ...subject,
            subjects: subject.subjects.map((sub, index) => {
              if (index === i) {
                return {
                  ...sub,
                  name: e.target.value,
                };
              }
              return sub;
            }),
          });
        }}
      />
      <div className="flex gap-1 flex-wrap w-full justify-around">
        <input
          type="text"
          placeholder="Code"
          className="input input-bordered w-24"
          required
          onChange={(e) => {
            setSubject({
              ...subject,
              subjects: subject.subjects.map((sub, index) => {
                if (index === i) {
                  return {
                    ...sub,
                    code: e.target.value,
                  };
                }
                return sub;
              }),
            });
          }}
        />
        <input
          type="number"
          placeholder="Credit"
          className="input input-bordered w-24"
          required
          step={0.1}
          onChange={(e) => {
            setSubject({
              ...subject,
              subjects: subject.subjects.map((sub, index) => {
                if (index === i) {
                  return {
                    ...sub,
                    credit: e.target.value,
                  };
                }
                return sub;
              }),
            });
          }}
        />

        <select
          defaultValue="Type"
          className="select select-bordered"
          onChange={(e) => {
            setSubject({
              ...subject,
              subjects: subject.subjects.map((sub, index) => {
                if (index === i) {
                  return {
                    ...sub,
                    type: e.target.value,
                  };
                }
                return sub;
              }),
            });
          }}
        >
          <option disabled value="Type">
            Type
          </option>
          <option value="Theory">Theory</option>
          <option value="Lab">Lab</option>
        </select>
      </div>
    </div>
  );
};

export default SingleSub;
