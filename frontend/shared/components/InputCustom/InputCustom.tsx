"use client";

const InputCustom = ({
  label,
  placeholder,
  type = "text",
  onChange,
  value,
}: {
  label: string;
  placeholder: string;
  value?: any;
  type: "textarea" | "text" | "datetime-local" | "number" | "password";
  onChange?: (value: string) => void;
}) => {
  return (
    <div className="flex justify-start items-start flex-col w-full">
      <label>{label}</label>
      {type != "textarea" && (
        <input
          value={value ? value : ""}
          onChange={
            onChange ? (event) => onChange(event.target.value) : (event) => {}
          }
          type={type}
          className="p-3 w-full border rounded-[7px]"
          placeholder={placeholder}
        />
      )}

      {type == "textarea" && (
        <textarea
          onChange={
            onChange ? (event) => onChange(event.target.value) : (event) => {}
          }
          value={value}
          className="p-3 w-full border rounded-[7px]"
          rows={6}
        ></textarea>
      )}
    </div>
  );
};

export default InputCustom;
