const Input = ({
  name,
  label,
  register,
  error,
  required = true,
  type = "text",
  // defaultValue,
  ...rest
}: {
  name: string;
  label?: string;
  register: any;
  error: any;
  required?: boolean;
  type?: string;
  defaultValue?: number;
  [key: string]: any;
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label || name}</span>
        {error && (
          <span className="text-error">
            <span className="capitalize">{label || name}</span>
            is required
          </span>
        )}
      </label>
      <input
        type={type}
        // defaultValue={defaultValue}
        placeholder={(label || name).toUpperCase()}
        className="input input-bordered"
        {...register(name, { required })}
        {...rest}
      />
    </div>
  );
};

export default Input;
