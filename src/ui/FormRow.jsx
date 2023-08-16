function FormRow({ error, label, children }) {
  return (
    <>
      <div className="flex gap-2">
        <label htmlFor={label}>{label}</label>
        {children}
      </div>
      <p className=" text-red-600">{error}</p>
    </>
  );
}

export default FormRow;
