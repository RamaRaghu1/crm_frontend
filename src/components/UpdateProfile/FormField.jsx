import React from "react";

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  readOnly,
  error,
  required = false,
  component = "input", // 'input' or 'select'
  options = [], // For select dropdowns
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {component === "input" ? (
        <input
          readOnly={readOnly}
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }`}
        />
      ) : (
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }`}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
