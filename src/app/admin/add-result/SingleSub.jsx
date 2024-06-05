const SingleSub = ({ result, setResult, i }) => {
  return (
    <div className="form-control gap-1">
      <div className="flex gap-2 flex-wrap w-full">
        <label className="label">{result.subjects[i].name}</label>
        <select
          defaultValue="Grade"
          className="select select-bordered"
          onChange={(e) => {
            setResult({
              ...result,
              subjects: result.subjects.map((sub, index) => {
                if (index === i) {
                  return {
                    ...sub,
                    grade: e.target.value,
                  };
                }
                return sub;
              }),
            });
          }}
          required
        >
          <option disabled>Grade</option>
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="B-">B-</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
      </div>
    </div>
  );
};

export default SingleSub;
