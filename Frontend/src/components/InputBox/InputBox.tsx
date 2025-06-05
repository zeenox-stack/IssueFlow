import React from "react";

interface InputBoxType {
  name: string;
  inputType: boolean;
  isEmpty: boolean;
  onChange: (value: string) => void;
  placeholder: string;
}

const InputBox: React.FC<InputBoxType> = React.memo(
  ({ name, inputType, onChange, isEmpty, placeholder }) => {
    return (
      <div className="flex flex-col mb-6">
        <label htmlFor={name} className="font-sm text-gray-700 mb-2">
          {name}
        </label>
        {inputType ? (
          <input
            type="text"
            className="py-2 px-3 rounded-2xl border border-gray-400 font-[Poppins] focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none hover:border-gray-100"
            name={name}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            autoFocus
          />
        ) : (
          <textarea
            name={name}
            className="rounded-2xl px-3 py-2 border border-gray-400 hover:border-gray-100 focus:ring-2 focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none" 
            rows={4}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder} 
          ></textarea>
        )}
        {isEmpty && (
          <p className="text-sm text-red-400 ">Field cannot be empty</p>
        )}
      </div>
    );
  }
);

export default InputBox;
